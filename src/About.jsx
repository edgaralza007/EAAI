import React, { useState } from "react";
import PageLayout from "./components/PageLayout";
import Section from "./components/Section";
import Container from "./components/Container";
import Eyebrow from "./components/Eyebrow";
import Display from "./components/Display";
import SectionHeader from "./components/SectionHeader";
import Button from "./components/Button";
import Reveal from "./components/Reveal";

const principles = [
  {
    heading: "What we optimize for",
    items: [
      "Faster workflows and reduced manual effort",
      "Better customer experience and conversion",
      "Clear ownership, documentation, and training",
    ],
  },
  {
    heading: "How we work",
    items: [
      "Short cycles with real deliverables",
      "Simple, maintainable tech choices",
      "Knowledge transfer built-in",
    ],
  },
];

function PersonPhoto({ label, testId, src }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        data-testid={testId}
        aria-label={label}
        className="flex aspect-square w-full items-center justify-center border border-rule bg-paper-raised"
      >
        <div className="text-center text-2xs uppercase tracking-label text-ink-muted">
          Photo
        </div>
      </div>
    );
  }

  return (
    <img
      data-testid={testId}
      src={src}
      alt={label}
      width={600}
      height={600}
      loading="lazy"
      onError={() => setHasError(true)}
      className="aspect-square w-full object-cover"
    />
  );
}

/**
 * The original stretched an invisible anchor across the whole card and set the
 * content to pointer-events-none so clicks fell through to it. That hid the
 * card's text from the link's accessible name and forced the real CTA to need
 * a z-index escape hatch. One explicit link is clearer and correct.
 *
 * Laid out as a bounded card so the photo and the bio read as one object.
 */
function PersonCard({ name, title, bio, photoTestId, photoSrc, href, ctaLabel = "Visit" }) {
  return (
    <article className="grid overflow-hidden rounded-lg border border-rule bg-paper-raised md:grid-cols-3">
      <div className="md:col-span-1">
        <PersonPhoto label={`${name} photo`} testId={photoTestId} src={photoSrc} />
      </div>

      <div className="p-7 sm:p-9 md:col-span-2">
        <h3 className="font-serif text-2xl leading-snug text-ink">{name}</h3>
        <div className="mt-2.5 text-2xs uppercase tracking-label text-accent">{title}</div>
        <p className="mt-6 max-w-xl whitespace-pre-line text-base leading-[1.7] text-ink-muted">
          {bio}
        </p>

        {href && (
          <div className="mt-7">
            <Button to={href} variant="secondary">
              {ctaLabel}
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}

export default function About() {
  return (
    <PageLayout>
      {/* Hero ------------------------------------------------------------ */}
      <Section tone="ink" space="tight" className="relative overflow-hidden pt-14 md:pt-20">
        {/* Soft accent glow, upper right — depth without a literal graphic. */}
        <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0" />

        <Container>
          <Reveal className="relative z-10 max-w-2xl">
            <Eyebrow index="01" inverted>
              About
            </Eyebrow>

            {/* Short enough that the balancer lands the break on the phrase
                boundary by itself, so no explicit <br> is needed at any width. */}
            <Display as="h1" size="xl" className="mt-6">
              A practical AI partner for real outcomes
            </Display>

            <p className="mt-6 max-w-xl text-lg leading-[1.65] text-paper/70">
              We help founders and operators design, deploy, and improve AI-powered systems
              without the hype. From strategy and architecture to implementation and
              enablement, we build solutions that fit your business.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button to="/#contact" variant="primary" arrow>
                Book a Consult
              </Button>
              <Button to="/portfolio" variant="inverted">
                View Portfolio
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Mission --------------------------------------------------------- */}
      <Section bordered>
        <Container>
          <Reveal>
            <SectionHeader index="02" eyebrow="Mission" title="Our mission" />
          </Reveal>

          <Reveal>
            <p className="mt-8 max-w-3xl border-l-2 border-accent pl-8 font-serif text-2xl italic leading-[1.4] text-ink sm:text-3xl">
              To make technology work for businesses, not the other way around.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {principles.map((group, i) => (
              <Reveal key={group.heading} delay={i * 0.06}>
                <div className="h-full rounded-lg border border-rule bg-paper-raised p-7">
                  <div className="text-2xs uppercase tracking-label text-accent">
                    {group.heading}
                  </div>
                  <ul className="mt-5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-4 border-t border-rule py-3.5 text-base leading-[1.6] text-ink-muted"
                      >
                        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team ------------------------------------------------------------ */}
      <Section bordered>
        <Container>
          <Reveal>
            <SectionHeader
              index="03"
              eyebrow="Team"
              title="Leadership Team"
              intro="Two process-oriented experts that know how to bring visions to life."
            />
          </Reveal>

          <div className="mt-14 space-y-6">
            <Reveal>
              <PersonCard
                name="Edgar Alza"
                title="Founder & CEO"
                photoTestId="photo-edgar"
                photoSrc="/team/edgar.webp"
                bio="Edgar is an entrepreneur and product management leader who founded his first company, Lucky Backpack, at 21 and has held senior roles at Amazon Web Services, Amazon Operations, and Accenture.

              At Amazon, Edgar led key innovations across AWS customer experience products, notably launching Amazon Connect’s agent applications and scaling them from inception to millions of daily users.

              Edgar created EAA Cap to enable organizations of any background to adopt practical AI solutions that improve customer experiences and operational efficiency."
              />
            </Reveal>

            <Reveal>
              <PersonCard
                name="Clarem Gonzalez"
                title="Co-Founder & COO"
                photoTestId="photo-clarem"
                photoSrc="/team/clarem.webp"
                bio="Clarem is a creative project manager with over 10 years of experience helping brands bring ideas to life.

She has worked across food, fashion, tech, and lifestyle, guiding campaigns from the first brief through final launch.

Her strength lies in connecting strategy with execution, keeping teams aligned, timelines on track, and brands looking their best."
                href="https://claremglez.com"
                ctaLabel="Visit Site"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* CTA ------------------------------------------------------------- */}
      <Section bordered>
        <Container>
          <Reveal>
            <div className="max-w-2xl">
              <Display as="h2" size="lg">
                Want to see if we’re a fit?
              </Display>
              <p className="mt-5 text-lg leading-[1.65] text-ink-muted">
                Share your goals and we’ll recommend the fastest path to measurable ROI.
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
