import { createFileRoute } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";
import { PageHero, Section } from "@/components/site/Primitives";
import { useContent } from "@/lib/site-content";

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

function Gallery() {
  const photos = useContent<any>("gallery.photos");
  const videos = useContent<any>("gallery.videos");

  return (
    <>
      <PageHero eyebrow="Media" title="Gallery" subtitle={photos.subtitle} />

      <Section eyebrow={photos.eyebrow} title={photos.title}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(photos.photos ?? []).map((item: any, i: number) => (
            <figure key={i} className="crest-frame overflow-hidden rounded-sm bg-card">
              {item.url ? (
                <img
                  src={item.url}
                  alt={item.alt || item.caption || "Gallery photograph"}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <div className="grid aspect-[4/3] w-full place-items-center bg-secondary text-muted-foreground">
                  <ImageIcon className="h-6 w-6 text-gold" aria-hidden />
                </div>
              )}
              <figcaption className="px-4 py-3 text-sm text-muted-foreground">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section tone="muted" eyebrow={videos.eyebrow} title={videos.title}>
        <div className="grid gap-6 md:grid-cols-3">
          {(videos.items ?? []).map((v: any, i: number) =>
            v.href ? (
              <div key={i} className="crest-frame overflow-hidden rounded-sm bg-navy">
                <iframe
                  src={v.href}
                  title={v.label}
                  loading="lazy"
                  allowFullScreen
                  className="aspect-video w-full"
                />
                <p className="px-4 py-3 text-sm text-cream/80">{v.label}</p>
              </div>
            ) : (
              <div
                key={i}
                className="crest-frame grid aspect-video place-items-center rounded-sm bg-navy text-center text-sm text-cream/70"
              >
                <span>
                  {v.label}
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
