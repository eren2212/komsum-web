import LegalPageLayout from "../components/LegalPageLayout";
import { CONTACT_EMAIL } from "../lib/contact";

/**
 * Google Play'in "Çocuk güvenliği standartları" formunda istediği, herkese açık
 * ve düzenlenemez CSAE (çocuğun cinsel istismarı ve istismarı) standartları sayfası.
 */
export default function CocukGuvenligi() {
  return (
    <LegalPageLayout
      kicker="Güvenlik"
      title="Çocuk Güvenliği Standartları"
      updatedAt="2026-10-18"
      summary={[
        "SelamKomşu, çocukların cinsel istismarına ve istismar içeriğine karşı sıfır tolerans uygular.",
        "Uygulama 18 yaş ve üzeri kullanıcılar içindir.",
        "Bildirimler 24 saat içinde incelenir; ihlal eden içerik kaldırılır, hesap kalıcı olarak kapatılır.",
      ]}
    >
      <h2>Sıfır tolerans politikası</h2>
      <p>
        SelamKomşu, çocukların cinsel istismarına ve istismarına (CSAE) ve çocuk
        istismarı niteliğindeki materyallere (CSAM) karşı sıfır tolerans
        politikası uygular. Bu tür içerik veya davranışa hiçbir koşulda izin
        verilmez.
      </p>

      <h2>Yaş sınırı</h2>
      <p>
        SelamKomşu 18 yaş ve üzeri kullanıcılar içindir. Kullanıcılar kayıt
        sırasında Kullanım Koşulları'nı ve yaş şartını kabul eder.
      </p>

      <h2>Yasaklı içerik ve davranışlar</h2>
      <ul>
        <li>
          Çocukların cinsel istismarını içeren, öven, teşvik eden veya bunlara
          aracılık eden her türlü içerik (gönderi, yorum, ilan, fotoğraf, mesaj)
        </li>
        <li>Çocuklara yönelik her türlü cinsel veya uygunsuz iletişim</li>
        <li>Çocukları ayartmaya (grooming) ya da sömürmeye yönelik davranışlar</li>
      </ul>

      <h2>Bildirme</h2>
      <p>
        Kullanıcılar uygulama içinden gönderileri, yorumları ve ilanları{" "}
        <strong>"Şikayet Et"</strong> ile bildirebilir; rahatsız edici
        kullanıcıları <strong>"Kullanıcıyı Engelle"</strong> ile engelleyebilir.
        Çocuk güvenliğiyle ilgili endişeler ayrıca e-posta ile de iletilebilir:{" "}
        <a href={`mailto:${CONTACT_EMAIL}?subject=Cocuk%20Guvenligi%20Bildirimi`}>
          {CONTACT_EMAIL}
        </a>
      </p>

      <h2>İnceleme ve işlem</h2>
      <p className="legal-callout">
        Tüm bildirimler 24 saat içinde incelenir. Bu politikayı ihlal eden
        içerik kaldırılır ve ilgili hesap kalıcı olarak kapatılır. Aynı içerik 3
        farklı kullanıcı tarafından şikayet edilirse otomatik olarak gizlenir.
      </p>

      <h2>Yetkililere bildirim</h2>
      <p>
        Çocuk istismarı materyali tespit edildiğinde, yürürlükteki yasalar
        uyarınca ilgili ulusal ve bölgesel makamlara bildirimde bulunuruz.
      </p>

      <h2>İletişim</h2>
      <p>
        Çocuk güvenliği sorumlusu:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </LegalPageLayout>
  );
}
