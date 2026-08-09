# Komşum — Tanıtım Sitesi

"Komşum" mobil uygulamasının scroll-animasyon ağırlıklı, tek sayfalık tanıtım
sitesi. Umano Design Studio yapısı referans alınarak; kapsül navbar, pinned
yatay kaydırma, kelime kelime aydınlanan metin ve smooth scroll ile.

## Teknoloji

- **React + Vite** (TypeScript)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **GSAP + ScrollTrigger** — pinned yatay kaydırma, metin reveal, sabit telefon
- **Lenis** — smooth scroll (ScrollTrigger ile senkron)
- Fontlar: **Bricolage Grotesque** (display) + **Inter** (gövde) — Google Fonts

## Çalıştırma

```bash
npm install
npm run dev      # geliştirme sunucusu
npm run build    # production derleme
npm run preview  # derlemeyi önizle
```

## Renk paleti

Tüm renkler `src/index.css` içindeki `@theme` bloğunda tanımlı. Vurgu rengini
değiştirmek için `--color-accent` ve `--color-accent-soft` değerlerini düzenle;
gerisi otomatik uyar.

```
--color-accent:      #16A34A   /* canlı yeşil — vurgu */
--color-accent-soft: #DCFCE7   /* açık yeşil zemin */
--color-bg-light:    #F4F4F2   /* kırık beyaz ana zemin */
--color-bg-cream:    #EDE9E1   /* kart/krem zemin */
--color-bg-dark:     #111111   /* koyu bölümler */
```

## Bölümler (`src/components/`)

| Bileşen | Açıklama |
|---------|----------|
| `Navbar` | Sabit kapsül navbar; yatay kart bölümünde nokta progress'e dönüşür; mobilde hamburger |
| `Hero` | Yeşil zemin, kalın başlık, 2sn'de değişen dönen kelime, taşan telefon |
| `StickyPhone` | Sabitlenen telefon; scroll'da içindeki 4 ekran sırayla değişir |
| `RevealText` | Scroll ile kelime kelime gri → siyah aydınlanan paragraf + basın logoları |
| `HorizontalCards` | ⭐ Pinned yatay kaydırma, 5 özellik kartı (mobilde swipe carousel) |
| `BrandMoment` | Açık → koyu geçiş; ekranı dolduran Komşum logosu |
| `ClientStories` | Koyu zemin, 3 eğik hikaye kartı, hover'da düzleşir |
| `FAQ` | Accordion; açık soru vurgu renginde, `+/−` ikonu |
| `Footer` | Yeşil marka kartı + bağlantılar + mağaza rozetleri + dev e-posta tipografisi |

## Medya dosyaları nereye konacak?

Tüm görsel/video alanları `/public` altında placeholder olarak bırakıldı.
Dosya yoksa "Görseli buraya ekleyin" gri kutusu gösterilir; doğru isimle dosya
koyduğunda otomatik görünür.

```
public/
├── mockups/   hero-phone.png, screen-1..4.png  (telefon ekranları, .mp4 de olur)
├── cards/     card-1..5.png                     (özellik kartı görselleri)
├── stories/   story-1..3.png                    (mahalle hikayeleri)
└── badges/    app-store.svg, google-play.svg     (mağaza rozetleri)
```

Her klasördeki `README.md` önerilen oranları ve isimleri açıklar.

## Erişilebilirlik & hareket

- Accordion'lar `<button>` + `aria-expanded`, görsellerde `alt`.
- `prefers-reduced-motion: reduce` aktifse smooth scroll ve scroll animasyonları
  devre dışı kalır, içerik statik olarak tam görünür.
- Yatay kart bölümü mobilde dokunmatik kaydırılan (snap) carousel'e döner.
