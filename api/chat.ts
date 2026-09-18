import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

// gemini-2.5-flash was sunset for new accounts (404 "no longer available to
// new users"); this is the flash-tier model Google's own API error pointed
// to as the replacement. The "-latest" alias was tried too but returned
// 503s under load, so this pins to a specific model instead.
const MODEL_NAME = "gemini-3.6-flash";

const SYSTEM_INSTRUCTION = `Sen Komşum uygulamasının tanıtım sitesindeki dijital komşusun ve müşteri asistanısın.

Bildiğin gerçekler:
- Komşum'un temel özellikleri tamamen ücretsizdir; yerel işletmeler için ek özellikler ileride gelebilir.
- Kullanıcı adresini doğruladıktan sonra otomatik olarak kendi mahalle ağına eklenir ve sadece o ağdaki komşularla etkileşime girer.
- Komşum kapalı bir ağdır; sadece doğrulanmış komşular birbirini görür, mesajlaşma uçtan uca güvenlidir.
- Esnaf/ustalar kendi profillerini açıp komşu oylarıyla referans kazanabilir.
- Yeni mahalleler sürekli ekleniyor; bir mahallenin aktif olup olmadığı uygulama içinde adres girilerek görülür.
- İletişim: merhaba@komsum.app

Kurallar:
- Sadece Komşum uygulaması, özellikleri ve bu site hakkında konuş. Alakasız sorularda (hava durumu, genel sohbet, başka ürünler vb.) kibarca konuyu Komşum'a getir.
- Yukarıda verilmeyen, emin olmadığın kesin bilgiler (fiyatlandırma detayları, kesin şehir/mahalle listesi, hesaba özel durumlar) için asla uydurma; kullanıcıyı merhaba@komsum.app adresine yönlendir.
- Türkçe, sıcak, samimi ve kısa cevaplar ver, "sen" dilini kullan. Marka tonu: "Mahalle ruhu, cebinde."
- Cevapların birkaç cümleyi geçmesin, gerekmedikçe madde işareti kullanma.`;

type ChatTurn = { role: "user" | "model"; text: string };

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_TURNS = 20;

/**
 * Best-effort in-memory limiter: state lives only in this warm instance, so
 * it resets on cold start and isn't shared across concurrent instances.
 * Enough to blunt casual abuse; not a hard guarantee (would need Redis/KV
 * for that).
 */
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  if (Array.isArray(forwarded)) return forwarded[0];
  return req.socket?.remoteAddress ?? "unknown";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Sadece POST desteklenir." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY tanımlı değil.");
    return res.status(500).json({ error: "Sunucu yapılandırma hatası." });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: "Şu an çok fazla istek aldık, biraz sonra tekrar dener misin?",
    });
  }

  const body = req.body as { message?: unknown; history?: unknown };
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!message) {
    return res.status(400).json({ error: "Mesaj boş olamaz." });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: "Mesaj çok uzun." });
  }

  const rawHistory = Array.isArray(body?.history) ? body.history : [];
  const history: ChatTurn[] = rawHistory
    .filter(
      (t): t is ChatTurn =>
        !!t &&
        (t.role === "user" || t.role === "model") &&
        typeof t.text === "string"
    )
    .slice(-MAX_HISTORY_TURNS);

  try {
    const ai = new GoogleGenAI({ apiKey });

    const chat = ai.chats.create({
      model: MODEL_NAME,
      config: { systemInstruction: SYSTEM_INSTRUCTION },
      history: history.map((turn) => ({
        role: turn.role,
        parts: [{ text: turn.text }],
      })),
    });

    const result = await chat.sendMessage({ message });
    const reply = result.text;

    if (!reply) {
      throw new Error("Gemini boş yanıt döndürdü.");
    }

    return res.status(200).json({ reply });
  } catch (err: unknown) {
    console.error("Gemini API hatası:", err);

    const status =
      typeof err === "object" && err !== null && "status" in err
        ? Number((err as { status?: unknown }).status)
        : undefined;
    const messageText = err instanceof Error ? err.message : String(err);

    if (status === 429 || /rate.?limit|quota|RESOURCE_EXHAUSTED/i.test(messageText)) {
      return res.status(429).json({
        error: "Şu an yoğunuz, birkaç dakika sonra tekrar dener misin?",
      });
    }

    return res.status(502).json({
      error: "Şu anda cevap veremiyorum, lütfen daha sonra tekrar dene.",
    });
  }
}
