import LegalPageLayout from "../components/LegalPageLayout";
import { CONTACT_EMAIL } from "../lib/contact";

/**
 * Google Play'in "Veri güvenliği" bölümünde istediği, uygulama dışından
 * erişilebilen hesap silme sayfası.
 */
export default function HesapSilme() {
  return (
    <LegalPageLayout
      kicker="Hesap"
      title="Hesap Silme"
      updatedAt="2026-10-27"
      summary={[
        "Hesabını ve hesabına bağlı tüm verileri istediğin zaman kalıcı olarak silebilirsin.",
        "En hızlı yol uygulamanın içinden: Profil > Hesabı Sil.",
        "Uygulamaya erişemiyorsan bize e-postayla yaz, 30 gün içinde sileriz.",
      ]}
    >
      <h2>Uygulama içinden silme</h2>
      <ol>
        <li>SelamKomşu uygulamasını açın ve giriş yapın.</li>
        <li>
          Alttaki menüden <strong>Profil</strong> sekmesine gidin.
        </li>
        <li>
          <strong>Hesabı Sil</strong> seçeneğine dokunun.
        </li>
        <li>Şifrenizi girip işlemi onaylayın.</li>
      </ol>

      <h2>Uygulamaya erişemiyorsanız</h2>
      <p className="legal-callout">
        Hesabınıza kayıtlı e-posta adresinizden, konu satırına{" "}
        <strong>"Hesap Silme Talebi"</strong> yazarak{" "}
        <a href={`mailto:${CONTACT_EMAIL}?subject=Hesap%20Silme%20Talebi`}>
          {CONTACT_EMAIL}
        </a>{" "}
        adresine e-posta gönderin. Talebiniz, hesabın size ait olduğu
        doğrulandıktan sonra en geç 30 gün içinde tamamlanır.
      </p>

      <h2>Silinen veriler</h2>
      <p>Hesabınız silindiğinde aşağıdakilerin tamamı kalıcı olarak ve geri alınamaz biçimde silinir:</p>
      <ul>
        <li>Ad, soyad, e-posta ve şifre bilgileriniz, profil fotoğrafınız ve biyografiniz</li>
        <li>Gönderileriniz, yorumlarınız, beğenileriniz, ilanlarınız ve etkinlikleriniz</li>
        <li>Mesajlarınız ve sohbet odalarınız</li>
        <li>Esnaf ve usta profilleriniz</li>
        <li>Bildirimleriniz, yasal metin onay kayıtlarınız, şikayet ve engelleme kayıtlarınız</li>
      </ul>
      <p>
        Kanunlardan doğan saklama yükümlülükleri kapsamında tutulması zorunlu
        olan kayıtlar, yalnızca ilgili yasal süre boyunca saklanır.
      </p>
    </LegalPageLayout>
  );
}
