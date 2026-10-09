'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MarketPanel } from '@/components/MarketPanel';

/**
 * Cinematic hero band. Deliberately short — the approved composition puts the
 * hero, metrics, about/projects and video bands all within the first screen,
 * so this is a wide letterbox rather than a full-height splash.
 */
export function HomeHero({ image, alt }: { image: string; alt: string }) {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduce ? 0.25 : 0.7,
      delay: reduce ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section className="relative isolate flex min-h-[26rem] items-center overflow-hidden bg-[var(--color-navy-deep)] sm:min-h-[24rem] lg:h-[295px] lg:min-h-0 xl:h-[310px]">
      {/* Slow, restrained reveal of the landscape — no looping background motion. */}
      <motion.div
        initial={{ scale: reduce ? 1 : 1.06, opacity: 0.45 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: reduce ? 0.3 : 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={image}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_42%]"
        />
      </motion.div>

      <div className="absolute inset-0 scrim" aria-hidden />

      <div className="shell relative w-full py-8 lg:py-0">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-xl">
            <motion.p
              {...rise(0.08)}
              className="eyebrow flex-wrap gap-x-2.5 gap-y-1 text-[0.625rem] text-[var(--color-gold-soft)] max-sm:[&::after]:hidden sm:gap-x-3"
            >
              <span>Explore</span>
              <span aria-hidden className="text-white/35">·</span>
              <span>Develop</span>
              <span aria-hidden className="text-white/35">·</span>
              <span>Create Long-Term Value</span>
            </motion.p>

            <motion.h1
              {...rise(0.16)}
              className="mt-3 font-serif text-[clamp(2.1rem,4.1vw,3.55rem)] leading-[0.98] tracking-[-0.022em] text-white"
            >
              Silver One
              <br />
              Resources Inc.
            </motion.h1>

            <motion.p
              {...rise(0.26)}
              className="mt-3.5 max-w-[26rem] text-[0.9375rem] leading-[1.55] text-white/80"
            >
              Focused on the exploration and development of quality silver projects in premier
              mining jurisdictions.
            </motion.p>

            <motion.div {...rise(0.36)} className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <Link href="/projects/usa-projects/" className="btn btn-primary h-11">
                Explore Our Projects
                <ArrowRight size={15} aria-hidden />
              </Link>
              <Link href="/investors/" className="btn btn-ghost-light h-11">
                Investor Information
              </Link>
            </motion.div>
          </div>

          <motion.div {...rise(0.46)} className="w-full sm:max-w-sm lg:w-[22rem] lg:shrink-0">
            <MarketPanel variant="hero" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
