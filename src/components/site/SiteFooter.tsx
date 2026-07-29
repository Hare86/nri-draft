import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/nri-logo.jpg.asset.json";
import { TRUST } from "@/content/trust";

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/30 bg-navy text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={logo.url}
              alt="NRI Educational Trust crest"
              className="h-14 w-14 shrink-0 rounded-full object-cover ring-1 ring-gold/60"
            />
            <div className="min-w-0">
              <p className="font-display text-xl text-gold">{TRUST.name}</p>
              <p className="text-xs tracking-[0.16em] text-cream/60 uppercase">
                Est. {TRUST.established}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/75">
            A charitable educational trust nurturing knowledge, classical arts and
            cultural values — guided by the motto {TRUST.mottoSanskrit} (“{TRUST.mottoEnglish}”).
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={TRUST.social.instagram}
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-sm border border-gold/40 text-gold hover:bg-gold hover:text-navy"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={TRUST.social.facebook}
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-sm border border-gold/40 text-gold hover:bg-gold hover:text-navy"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg text-gold">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm text-cream/75">
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/units/ashwamedha" className="hover:text-gold">Ashwamedha School of Arts</Link></li>
            <li><Link to="/units/preschool" className="hover:text-gold">Preschool</Link></li>
            <li><Link to="/programs" className="hover:text-gold">Programs &amp; Events</Link></li>
            <li><Link to="/gallery" className="hover:text-gold">Gallery</Link></li>
            <li><Link to="/news" className="hover:text-gold">News</Link></li>
            <li><Link to="/get-involved" className="hover:text-gold">Get Involved</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg text-gold">Reach Us</h2>
          <ul className="mt-4 space-y-3 text-sm text-cream/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{TRUST.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{TRUST.phone}</span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span className="break-all">{TRUST.email}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} {TRUST.name}. All rights reserved.</p>
          <p>Reg. No. {TRUST.registration}</p>
        </div>
      </div>
    </footer>
  );
}
