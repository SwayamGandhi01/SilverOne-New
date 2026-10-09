import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { HomeHero } from '@/components/HomeHero';
import { ResourceMetrics } from '@/components/ResourceMetrics';
import { FeaturedVideoInvestors } from '@/components/FeaturedVideoInvestors';
import { HomeNewsCard, ProjectCard } from '@/components/cards';
import { RevealChild, RevealGroup, RevealOnScroll } from '@/components/Reveal';
import { home, latestNews, projects } from '@/lib/content';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Silver One Resources Inc. | Silver Exploration & Development',
  description: SITE.description,
  alternates: { canonical: '/' },
};

/** Small uppercase section label with the gold rule, as used across the page. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow text-[0.625rem]">{children}</p>;
}

export default function HomePage() {
  // The reference crop is a warm, wide mountain landscape. Of the three
  // original homepage slides this is the closest genuine match: Silver One's
  // own drilling at Candelaria at sunset, with the Nevada range behind.
  const heroImage =
    home.slides.find((s) => s.includes('home-pg-sunset')) ?? home.slides[0];
  const recent = latestNews(3);
  const aboutImage = home.features.find((f) => f.id === 'feature-0')?.bg;

  return (
    <>
      <HomeHero
        image={heroImage}
        alt="Sunset over Silver One drilling at the Candelaria Project, with the Nevada range behind"
      />

      <ResourceMetrics />

      {/* ------------------------------------------- about + projects band */}
      <section className="bg-[var(--color-warm)] py-9 lg:py-10">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left — About, with the photograph set beside the copy */}
          <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] sm:items-start sm:gap-7">
            <div>
              <RevealOnScroll>
                <Eyebrow>About Silver One</Eyebrow>
                <h2 className="mt-2.5 font-serif text-[clamp(1.5rem,2vw,1.85rem)] leading-[1.08] text-[var(--color-ink)]">
                  A Focused
                  <br />
                  Silver Explorer
                </h2>
                <p className="mt-3 text-[0.8125rem] leading-[1.55] text-[var(--color-slate)]">
                  Silver One Resources Inc. is focused on the exploration and development of
                  quality silver projects in the United States, with a portfolio of assets in
                  Nevada and Arizona.
                </p>
                <Link href="/corporate/about-silver-one/" className="btn btn-outline mt-4 h-10">
                  Learn About Silver One
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </RevealOnScroll>
            </div>

            {aboutImage && (
              <RevealOnScroll delay={0.08} y={22}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2px]">
                  <Image
                    src={aboutImage}
                    alt="Silver One geologist surveying the Candelaria property in Nevada"
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </RevealOnScroll>
            )}
          </div>

          {/* Right — the three properties */}
          <div>
            <RevealOnScroll>
              <div className="flex items-end justify-between gap-4">
                <Eyebrow>Our Projects</Eyebrow>
                <Link
                  href="/projects/usa-projects/"
                  className="group inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-[var(--color-teal-900)]"
                >
                  All projects
                  <ArrowRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </div>
            </RevealOnScroll>

            <RevealGroup className="mt-3 grid gap-3 sm:grid-cols-3" stagger={0.07}>
              {projects.map((p) => (
                <RevealChild key={p.slug}>
                  <ProjectCard project={p} />
                </RevealChild>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* --------------------------------------------- video + investor band */}
      {home.videoId && (
        <FeaturedVideoInvestors
          videoId={home.videoId}
          poster="/assets/files/2216/dji_0630.jpg"
          posterAlt="Aerial view of the Candelaria open pit and haul roads, central-west Nevada"
          videoTitle="Made In America | Silver One Resources (TSXV:SVE) — Visiting the Candelaria Project"
          videoMeta="Silver One Resources — Visiting the Candelaria Project"
        />
      )}

      {/* ------------------------------------------------------- latest news */}
      <section className="bg-[var(--color-warm)] py-9 lg:py-9">
        <div className="shell grid gap-7 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-12">
          <RevealOnScroll>
            <Eyebrow>Latest News</Eyebrow>
            <h2 className="mt-2.5 font-serif text-[clamp(1.4rem,1.85vw,1.7rem)] leading-[1.08] text-[var(--color-ink)]">
              Recent
              <br />
              News Releases
            </h2>
            <Link
              href="/news/"
              className="group mt-4 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-[var(--color-teal-900)]"
            >
              View All News
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </RevealOnScroll>

          <RevealGroup className="grid gap-3 sm:grid-cols-3" stagger={0.07}>
            {recent.map((n) => (
              <RevealChild key={n.slug}>
                <HomeNewsCard item={n} />
              </RevealChild>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
