import type { ReactNode } from "react";

/**
 * Düz metin yasal belgeyi (src/legal/*.txt) sayfa öğelerine çevirir.
 *
 * Aynı .txt dosyaları backend'deki LegalDocumentSeeder'a birebir kopyalanır ve
 * uygulamanın kayıt ekranında düz metin olarak gösterilir — böylece mağazadaki
 * adresle uygulamada onaylatılan metin hep aynı kalır. Bu yüzden biçim kasıtlı
 * olarak düz metinde de okunaklı:
 *   - İlk satır belge başlığıdır (sayfada LegalPageLayout zaten başlık gösterir, atlanır).
 *   - "3. Başlık"            → bölüm başlığı (h2)
 *   - "3.1. Alt Başlık"      → alt başlık (kalın)
 *   - "- madde"              → liste
 *   - "Etiket: açıklama"     → etiket kalın
 */

const SECTION_HEADING = /^\d+\.\s+\S.{0,80}$/;
const SUB_HEADING = /^\d+\.\d+\.\s+[^:]{1,80}$/;
const EMAIL = /([\w.+-]+@[\w-]+\.[\w.-]+)/g;
// "Etiket: metin" ya da "4.1. Etiket: metin" — etiket cümle içermez (nokta yok), kısa.
const LABEL = /^((?:\d+\.\d+\.\s+)?[^:.]{2,70}):\s+(.+)$/;

function withLinks(text: string): ReactNode[] {
  return text.split(EMAIL).map((part, i) =>
    i % 2 === 1 ? (
      <a key={i} href={`mailto:${part}`}>
        {part}
      </a>
    ) : (
      part
    ),
  );
}

function withLabel(text: string): ReactNode {
  const m = LABEL.exec(text);
  if (!m) return withLinks(text);
  return (
    <>
      <strong>{m[1]}:</strong> {withLinks(m[2])}
    </>
  );
}

export default function LegalText({ text }: { text: string }) {
  const lines = text.replace(/\r\n/g, "\n").split("\n").map((l) => l.trim());
  // İlk dolu satır belge başlığı
  const firstContent = lines.findIndex((l) => l.length > 0);
  const body = lines.slice(firstContent + 1);

  const out: ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (bullets.length === 0) return;
    out.push(
      <ul key={`ul-${out.length}`}>
        {bullets.map((b, i) => (
          <li key={i}>{withLabel(b)}</li>
        ))}
      </ul>,
    );
    bullets = [];
  };

  for (const line of body) {
    if (line.startsWith("- ")) {
      bullets.push(line.slice(2));
      continue;
    }
    flushBullets();
    if (!line) continue;

    if (SECTION_HEADING.test(line) && !line.endsWith(".") && !line.endsWith(":")) {
      out.push(<h2 key={out.length}>{line}</h2>);
    } else if (SUB_HEADING.test(line) && !line.endsWith(".")) {
      out.push(
        <p key={out.length}>
          <strong>{line}</strong>
        </p>,
      );
    } else {
      out.push(<p key={out.length}>{withLabel(line)}</p>);
    }
  }
  flushBullets();

  return <>{out}</>;
}
