import { Link } from "react-router-dom";
import LegalPageLayout from "../components/LegalPageLayout";
import { CONTACT_EMAIL } from "../lib/contact";

/** App Store Connect'in istediği destek (Support URL) sayfası. */
export default function Destek() {
  return (
    <LegalPageLayout
      eyebrow="Destek"
      title="Yardım ve Destek"
      description="SelamKomşu ile ilgili soru, öneri ve şikayetleriniz ile kişisel verilerinize ilişkin talepleriniz için bize ulaşabilirsiniz."
    >
      <h2>İletişim</h2>
      <p className="legal-callout">
        <strong>E-posta:</strong> <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>

      <h2>Uygunsuz içerik ve kullanıcılar</h2>
      <ul>
        <li>
          Uygunsuz bir gönderi, yorum veya ilanı, içeriğin menüsündeki{" "}
          <strong>Şikayet Et</strong> seçeneğiyle bildirebilirsiniz.
        </li>
        <li>
          Rahatsız eden bir kullanıcıyı <strong>Kullanıcıyı Engelle</strong>{" "}
          seçeneğiyle engelleyebilirsiniz. Engellediğiniz kişilerin listesine
          Profil &gt; Engellenen Kullanıcılar bölümünden ulaşabilirsiniz.
        </li>
        <li>Şikayetler ve engellemeler en geç 24 saat içinde incelenir.</li>
      </ul>

      <h2>Hesap ve veriler</h2>
      <ul>
        <li>
          Hesabınızı silmek için <Link to="/hesap-silme">Hesap Silme</Link>{" "}
          sayfasındaki adımları izleyebilirsiniz.
        </li>
        <li>
          Kişisel verilerinizin nasıl işlendiğini{" "}
          <Link to="/gizlilik-politikasi">KVKK Aydınlatma Metni</Link>'nde,
          kullanım kurallarını{" "}
          <Link to="/kullanim-sartlari">Kullanım Şartları</Link>'nda
          bulabilirsiniz.
        </li>
      </ul>
    </LegalPageLayout>
  );
}
