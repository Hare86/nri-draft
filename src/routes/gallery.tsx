import { createFileRoute } from "@tanstack/react-router";
import heroArts from "@/assets/hero-arts.jpg";
import preschoolImg from "@/assets/preschool.jpg";
import { PageHero, Section } from "@/components/site/Primitives";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — NRI Educational Trust" },
      {
        name: "description",
        content:
          "Photographs and videos from performances, preschool activities and trust events at the NRI Educational Trust.",
      },
      { property: "og:title", content: "Gallery — NRI Educational Trust" },
      {
        property: "og:description",
        content: "Moments from our performances, classrooms and community events.",
      },
    ],
  }),
  component: Gallery,
});

const items = [
  { src: heroArts, caption: "Arangetram recital", w: 1600, h: 900 },
  { src: preschoolImg, caption: "Preschool learning corners", w: 1400, h: 900 },
  { src: heroArts, caption: "Navaratri evening", w: 1600, h: 900 },
  { src: preschoolImg, caption: "Craft session", w: 1400, h: 900 },
  { src: heroArts, caption: "Guru Purnima", w: 1600, h: 900 },
  { src: preschoolImg, caption: "Annual day rehearsal", w: 1400, h: 900 },
];

function Gallery() {
  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Gallery"
        subtitle="A growing archive of performances, classrooms and celebrations. Final photographs and videos will be added before launch."
      />

      <Section eyebrow="Photographs" title="Recent moments">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <figure key={i} className="crest-frame overflow-hidden rounded-sm bg-card">
              <img
                src={item.src}
                alt={item.caption}
                width={item.w}
                height={item.h}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <figcaption className="px-4 py-3 text-sm text-muted-foreground">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow="Videos" title="Performance recordings">
        <div className="grid gap-6 md:grid-cols-3">
          {["Bharatanatyam recital", "Carnatic vocal concert", "Preschool annual day"].map(
            (label) => (
              <div
                key={label}
                className="crest-frame grid aspect-video place-items-center rounded-sm bg-navy text-center text-sm text-cream/70"
              >
                <span>
                  {label}
                  <br />
                  <span className="text-xs text-gold">Video to be added</span>
                </span>
              </div>
            ),
          )}
        </div>
      </Section>
    </>
  );
}
