import LegalPageLayout from "../components/LegalPageLayout";
import LegalText from "../components/LegalText";
// Uygulamadaki kayıt ekranında onaylatılan metinle birebir aynı (bkz. LegalText).
import text from "../legal/kullanim-sartlari.txt?raw";

export default function TermsOfUse() {
  return (
    <LegalPageLayout title="Kullanım Şartları" updatedAt="2026-10-12">
      <LegalText text={text} />
    </LegalPageLayout>
  );
}
