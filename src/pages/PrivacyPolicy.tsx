import LegalPageLayout from "../components/LegalPageLayout";
import LegalText from "../components/LegalText";
// Uygulamadaki kayıt ekranında onaylatılan metinle birebir aynı (bkz. LegalText).
import text from "../legal/aydinlatma-metni.txt?raw";

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout
      title="KVKK Aydınlatma Metni"
      updatedAt="2026-10-27"
      version={4}
      summary={[
        "Verilerini satmıyoruz, reklam için kimseyle paylaşmıyoruz.",
        "Sunucularımız Türkiye'de. Yurt dışına yalnızca bildirim ve şifre sıfırlama e-postası için gereken kadar veri gider.",
        "Canlı konumun sadece uygulama açıkken, yakınındakileri bulmak için kullanılır; kaydedilmez.",
        "Mesajların şifreli saklanır. Hesabını sildiğinde her şey kalıcı olarak silinir.",
      ]}
    >
      <LegalText text={text} />
    </LegalPageLayout>
  );
}
