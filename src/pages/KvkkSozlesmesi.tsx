import LegalPageLayout from "../components/LegalPageLayout";
import LegalText from "../components/LegalText";
// Uygulamadaki kayıt ekranında onaylatılan metinle birebir aynı (bkz. LegalText).
import text from "../legal/kvkk-sozlesmesi.txt?raw";

export default function KvkkSozlesmesi() {
  return (
    <LegalPageLayout
      title="Kişisel Verilerin Korunması ve İşlenmesi Sözleşmesi"
      updatedAt="2026-10-12"
    >
      <LegalText text={text} />
    </LegalPageLayout>
  );
}
