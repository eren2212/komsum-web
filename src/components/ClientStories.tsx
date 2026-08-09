import Media from "./Media";

const STORIES = [
  {
    src: "/stories/story-1.jpg",
    title: "Çiçekçi Sokağı dayanışması",
    place: "Kadıköy · İstanbul",
    rotate: "-rotate-3",
  },
  {
    src: "/stories/story-2.jpg",
    title: "Pazar günü takas şenliği",
    place: "Çankaya · Ankara",
    rotate: "rotate-2",
  },
  {
    src: "/stories/story-3.jpg",
    title: "Apartmanlar arası kermes",
    place: "Konak · İzmir",
    rotate: "-rotate-2",
  },
];

export default function ClientStories() {
  return (
    <section className="bg-bg-dark px-6 py-28 text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="display-chunky max-w-2xl text-[clamp(2.25rem,6vw,4.5rem)]">
          Mahallelerden hikayeler.
        </h2>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {STORIES.map((s) => (
            <article
              key={s.title}
              className={`group relative transition-transform duration-500 ${s.rotate} hover:rotate-0 hover:scale-[1.03]`}
            >
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-neutral-800 shadow-2xl">
                <Media
                  src={s.src}
                  alt={s.title}
                  className="aspect-[3/4] w-full object-cover"
                  label={s.src.split("/").pop()}
                />
              </div>

              {/* CTA overlay */}
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-md">
                <div>
                  <p className="font-display text-lg leading-tight">{s.title}</p>
                  <p className="text-xs text-white/60">{s.place}</p>
                </div>
                <a
                  href="#footer"
                  className="shrink-0 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white transition-transform group-hover:scale-105"
                >
                  Hikayeyi oku →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
