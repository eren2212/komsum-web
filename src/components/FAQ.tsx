import { useState } from "react";

const FAQS = [
  {
    q: "Komşum ücretsiz mi?",
    a: "Evet, temel özelliklerin tamamı ücretsizdir. Yerel işletmeler için ek özellikler ileride sunulabilir.",
  },
  {
    q: "Mahalleme nasıl katılırım?",
    a: "Adresini doğruladıktan sonra otomatik olarak kendi mahalle ağına eklenirsin. Sadece o ağdaki komşularla etkileşime girebilirsin.",
  },
  {
    q: "Verilerim güvende mi?",
    a: "Komşum kapalı bir ağdır; sadece doğrulanmış komşular birbirini görür. Mesajlaşma uçtan uca güvenlidir.",
  },
  {
    q: "Esnaf/usta olarak kayıt olabilir miyim?",
    a: "Evet, yerel işletmeler kendi profillerini açıp komşu oylarıyla referans kazanabilir.",
  },
  {
    q: "Hangi şehirlerde aktif?",
    a: "Yeni mahalleler sürekli ekleniyor. Uygulamayı indirip adresini girerek mahallenin aktif olup olmadığını görebilirsin.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-bg-dark px-6 pb-32 pt-10 text-white">
      <div className="mx-auto max-w-3xl">
        <h2 className="display-chunky text-[clamp(2rem,5vw,3.5rem)]">
          Sık sorulan sorular.
        </h2>
        <p className="mt-3 text-white/60">
          Başlamadan önce bilmen gereken her şey.
        </p>

        <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span
                    className={`font-display text-xl transition-colors sm:text-2xl ${
                      isOpen ? "text-accent" : "text-white"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-2xl leading-none transition-colors ${
                      isOpen
                        ? "border-accent text-accent"
                        : "border-white/30 text-white/70"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-12 text-white/70">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
