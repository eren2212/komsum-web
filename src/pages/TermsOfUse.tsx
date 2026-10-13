import LegalPageLayout from "../components/LegalPageLayout";
import LegalText from "../components/LegalText";
// Uygulamadaki kayıt ekranında onaylatılan metinle birebir aynı (bkz. LegalText).
import text from "../legal/kullanim-sartlari.txt?raw";

export default function TermsOfUse() {
  return (
    <LegalPageLayout
      title="Kullanım Şartları"
      updatedAt="2026-10-12"
      version={2}
      summary={[
        "SelamKomşu'yu kullanmak için 18 yaşından büyük olmalısın.",
        "Hakaret, taciz, dolandırıcılık ve uygunsuz içeriğe sıfır tolerans.",
        "Rahatsız eden içeriği şikayet edebilir, kişiyi engelleyebilirsin; en geç 24 saat içinde bakarız.",
        "Paylaştığın içerik senin; sorumluluğu da sende.",
      ]}
    >
      <LegalText text={text} />
    </LegalPageLayout>
  );
}
