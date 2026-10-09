'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { Globe, Layers, MapPin, Triangle } from 'lucide-react';
import { METRICS, RESOURCE_NOTE, RESOURCE_SOURCE, type Metric } from '@/lib/metrics';

const ICONS = { resource: Layers, inferred: Triangle, pin: MapPin, globe: Globe };

/** Counts up to the verified figure. The end value is always the exact number. */
function Counter({
  value,
  decimals,
  suffix,
  prefix = '',
}: Pick<Metric, 'value' | 'decimals' | 'suffix' | 'prefix'>) {
  const ref = useRef<HTMLSpanElement>(null);
  // Vertical-only margin: a bare '-15%' also insets the root horizontally,
  // which left the first (left-most) counter permanently out of view.
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  const reduce = useReducedMotion();
  // Animation progress, 0 → 1. Only ever advanced from inside the rAF
  // callback, so the effect body stays free of synchronous state updates.
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView || reduce || value === 0) return;
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setProgress(t);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  // Reduced motion (and the textual metrics) land on the final value at once.
  const t = reduce ? 1 : progress;
  const eased = 1 - Math.pow(1 - t, 3);

  // A zero value means the metric is purely textual (e.g. "USA").
  const text = value === 0 ? suffix : `${prefix}${(value * eased).toFixed(decimals)}${suffix}`;

  return (
    <span ref={ref} className="tabular-nums">
      {text}
    </span>
  );
}

export function ResourceMetrics() {
  return (
    <section
      aria-label="Key company figures"
      className="relative isolate border-b border-[var(--color-stone)] bg-[var(--color-warm)]"
    >
      {/* Faint topographic contours, echoing the survey maps on the project
          pages. Decorative only. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full text-[var(--color-gold)] opacity-[0.08]"
        preserveAspectRatio="none"
        viewBox="0 0 1440 110"
      >
        {[0, 16, 32, 48, 64, 80].map((o) => (
          <path
            key={o}
            d={`M0 ${92 - o * 0.5} C 170 ${66 - o * 0.45}, 330 ${106 - o * 0.55}, 530 ${78 - o * 0.45} S 910 ${46 - o * 0.36}, 1130 ${84 - o * 0.5} S 1370 ${58 - o * 0.4}, 1440 ${72 - o * 0.45}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
      </svg>

      <div className="shell relative">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5 py-5 lg:grid-cols-4 lg:gap-0 lg:py-0">
          {METRICS.map((m, i) => {
            const Icon = ICONS[m.icon];
            const inner = (
              <>
                <Icon
                  size={22}
                  strokeWidth={1.2}
                  className="mt-0.5 shrink-0 text-[var(--color-gold)] transition-transform duration-500 group-hover:scale-110"
                  aria-hidden
                />
                <span className="min-w-0">
                  <span className="block font-serif text-[clamp(1.3rem,1.85vw,1.7rem)] leading-none text-[var(--color-ink)]">
                    <Counter value={m.value} decimals={m.decimals} suffix={m.suffix} prefix={m.prefix} />
                  </span>
                  <span className="mt-1 block text-[0.75rem] font-medium leading-tight text-[var(--color-ink)]">
                    {m.label}
                  </span>
                </span>
              </>
            );

            return (
              <li key={m.label} className={i > 0 ? 'lg:border-l lg:border-[var(--color-stone)]' : ''}>
                {m.href ? (
                  <Link
                    href={m.href}
                    title={m.detail}
                    aria-describedby={`metric-detail-${i}`}
                    className="group flex items-start gap-3 transition-colors hover:text-[var(--color-teal-900)] lg:px-6 lg:py-[15px] xl:px-8"
                  >
                    {inner}
                    <span id={`metric-detail-${i}`} className="sr-only">
                      {m.detail}
                    </span>
                  </Link>
                ) : (
                  <div className="group flex items-start gap-3 lg:px-6 lg:py-[15px] xl:px-8">
                    {inner}
                    <span className="sr-only">{m.detail}</span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <p className="border-t border-[var(--color-stone)]/70 py-2 text-[0.625rem] leading-snug text-[var(--color-slate)]">
          {RESOURCE_NOTE}{' '}
          <Link
            href={RESOURCE_SOURCE.href}
            className="font-medium text-[var(--color-teal-900)] underline underline-offset-2"
          >
            {RESOURCE_SOURCE.label}
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
