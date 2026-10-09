import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT, FOOTER_LEGAL, LISTINGS, NAV, SITE } from '@/lib/site';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { SocialLinks } from '@/components/SocialLinks';

const COLUMNS = ['Corporate', 'Projects', 'Investors'] as const;

/** Captured once when the bundle is built, so prerendering stays deterministic. */
const BUILD_YEAR = new Date().getFullYear();

export function SiteFooter() {
  const year = BUILD_YEAR;

  return (
    <footer className="bg-[var(--color-navy)] text-white/75">
      <div className="shell py-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          {/* Identity + contact */}
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Silver One Resources Inc. — home" className="inline-block">
              <Image
                src="/brand/logo.png"
                alt="Silver One Resources Inc."
                width={219}
                height={58}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">{SITE.tagline}</p>

            <address className="mt-7 space-y-3 text-sm not-italic">
              <div className="flex gap-3">
                <MapPin size={15} className="mt-1 shrink-0 text-[var(--color-gold)]" aria-hidden />
                <span className="text-white/70">
                  {CONTACT.office.org}
                  <br />
                  {CONTACT.office.lines.join(', ')}
                </span>
              </div>
              <div className="flex gap-3">
                <Phone size={15} className="mt-0.5 shrink-0 text-[var(--color-gold)]" aria-hidden />
                <a href={CONTACT.office.telHref} className="text-white/70 transition-colors hover:text-white">
                  {CONTACT.office.tel}
                </a>
              </div>
              <div className="flex gap-3">
                <Mail size={15} className="mt-0.5 shrink-0 text-[var(--color-gold)]" aria-hidden />
                <a
                  href={`mailto:${CONTACT.office.email}`}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {CONTACT.office.email}
                </a>
              </div>
            </address>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3 lg:col-span-5">
            {COLUMNS.map((label) => {
              const group = NAV.find((g) => g.label === label);
              if (!group?.children) return null;
              return (
                <div key={label}>
                  <h2 className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-soft)]">
                    {label}
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {group.children.slice(0, 7).map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="text-sm text-white/65 transition-colors hover:text-white"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </nav>

          {/* Newsletter + listings */}
          <div className="lg:col-span-3">
            <h2 className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-soft)]">
              Stay Informed
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Receive Silver One news releases by email as they are issued.
            </p>
            <div className="mt-4">
              <NewsletterSignup variant="dark" compact />
            </div>

            <h2 className="mt-9 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-gold-soft)]">
              Listings
            </h2>
            <ul className="mt-4 space-y-2">
              {LISTINGS.map((l) => (
                <li key={l.symbol} className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="text-white/65">{l.exchange}</span>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold tracking-wide text-white transition-colors hover:text-[var(--color-gold-soft)]"
                  >
                    {l.symbol}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclosures */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="max-w-4xl text-xs leading-relaxed text-white/60">{SITE.qualifiedPerson}</p>
          <p className="mt-2 max-w-4xl text-xs leading-relaxed text-white/60">{SITE.exchangeDisclaimer}</p>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/60">
            © {year} {SITE.name}. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {FOOTER_LEGAL.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-xs text-white/65 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <SocialLinks tone="dark" />
        </div>
      </div>
    </footer>
  );
}
