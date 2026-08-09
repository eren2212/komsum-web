import LegalPageLayout from "../components/LegalPageLayout";

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout title="KVKK Aydınlatma Metni" updatedAt="2026-08-06">
      <h2>1. Veri Sorumlusu</h2>
      <p>
        İşbu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu
        ("KVKK") uyarınca, veri sorumlusu sıfatıyla Komşum ("Platform")
        tarafından, kullanıcıların kişisel verilerinin işlenmesine ilişkin
        usul ve esasların açıklanması amacıyla hazırlanmıştır.
      </p>

      <h2>2. İşlenen Kişisel Veriler, İşleme Amaçları ve Hukuki Sebepler</h2>
      <p>
        Platform, kişisel verilerinizi KVKK m. 5 ve 6'da belirtilen aşağıdaki
        hukuki sebeplere dayalı olarak işlemektedir:
      </p>
      <ul>
        <li>
          <strong>Hesap ve Profil Bilgileri (Ad-Soyad, E-posta):</strong>{" "}
          Sözleşmenin kurulması ve ifası (m. 5/2-c) amacıyla işlenir.
        </li>
        <li>
          <strong>Şifre Bilgisi:</strong> Veri güvenliğinin sağlanması ve veri
          sorumlusunun hukuki yükümlülüğü (m. 5/2-ç) kapsamında, hash'lenmiş
          (şifrelenmiş) olarak saklanır.
        </li>
        <li>
          <strong>Profil Fotoğrafı ve Biyografi:</strong> İlgili kişinin kendi
          isteğiyle sunduğu veriler olması sebebiyle "Açık Rıza" (m. 5/1)
          kapsamında işlenir.
        </li>
        <li>
          <strong>Beyan Edilen Konum (Mahalle/İlçe):</strong> Bölge bazlı
          hizmet sunulabilmesi için sözleşmenin ifası ve meşru menfaat (m.
          5/2-c, f) kapsamında işlenir.
        </li>
        <li>
          <strong>Canlı Cihaz Konumu (GPS):</strong> Sadece anlık hesaplama
          için cihaz üzerinde kullanılır; sunucuya gönderilmez ve saklanmaz.
        </li>
        <li>
          <strong>İletişim ve İçerik (Mesajlar, Yorumlar):</strong> Platform
          üzerinden sunulan iletişim hizmetinin ifası (m. 5/2-c) amacıyla
          işlenir.
        </li>
        <li>
          <strong>
            Esnaf/İşletme Profil Verileri (Telefon, Adres, Sabit Koordinat):
          </strong>{" "}
          Ticari faaliyetin yürütülmesi ve sözleşmenin ifası (m. 5/2-c)
          kapsamında işlenir.
        </li>
      </ul>

      <h2>3. Kişisel Verilerin Aktarılması ve Yurt Dışı Aktarımı</h2>
      <p>
        Veritabanı altyapımız Amazon Web Services (AWS) Tokyo
        (ap-northeast-1) bölgesinde fiziksel olarak barındırılmaktadır. Bu
        durum, verilerin fiilen Japonya'da tutulması nedeniyle KVKK m. 9
        kapsamında "Yurt Dışına Aktarım" niteliği taşımakta olup, aktarım
        ilgili kişinin açık rızasına veya Kanun'daki diğer istisnalara dayalı
        olarak gerçekleştirilir.
      </p>

      <h2>4. İlgili Kişinin Hakları (KVKK m. 11)</h2>
      <p>
        KVKK'nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini
        öğrenme, aktarıldığı kişileri bilme, düzeltme veya silme haklarına
        sahipsiniz. Başvurularınızı{" "}
        <a href="mailto:merhaba@komsum.app">
          merhaba@komsum.app
        </a>{" "}
        üzerinden iletebilirsiniz.
      </p>
    </LegalPageLayout>
  );
}
