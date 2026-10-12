import LegalPageLayout from "../components/LegalPageLayout";
import LegalText from "../components/LegalText";
// Uygulamadaki kayıt ekranında onaylatılan metinle birebir aynı (bkz. LegalText).
import text from "../legal/aydinlatma-metni.txt?raw";

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout title="KVKK Aydınlatma Metni" updatedAt="2026-10-12">
      <LegalText text={text} />
    </LegalPageLayout>
  );
}
