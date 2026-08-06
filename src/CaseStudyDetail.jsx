import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageLayout from "./components/PageLayout";
import Section from "./components/Section";
import Container from "./components/Container";
import Display from "./components/Display";
import Button from "./components/Button";
import Reveal from "./components/Reveal";
import { caseStudies } from "./caseStudies";

// Label sits directly above its content on the same left edge. The first pass
// hung labels in a left margin column, which split every block into two
// horizontal fixations for no gain.
function Block({ label, children }) {
  return (
    <section className="border-t border-rule py-10">
      <h2 className="text-2xs uppercase tracking-label text-accent">{label}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);

  if (!caseStudy) {
    return <Navigate to="/portfolio" replace />;
  }

  const longDate = new Date(caseStudy.date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <PageLayout>
      <Section space="tight" className="pt-8 md:pt-12">
        <Container width="narrow">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-2xs uppercase tracking-label text-ink-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to Portfolio
          </Link>

          <Reveal className="mt-10">
            <div className="text-2xs uppercase tracking-label text-accent">
              {caseStudy.category}
            </div>

            <Display as="h1" size="lg" className="mt-5">
              {caseStudy.title}
            </Display>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-2xs uppercase tracking-label text-ink-muted">
              <span className="text-ink">{caseStudy.client}</span>
              <span aria-hidden="true" className="h-px w-4 bg-rule" />
              <span>{longDate}</span>
              <span aria-hidden="true" className="h-px w-4 bg-rule" />
              <span>{caseStudy.readTime}</span>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section space="flush" className="pt-8">
        <Container width="narrow">
          <Reveal>
            <img
              src={caseStudy.image}
              alt={caseStudy.title}
              width={1000}
              height={560}
              className="aspect-[16/9] w-full rounded-lg border border-rule object-cover"
            />
          </Reveal>
        </Container>
      </Section>

      <Section space="tight" className="pt-12 md:pt-16">
        <Container width="narrow">
          <Block label="The Challenge">
            <p className="text-lg leading-[1.65] text-ink-muted">{caseStudy.challenge}</p>
          </Block>

          <Block label="Our Solution">
            <p className="text-lg leading-[1.65] text-ink-muted">{caseStudy.solution}</p>
          </Block>

          <Block label="The Results">
            <ul>
              {caseStudy.results.map((r) => (
                <li key={r} className="flex gap-4 border-b border-rule py-4 first:border-t">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                  <span className="text-lg leading-[1.6] text-ink">{r}</span>
                </li>
              ))}
            </ul>
          </Block>

          {caseStudy.testimonial && (
            <Block label="Client Testimonial">
              <figure className="border-l-2 border-accent pl-7">
                <blockquote className="font-serif text-2xl italic leading-[1.4] text-ink">
                  “{caseStudy.testimonial.quote}”
                </blockquote>
                <figcaption className="mt-5 text-2xs uppercase tracking-label text-ink-muted">
                  — {caseStudy.testimonial.author}, {caseStudy.client}
                </figcaption>
              </figure>
            </Block>
          )}

          <Block label="Technologies Used">
            <ul className="flex flex-wrap gap-2">
              {caseStudy.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-lg border border-rule bg-paper-raised px-3.5 py-1.5 text-sm text-ink"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Block>
        </Container>
      </Section>

      <Section bordered>
        <Container width="narrow">
          <Reveal>
            <Display as="h2" size="md">
              Want similar results for your business?
            </Display>
            <p className="mt-5 text-lg leading-[1.65] text-ink-muted">
              Let's discuss how we can help you achieve your goals with AI and automation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/#contact" variant="primary" arrow>
                Book a Consult
              </Button>
              <Button to="/portfolio" variant="secondary">
                View More Case Studies
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </PageLayout>
  );
}
