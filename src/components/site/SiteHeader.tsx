import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/nri-logo.jpg.asset.json";
import { cn } from "@/lib/utils";
import { useContent } from "@/lib/site-content";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/units/ashwamedha", label: "Ashwamedha" },
  { to: "/units/preschool", label: "Preschool" },
  { to: "/programs", label: "Programs" },
  { to: "/gallery", label: "Gallery" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const identity = useContent<any>("site.identity");

  return (
    <header className="sticky top-0 z-50 border-b border-gold/30 bg-navy text-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img
            src={identity.logo || logo.url}
            alt="Nagalakshmi Ramamurthy Iyer Educational Trust crest"
            className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-gold/60"
          />
          <span className="min-w-0">
            <span className="block truncate font-display text-lg leading-tight font-semibold text-gold">
              {identity.shortName}
            </span>
            <span className="hidden truncate text-[11px] tracking-[0.18em] text-cream/70 uppercase sm:block">
              {identity.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="text-sm text-cream/85 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold font-semibold" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/get-involved"
            className="rounded-sm bg-gold px-4 py-2 text-sm font-semibold text-navy transition-opacity hover:opacity-90"
          >
            Donate
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-sm border border-gold/40 text-gold xl:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className={cn("border-t border-gold/20 xl:hidden", open ? "block" : "hidden")}>
        <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: item.to === "/" }}
              className="border-b border-cream/10 py-3 text-sm text-cream/85"
              activeProps={{ className: "text-gold font-semibold" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/get-involved"
            onClick={() => setOpen(false)}
            className="my-3 rounded-sm bg-gold px-4 py-2.5 text-center text-sm font-semibold text-navy"
          >
            Donate / Get Involved
          </Link>
        </nav>
      </div>
    </header>
  );
}
