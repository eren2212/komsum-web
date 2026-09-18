export type ChatTurn = { role: "user" | "model"; text: string };

const GENERIC_ERROR = "Şu anda cevap veremiyorum, lütfen daha sonra tekrar dene.";

export async function sendChatMessage(
  message: string,
  history: ChatTurn[]
): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });

  let data: { reply?: string; error?: string } = {};
  try {
    data = await res.json();
  } catch {
    // malformed/empty body — fall through to the generic error below
  }

  if (!res.ok) {
    throw new Error(data.error || GENERIC_ERROR);
  }
  if (!data.reply) {
    throw new Error(GENERIC_ERROR);
  }
  return data.reply;
}
