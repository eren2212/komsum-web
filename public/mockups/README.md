# Telefon ekran görselleri

Bu klasöre kendi ekran görüntülerini/videolarını koy. Dosya adları kodda
beklenen şekilde olmalı:

| Dosya | Kullanıldığı yer | Önerilen oran |
|-------|------------------|---------------|
| `hero-phone.png` | Hero bölümü, taşan büyük telefon | 9:19 (ör. 1080×2280) |
| `screen-1.png` | Sabit telefon — Canlı Akış | 9:19 |
| `screen-2.png` | Sabit telefon — Ver-Al Pazar | 9:19 |
| `screen-3.png` | Sabit telefon — Esnaf Rehberi | 9:19 |
| `screen-4.png` | Sabit telefon — Mesajlaşma | 9:19 |

## Video kullanmak istersen

`.mp4` da desteklenir. İlgili bileşende `Media` çağrısına `video` prop'u
eklenir; video otomatik oynar, sessizdir ve döngüye alınır
(`autoplay muted loop playsinline`). Örn. `screen-1.mp4`.

Dosya yoksa gri bir "Görseli buraya ekleyin" kutusu gösterilir.
