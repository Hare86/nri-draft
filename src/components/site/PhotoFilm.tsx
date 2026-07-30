import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
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

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  useEffect(() => {
    if (!embla || paused) return;
    const id = window.setInterval(() => embla.scrollNext(), interval);
    return () => window.clearInterval(id);
  }, [embla, paused, interval]);

  const dark = tone === "dark";

  return (
    <div
      className={cn("group relative", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className={cn(
          "rounded-sm border p-2",
          dark ? "border-gold/40 bg-navy/60" : "border-gold/50 bg-card",
        )}
      >
        {/* film perforation strip */}
        <FilmPerforation dark={dark} />
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-2">
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
        <FilmPerforation dark={dark} />
      </div>

      <FilmButton side="left" onClick={scrollPrev} dark={dark} />
      <FilmButton side="right" onClick={scrollNext} dark={dark} />
    </div>
  );
}

function FilmPerforation({ dark }: { dark: boolean }) {
  return (
    <div className="flex justify-between gap-1 px-1 py-1" aria-hidden>
      {Array.from({ length: 16 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 w-3 rounded-[1px]",
            dark ? "bg-cream/15" : "bg-navy/10",
          )}
        />
      ))}
    </div>
  );
}

function FilmButton({
  side,
  onClick,
  dark,
}: {
  side: "left" | "right";
  onClick: () => void;
  dark: boolean;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous photo" : "Next photo"}
      className={cn(
        "absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-gold/60 p-2 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100",
        side === "left" ? "-left-3" : "-right-3",
        dark ? "bg-navy text-gold" : "bg-card text-maroon",
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
