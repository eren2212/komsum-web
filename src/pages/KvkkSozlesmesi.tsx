import LegalPageLayout from "../components/LegalPageLayout";
import LegalText from "../components/LegalText";
// Uygulamadaki kayıt ekranında onaylatılan metinle birebir aynı (bkz. LegalText).
import text from "../legal/kvkk-sozlesmesi.txt?raw";

export default function KvkkSozlesmesi() {
  return (
    <LegalPageLayout
      title="Kişisel Verilerin Korunması ve İşlenmesi Sözleşmesi"
      updatedAt="2026-10-27"
      version={4}
      summary={[
        "Verilerinin hangi kurallarla işlendiğini ve hangi haklara sahip olduğunu bu sözleşme belirler.",
        "Profil fotoğrafı, canlı konum ve bildirim tamamen isteğe bağlı; kapatsan da uygulamayı kullanmaya devam edersin.",
        "Mesajlarını okumayız; farklı bölümlerdeki verileri birleştirip hakkında profil çıkarmayız.",
      ]}
    >
      <LegalText text={text} />
    </LegalPageLayout>
  );
}
