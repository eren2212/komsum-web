import LegalPageLayout from "../components/LegalPageLayout";

export default function KvkkSozlesmesi() {
  return (
    <LegalPageLayout
      title="Kişisel Verilerin Korunması ve İşlenmesi Sözleşmesi"
      updatedAt="2026-08-06"
    >
      <h2>1. Taraflar</h2>
      <p>
        İşbu Kişisel Verilerin Korunması ve İşlenmesi Sözleşmesi
        ("Sözleşme"), bir tarafta veri sorumlusu sıfatını haiz Eren İridere
        (bundan böyle "Platform" veya "Veri Sorumlusu" olarak anılacaktır) ile
        diğer tarafta platforma üye olan/kullanan Kullanıcı (bundan böyle
        "Kullanıcı" veya "İlgili Kişi" olarak anılacaktır) arasında, aşağıda
        belirtilen şartlar dahilinde akdedilmiştir.
      </p>

      <h2>2. Sözleşmenin Konusu ve Amacı</h2>
      <p>
        İşbu Sözleşme'nin konusu; Kullanıcı'nın Platform'u kullanımı
        sırasında elde edilen kişisel verilerinin, 6698 sayılı Kişisel
        Verilerin Korunması Kanunu ("KVKK"), ilgili ikincil mevzuat ve emsal
        yargı/kurul kararları çerçevesinde işlenmesi, aktarılması,
        güvenliğinin sağlanması ve tarafların bu kapsamdaki hak ve
        yükümlülüklerinin belirlenmesidir.
      </p>

      <h2>3. İşlenen Veri Kategorileri ve İşleme Amaçları</h2>
      <p>
        Platform, Kullanıcı'ya ait verileri "belirli, açık ve meşru amaçlar
        için" ve "işlendikleri amaçla bağlantılı, sınırlı ve ölçülü olma"
        ilkelerine uygun olarak işlemektedir.
      </p>

      <p>
        <strong>3.1. Kullanıcı Hesap ve Profil Bilgileri</strong>
      </p>
      <ul>
        <li>
          <strong>E-posta Adresi ve Ad-Soyad:</strong> Sözleşmenin ifası,
          hesap oluşturulması ve iletişim amacıyla işlenmektedir.
        </li>
        <li>
          <strong>Şifre:</strong> Düz metin olarak tutulmamakta, kriptografik
          yöntemlerle (hash'lenmiş olarak) şifrelenerek veri güvenliği
          standartlarına uygun şekilde saklanmaktadır.
        </li>
        <li>
          <strong>Profil Fotoğrafı ve Biyografi:</strong> Kullanıcının
          tamamen kendi özgür iradesiyle (isteğe bağlı) sisteme yüklediği bu
          veriler, platform içi etkileşimi sağlamak amacıyla açık rızaya
          dayalı olarak işlenmektedir.
        </li>
      </ul>

      <p>
        <strong>3.2. Konum Verisi (Ayrıştırılmış İşleme Modeli)</strong>
      </p>
      <p>
        Konum verileri, ölçülülük ilkesi gereği iki bağımsız kategoriye
        ayrılmıştır:
      </p>
      <ul>
        <li>
          <strong>Beyan Edilen Mahalle Bilgisi (Statik):</strong> Kullanıcının
          kayıt sırasında kendi beyanıyla seçtiği, GPS koordinatı içermeyen
          bölge bilgisidir. Veritabanında saklanır ve değiştirilme tarihleri
          log kayıtları ile tutulur.
        </li>
        <li>
          <strong>Canlı Cihaz Konumu (GPS):</strong> Yalnızca kullanıcıya
          yakın etkinlikleri listelemek amacıyla anlık olarak cihaz üzerinde
          işlenir. Bu veri kesinlikle sunucuya gönderilmemekte, veritabanında
          kalıcı veya geçici olarak saklanmamaktadır. Bu durum, veri
          minimizasyonu ve ölçülülük ilkesinin temel bir taahhüdüdür.
        </li>
      </ul>

      <p>
        <strong>3.3. Kullanıcılar Arası İletişim ve İçerik</strong>
      </p>
      <ul>
        <li>
          <strong>Özel Mesajlaşma:</strong> Kullanıcılar arası mesaj
          içerikleri ve son mesaj özeti, "özel haberleşmenin gizliliği"
          esasına dayalı olarak şifreli veritabanlarında saklanır. Platform,
          bu içerikler üzerinde keyfi bir denetim veya içerik analizi yapamaz.
        </li>
        <li>
          <strong>Yorumlar:</strong> Gönderilere yapılan yorumlar,
          kullanıcının alenileştirme iradesi doğrultusunda diğer kullanıcılara
          açık şekilde yayınlanır.
        </li>
      </ul>

      <p>
        <strong>3.4. Esnaf/İşletme Profilleri</strong>
      </p>
      <p>
        İşletme sahibi kullanıcıların beyan ettiği telefon numarası, açık
        adres, işletme adı, kategorisi ve görseli ile işletmenin sabit
        konumuna ait koordinat bilgisi (enlem/boylam) ticari faaliyetin ifası
        amacıyla işlenir.
      </p>
      <p>
        <strong>Ayrıştırma Taahhüdü:</strong> İşletme koordinat bilgisi,
        ticari bir adres verisi olup, Kullanıcı'nın kişisel/canlı GPS
        verisinden tamamen bağımsızdır ve bu iki veri seti hiçbir şekilde
        birleştirilerek profilleme yapılamaz.
      </p>

      <h2>4. Aydınlatma Yükümlülüğü ve Açık Rıza Mekanizması</h2>
      <p>
        <strong>4.1. Süreçlerin Ayrıştırılması:</strong> Platform, "Aydınlatma
        Yükümlülüğü" ile "Açık Rıza" süreçlerini birbirinden hukuken ve
        teknik olarak tamamen ayırmıştır. Kullanıcı, aydınlatma metnini
        okuduğunu beyan eden kutucuk ile kişisel verilerinin işlenmesine açık
        rıza gösterdiği kutucukları ayrı ayrı işaretler. "Battaniye rıza"
        (tek kutucukla tüm onayların alınması) yöntemi kullanılmaz.
      </p>
      <p>
        <strong>4.2. Hizmet Şartına Bağlamama:</strong> Temel platform
        hizmetlerinin (sözleşmenin ifası) sunulması, pazarlama, profil
        fotoğrafı paylaşımı veya canlı konum izni gibi açık rıza gerektiren
        veri işleme faaliyetlerine şart koşulamaz. Kullanıcı, açık rızasını
        dilediği zaman, hizmet kaybına uğramadan geri çekme hakkına sahiptir.
      </p>

      <h2>5. Yurt Dışına Veri Aktarımı (Sunucu Barındırma)</h2>
      <p>
        Platform'un veritabanı altyapısı, teknik zorunluluklar ve veri
        güvenliği standartları gereği Amazon Web Services (AWS) Tokyo
        (ap-northeast-1) bölgesinde fiziksel olarak barındırılmaktadır.
      </p>
      <p>
        Bu durum, KVKK'nın 9. maddesi kapsamında "Kişisel Verilerin Yurt
        Dışına Aktarılması" niteliği taşımaktadır. Kullanıcı, verilerinin
        Japonya'daki veri merkezlerinde barındırılmasına, aydınlatılmış onam
        çerçevesinde ve özgür iradesiyle açık rıza göstermedikçe (veya Kurul
        onaylı standart taahhütnameler tesis edilmedikçe) ilgili
        hizmetlerden veri aktarımını gerektiren kısımları kullanamayacağı
        konusunda bilgilendirilmiştir.
      </p>

      <h2>6. Veri Güvenliği, Doğruluk ve İspat Yükümlülüğü</h2>
      <p>
        <strong>6.1. Aktif Özen ve Doğrulama:</strong> Kullanıcı, sisteme
        girdiği iletişim bilgilerinin (e-posta vb.) doğru ve güncel olduğunu
        taahhüt eder. Platform, sahte hesapları ve veri ihlallerini önlemek
        amacıyla e-posta/SMS doğrulama (çift aşamalı doğrulama) mekanizmaları
        işletmekle yükümlüdür.
      </p>
      <p>
        <strong>6.2. Cihaz Güvenliği:</strong> Kullanıcı, kendi kişisel
        cihazının güvenliğini (antivirüs, şifre gizliliği) sağlamakla
        yükümlüdür. Kullanıcının cihazına bulaşan zararlı yazılımlar (trojan,
        phishing vb.) kaynaklı yetkisiz erişimlerden, Platform gerekli teknik
        tedbirleri almış olması şartıyla sorumlu tutulamaz.
      </p>
      <p>
        <strong>6.3. Teknik Tedbirler:</strong> Platform, canlı sistemlerde
        "debugging" (hata ayıklama) modlarını kapalı tutmayı, erişim
        loglarını zaman damgalı olarak değiştiremez şekilde saklamayı ve
        yetkisiz erişimleri engelleyecek güvenlik duvarı (firewall)
        mimarisini kurmayı taahhüt eder.
      </p>

      <h2>7. Rekabet Hukuku ve Veri Taşınabilirliği</h2>
      <p>
        <strong>7.1. Veri Birleştirme Yasağı:</strong> Platform, farklı
        hizmet modüllerinden (örn. kişisel mesajlaşma ile işletme profilleri)
        elde ettiği verileri, kullanıcının açık ve ayrıştırılmış rızası
        olmaksızın birleştirerek rekabeti bozucu bir "kaldıraç etkisi"
        yaratamaz ve bu verileri üçüncü taraf iştirakleriyle haksız rekabet
        yaratacak şekilde paylaşamaz.
      </p>
      <p>
        <strong>7.2. Veri Taşınabilirliği:</strong> İşletme/Esnaf profili
        sahipleri, platforma kendi rızalarıyla yükledikleri envanter, adres
        ve ticari verilerini diledikleri zaman, makul bir sürede ve yaygın
        kullanılan bir formatta (API veya dışa aktarım yoluyla) bedelsiz
        olarak talep etme ve rakip platformlara taşıma hakkına sahiptir.
        Platform, bu hakkın kullanımını zorlaştırıcı münhasırlık şartları
        ileri süremez.
      </p>

      <h2>8. Verilerin Saklanması ve İmhası</h2>
      <p>
        Kişisel veriler, işlenme amaçlarının gerektirdiği süre boyunca
        saklanır. İşleme amacının ortadan kalkması veya kullanıcının rızasını
        geri çekmesi halinde veriler, Platform'un "Veri Saklama ve İmha
        Politikası" uyarınca silinir, yok edilir veya anonim hale getirilir.
        Ancak, kanunlardan doğan saklama yükümlülükleri (örn. log
        kayıtlarının tutulması) devam ettiği müddetçe, kullanıcının silme
        talebi olsa dahi ilgili veriler yasal sürelerin sonuna kadar güvenli
        bir şekilde muhafaza edilir.
      </p>

      <h2>9. İlgili Kişinin Hakları (KVKK Madde 11)</h2>
      <p>
        Kullanıcı, KVKK'nın 11. maddesi uyarınca; kişisel verilerinin
        işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme
        amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde/yurt
        dışında aktarıldığı üçüncü kişileri bilme, eksik/yanlış işlenmişse
        düzeltilmesini isteme ve verilerin silinmesini/yok edilmesini talep
        etme haklarına sahiptir. Başvurular, Platform'un belirlediği ve
        Aydınlatma Metni'nde ilan edilen resmi iletişim kanalları üzerinden
        gerçekleştirilir.
      </p>

      <h2>10. Yürürlük ve Kabul</h2>
      <p>
        İşbu Sözleşme, Kullanıcı tarafından elektronik ortamda onaylandığı
        tarihte yürürlüğe girmiştir. Kullanıcı, Sözleşme'yi onaylamakla,
        Sözleşme'de yer alan tüm şartları okuduğunu, anladığını ve kabul
        ettiğini beyan eder. İşbu Sözleşme'den doğacak uyuşmazlıklarda,
        Platform'un dijital log kayıtları HMK m. 193 uyarınca kesin delil
        teşkil edecektir.
      </p>
    </LegalPageLayout>
  );
}
