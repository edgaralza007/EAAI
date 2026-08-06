import React from "react";
import { Link } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import Section from "./components/Section";
import Container from "./components/Container";
import SectionHeader from "./components/SectionHeader";
import Display from "./components/Display";
import Button from "./components/Button";
import Reveal from "./components/Reveal";
import { caseStudies } from "./caseStudies";

const monthYear = (d) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });

function Meta({ caseStudy }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-2xs uppercase tracking-label">
      <span className="text-accent">{caseStudy.category}</span>
      <span aria-hidden="true" className="h-px w-4 bg-rule" />
      <span className="text-ink-muted">{monthYear(caseStudy.date)}</span>
      <span aria-hidden="true" className="h-px w-4 bg-rule" />
      <span className="text-ink-muted">{caseStudy.readTime}</span>
    </div>
  );
}

// One bounded card. Image and copy are halves of a single object rather than
// two independent columns spanning the full container width.
function FeaturedCaseStudy({ caseStudy }) {
  return (
    <Link
      to={`/portfolio/${caseStudy.slug}`}
      className="group block overflow-hidden rounded-lg border border-rule bg-paper-raised transition-colors hover:border-accent"
    >
      <div className="grid lg:grid-cols-2">
        <div className="overflow-hidden">
          <img
            src={caseStudy.image}
            alt={caseStudy.title}
            width={1000}
            height={700}
            className="h-full min-h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>

        <div className="p-8 sm:p-10 lg:p-12">
          <Meta caseStudy={caseStudy} />

          <h2 className="mt-5 font-serif text-3xl leading-[1.15] text-ink transition-colors group-hover:text-accent">
            {caseStudy.title}
          </h2>

          <div className="mt-4 text-2xs uppercase tracking-label text-ink-muted">
            {caseStudy.client}
          </div>

          <p className="mt-5 text-base leading-[1.65] text-ink-muted">{caseStudy.excerpt}</p>

          {caseStudy.results?.length > 0 && (
            <ul className="mt-7">
              {caseStudy.results.slice(0, 2).map((r) => (
                <li key={r} className="flex gap-4 border-t border-rule py-3.5 last:border-b">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                  <span className="text-sm leading-[1.6] text-ink">{r}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-7 text-2xs uppercase tracking-label text-accent">
            See how we did it →
          </div>
        </div>
      </div>
    </Link>
  );
}

function CaseStudyCard({ caseStudy }) {
  return (
    <Link
      to={`/portfolio/${caseStudy.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-rule bg-paper-raised transition-colors hover:border-accent"
    >
      <div className="overflow-hidden">
        <img
          src={caseStudy.image}
          alt={caseStudy.title}
          width={700}
          height={440}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex flex-1 flex-col p-7">
        <Meta caseStudy={caseStudy} />
        <h3 className="mt-4 font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-accent">
          {caseStudy.title}
        </h3>
        <p className="mt-3 flex-1 text-base leading-[1.65] text-ink-muted">
          {caseStudy.excerpt}
        </p>
        <div className="mt-6 text-2xs uppercase tracking-label text-accent">
          See how we did it →
        </div>
      </div>
    </Link>
  );
}

export default function Portfolio() {
  const [featured, ...rest] = caseStudies;

  return (
    <PageLayout>
      <Section space="tight" className="pt-14 md:pt-20">
        <Container>
          <Reveal>
            <SectionHeader
              as="h1"
              size="xl"
              index="01"
              eyebrow="Client Results"
              title="Case Studies & Success Stories"
              intro="We partner with growing businesses to automate operations, deploy AI, and unlock scale — without proportional overhead."
            />
          </Reveal>
        </Container>
      </Section>

      <Section space="tight">
        <Container>
          {featured && (
            <Reveal>
              <FeaturedCaseStudy caseStudy={featured} />
            </Reveal>
          )}

          {rest.length > 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((cs, i) => (
                <Reveal key={cs.id} delay={i * 0.06}>
                  <CaseStudyCard caseStudy={cs} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section bordered>
        <Container>
          <Reveal>
            <div className="max-w-2xl">
              <Display as="h2" size="lg">
                Ready to write your success story?
              </Display>
              <p className="mt-5 text-lg leading-[1.65] text-ink-muted">
                Let's discuss how we can help you achieve similar results.
              </p>
              <div className="mt-8">
                <Button to="/#contact" variant="primary" arrow>
                  Book a Consult
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </PageLayout>
  );
}
