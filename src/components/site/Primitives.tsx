import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-gold/25 bg-navy text-cream">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center lg:px-8 lg:py-20">
        {eyebrow ? (
          <p className="text-xs tracking-[0.25em] text-gold uppercase">{eyebrow}</p>
        ) : null}
        <h1 className="mt-3 font-display text-4xl leading-tight font-semibold sm:text-5xl">
          {title}
        </h1>
        <div className="gold-rule mx-auto mt-6 w-40" />
        {subtitle ? (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-cream/75">
            {subtitle}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function Section({
  title,
  eyebrow,
  intro,
  tone = "default",
  children,
}: {
  title?: string;
  eyebrow?: string;
  intro?: string;
  tone?: "default" | "muted";
  children: ReactNode;
}) {
  return (
    <section className={tone === "muted" ? "bg-cream" : "bg-background"}>
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        {title ? (
          <div className="max-w-2xl">
            {eyebrow ? (
              <p className="text-xs tracking-[0.25em] text-maroon uppercase">{eyebrow}</p>
            ) : null}
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{title}</h2>
            <div className="gold-rule mt-4 w-28" />
            {intro ? (
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{intro}</p>
            ) : null}
          </div>
        ) : null}
        <div className={title ? "mt-10" : ""}>{children}</div>
      </div>
    </section>
  );
}

export function Card({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string;
  children?: ReactNode;
}) {
  return (
    <article className="crest-frame h-full rounded-sm bg-card p-6">
      {meta ? (
        <p className="text-xs tracking-[0.18em] text-maroon uppercase">{meta}</p>
      ) : null}
      <h3 className="mt-2 font-display text-xl font-semibold">{title}</h3>
      {children ? (
        <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
      ) : null}
    </article>
  );
}
