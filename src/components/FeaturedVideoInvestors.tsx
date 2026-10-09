'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  FileBarChart,
  FileSpreadsheet,
  FileText,
  Landmark,
  PieChart,
  Play,
  Presentation,
  Scale,
} from 'lucide-react';
import { VideoModal, type VideoModalSource } from '@/components/VideoModal';

/** Every destination is a route that exists on this site. */
const RESOURCES = [
  { label: 'Stock Chart', href: '/investors/overview/', icon: BarChart3 },
  { label: 'Share Structure', href: '/investors/share-structure/', icon: PieChart },
  { label: 'Presentations', href: '/investors/presentations/', icon: Presentation },
  { label: 'Factsheet', href: '/investors/factsheets/', icon: FileText },
  { label: 'Financial Statements', href: '/corporate/financials-statements/', icon: FileSpreadsheet },
  { label: 'AGM Materials', href: '/investors/agm-material/', icon: Landmark },
  { label: 'ESTMA Reports', href: '/investors/estma_reports-2/', icon: FileBarChart },
  { label: 'LIFE', href: '/investors/life/', icon: Scale },
] as const;

/** Low-contrast contour decoration behind the investor panel. */
function TopoLines() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full text-[var(--color-gold)] opacity-[0.07]"
      preserveAspectRatio="none"
      viewBox="0 0 760 520"
    >
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const o = i * 26;
        return (
          <path
            key={i}
            d={`M-20 ${430 - o * 0.9} C 120 ${392 - o * 0.85}, 250 ${470 - o} , 400 ${412 - o * 0.9} S 640 ${338 - o * 0.78}, 780 ${398 - o * 0.9}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
}

export function FeaturedVideoInvestors({
  videoId,
  poster,
  posterAlt,
  videoTitle,
  videoMeta,
}: {
  videoId: string;
  poster: string;
  posterAlt: string;
  videoTitle: string;
  videoMeta: string;
}) {
  const [open, setOpen] = useState<VideoModalSource | null>(null);
  const reduce = useReducedMotion();

  /**
   * Entrance props. With reduced motion the element is simply rendered in
   * place — it must never depend on an intersection observer to become
   * visible, or the content can stay at opacity 0.
   */
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-12% 0px' },
          transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <>
      <section
        aria-labelledby="investor-resources-heading"
        className="grid lg:min-h-[512px] lg:grid-cols-[48fr_52fr]"
      >
        {/* ------------------------------------------------- featured video */}
        <div className="relative isolate min-h-[17rem] overflow-hidden bg-[var(--color-navy-deep)] sm:min-h-[20rem] lg:min-h-0">
          <motion.div
            {...(reduce
              ? {}
              : {
                  initial: { scale: 1.05, opacity: 0.5 },
                  whileInView: { scale: 1, opacity: 1 },
                  viewport: { once: true, margin: '-10% 0px' },
                  transition: { duration: 1.3, ease: [0.22, 1, 0.36, 1] as const },
                })}
            className="absolute inset-0"
          >
            <Image
              src={poster}
              alt={posterAlt}
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover object-[62%_46%]"
            />
          </motion.div>

          <div className="absolute inset-0 scrim" aria-hidden />

          <div className="relative flex h-full flex-col justify-center p-7 sm:p-10 lg:p-12 xl:p-14">
            <motion.p
              {...rise(0.05)}
              className="eyebrow text-[0.625rem] text-[var(--color-gold-soft)]"
            >
              Featured Video
            </motion.p>

            <motion.h2
              {...rise(0.14)}
              className="mt-4 max-w-md font-serif text-[clamp(2rem,3.4vw,3.1rem)] leading-[1.02] tracking-[-0.018em] text-white"
            >
              Inside Candelaria
            </motion.h2>

            <motion.p
              {...rise(0.22)}
              className="mt-3.5 max-w-xs text-[0.9375rem] leading-[1.5] text-white/80"
            >
              {videoMeta}
            </motion.p>

            <motion.div {...rise(0.3)} className="mt-8">
              <button
                type="button"
                onClick={() =>
                  setOpen({
                    provider: 'youtube',
                    id: videoId,
                    title: videoTitle,
                    meta: videoMeta,
                    watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
                  })
                }
                className="group inline-flex items-center gap-4 text-left"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]">
                  <Play
                    size={18}
                    className="translate-x-[2px] fill-[var(--color-navy)] text-[var(--color-navy)]"
                    aria-hidden
                  />
                </span>
                <span className="text-[0.9375rem] font-semibold text-white">
                  Watch Video
                  <span className="sr-only"> — {videoTitle}</span>
                </span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* --------------------------------------------- investor resources */}
        <div className="relative isolate overflow-hidden bg-[var(--color-warm)] px-6 py-10 sm:px-9 lg:flex lg:flex-col lg:justify-center lg:px-9 lg:py-11 xl:px-11">
          <TopoLines />

          <div className="relative">
            <div className="grid gap-5 xl:grid-cols-[minmax(0,14.75rem)_minmax(0,1fr)_minmax(0,auto)] xl:items-start xl:gap-7">
              <motion.div {...rise(0.05)}>
                <p className="eyebrow text-[0.625rem]">Investor Information</p>
                <h2
                  id="investor-resources-heading"
                  className="mt-3 font-serif text-[clamp(1.55rem,2.2vw,2.05rem)] leading-[1.06] text-[var(--color-ink)]"
                >
                  Key Resources
                  <br className="hidden sm:block" /> for Investors
                </h2>
              </motion.div>

              <motion.p
                {...rise(0.12)}
                className="max-w-md text-[0.8125rem] leading-[1.62] text-[var(--color-slate)] xl:max-w-[17rem] xl:pt-7"
              >
                Access our latest presentations, financial information, reports and other
                resources to stay up to date on Silver One.
              </motion.p>

              <motion.div {...rise(0.18)} className="xl:pt-6">
                <Link href="/investors/" className="btn btn-primary h-11 whitespace-nowrap">
                  View All Resources
                  <ArrowRight size={15} aria-hidden />
                </Link>
              </motion.div>
            </div>

            <motion.ul
              {...(reduce
                ? {}
                : {
                    initial: 'hidden',
                    whileInView: 'show',
                    viewport: { once: true, margin: '-8% 0px' },
                    variants: { hidden: {}, show: { transition: { staggerChildren: 0.04 } } },
                  })}
              className="mt-8 grid grid-cols-2 gap-3 lg:mt-9 xl:grid-cols-4"
            >
              {RESOURCES.map((r) => (
                <motion.li
                  key={r.href}
                  {...(reduce
                    ? {}
                    : {
                        variants: {
                          hidden: { opacity: 0, y: 10 },
                          show: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
                          },
                        },
                      })}
                >
                  <Link
                    href={r.href}
                    className="group flex h-full min-h-[5.25rem] flex-col justify-between rounded-[2px] border border-[var(--color-stone)] bg-white/70 p-3.5 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--color-gold)]/55 hover:bg-white"
                  >
                    <r.icon
                      size={18}
                      strokeWidth={1.4}
                      className="text-[var(--color-gold)]"
                      aria-hidden
                    />
                    <span className="mt-3 flex items-end justify-between gap-2">
                      <span className="text-[0.75rem] font-semibold leading-tight text-[var(--color-ink)]">
                        {r.label}
                      </span>
                      <ArrowRight
                        size={13}
                        className="shrink-0 translate-y-[-1px] text-[var(--color-slate)] transition-transform duration-300 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      <VideoModal source={open} onClose={() => setOpen(null)} />
    </>
  );
}
