import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type FilmSlide = {
  src?: string;
  alt: string;
  caption?: string;
};

export function PhotoFilm({
  slides,
  className,
  tone = "light",
  interval = 3800,
}: {
  slides: readonly FilmSlide[];
  className?: string;
  tone?: "light" | "dark";
  interval?: number;
}) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" });
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!embla || paused) return;
    const id = window.setInterval(() => embla.scrollNext(), interval);
    return () => window.clearInterval(id);
  }, [embla, paused, interval]);

  const dark = tone === "dark";

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {slides.map((s, i) => (
            <div
              key={`${s.alt}-${i}`}
              className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <figure className="relative aspect-4/3 overflow-hidden rounded-sm">
                {s.src ? (
                  <img
                    src={s.src}
                    alt={s.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className={cn(
                      "flex h-full w-full flex-col items-center justify-center gap-2 text-center",
                      dark
                        ? "bg-linear-to-br from-navy to-primary text-cream/70"
                        : "bg-linear-to-br from-secondary to-muted text-muted-foreground",
                    )}
                  >
                    <ImageIcon className="h-6 w-6 text-gold" aria-hidden />
                    <span className="px-3 text-xs tracking-[0.18em] uppercase">
                      {s.caption ?? "Photo coming soon"}
                    </span>
                  </div>
                )}
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Convert admin-managed photo records into carousel slides. */
export function toSlides(
  photos: { url?: string; alt?: string; caption?: string }[] | undefined,
): FilmSlide[] {
  return (photos ?? []).map((p) => ({
    src: p.url || undefined,
    alt: p.alt ?? "",
    caption: p.caption,
  }));
}
