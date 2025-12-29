import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Sparkles, Target } from "lucide-react";
import Header from "./Header";
import Logo from "./logo";

const Section = ({ children, className = "" }) => (
  <section className={`py-14 md:py-20 ${className}`}>{children}</section>
);

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}>{children}</div>
);

const PersonPhoto = ({ label, testId, src }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        data-testid={testId}
        aria-label={label}
        className="h-56 w-56 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="text-xs font-semibold text-indigo-800">Photo</div>
          <div className="mt-0.5 text-[11px] text-indigo-700/80">Add image</div>
        </div>
      </div>
    );
  }

  return (
    <img
      data-testid={testId}
      src={src}
      alt={label}
      loading="lazy"
      onError={() => setHasError(true)}
      className="h-56 w-56 shrink-0 overflow-hidden rounded-2xl border border-slate-200 object-cover"
    />
  );
};

const PersonCard = ({ name, title, bio, photoTestId, photoSrc, href, ctaLabel = "Visit" }) => {
  const linkProps = href
    ? {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : null;

  return (
    <Card
      className={`h-full ${
        href ? "relative transition hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300" : ""
      }`}
    >
      {/* Full-card clickable area */}
      {href && (
        <a
          {...linkProps}
          aria-label={`Open ${name} link in a new tab`}
          className="absolute inset-0 z-10 rounded-2xl"
        />
      )}

      {/*
        When the overlay link is present, make the content ignore pointer events so clicks go to the overlay.
        Then explicitly re-enable pointer events on the CTA button.
      */}
      <div
        className={`flex flex-col gap-5 sm:flex-row sm:items-start ${href ? "relative z-0 pointer-events-none" : ""}`}
      >
        <PersonPhoto label={`${name} photo`} testId={photoTestId} src={photoSrc} />

        <div className="flex-1">
          <div className="text-lg font-semibold text-slate-900">{name}</div>
          <div className="mt-0.5 text-sm font-medium text-indigo-700">{title}</div>
          <p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-600">{bio}</p>

          {href && (
            <a
              {...linkProps}
              className="pointer-events-auto relative z-20 mt-5 inline-flex items-center justify-center rounded-xl bg-zinc-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600"
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header />

      {/* Hero */}
      <Section className="pt-10 md:pt-14 bg-slate-100">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                <Sparkles className="h-3.5 w-3.5 text-indigo-700" /> About EA AI
              </div>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                A practical AI partner for teams that want real outcomes
              </h1>
              <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
                We help founders and operators design, deploy, and improve AI-powered systems—without the hype.
                From strategy and architecture to implementation and enablement, we build solutions you can actually run.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/#contact";
                  }}
                  className="inline-flex items-center justify-center rounded-xl bg-zinc-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600"
                >
                  Book a Consult
                </a>
                <a
                  href="/portfolio"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  View Portfolio
                </a>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                <div className="flex items-center gap-3">
                  <Logo size={36} />
                  <div>
                    <div className="text-sm font-semibold">EA AI</div>
                    <div className="text-xs text-slate-500">AI Consulting • Automation • Enablement</div>
                  </div>
                </div>
                <div className="mt-6 grid gap-3">
                  <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-indigo-700" />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Outcome-first delivery</div>
                      <div className="text-sm text-slate-600">We build measurable improvements—speed, quality, and cost.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <ShieldCheck className="mt-0.5 h-5 w-5 text-indigo-700" />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Security & reliability</div>
                      <div className="text-sm text-slate-600">Pragmatic controls, safe rollouts, and maintainable systems.</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Mission */}
      <Section className="bg-white">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-bold">Our mission</h2>
              <p className="mt-3 text-slate-600">
                Help small and mid-sized businesses adopt AI responsibly and effectively—by pairing strong product thinking
                with modern engineering.
              </p>
            </div>
            <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              <Card>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Target className="h-4 w-4 text-indigo-700" /> What we optimize for
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-indigo-700" /> Faster workflows and reduced manual effort</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-indigo-700" /> Better customer experience and conversion</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-indigo-700" /> Clear ownership, documentation, and training</li>
                </ul>
              </Card>
              <Card>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <ShieldCheck className="h-4 w-4 text-indigo-700" /> How we work
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-indigo-700" /> Short cycles with real deliverables</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-indigo-700" /> Simple, maintainable tech choices</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-indigo-700" /> Knowledge transfer built-in</li>
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section className="bg-slate-100">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Leardership Team</h2>
            <p className="mt-2 text-slate-600">Two operators who care about shipping the right thing—and making it last.</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-1">
            <PersonCard
              name="Edgar Alza"
              title="Founder & CEO"
              photoTestId="photo-edgar"
              photoSrc="/team/Edgar.jpg"
              bio="Edgar is a seasoned entrepreneur and product management leader who founded his first company, Lucky Backpack, at age 21 and has held senior roles at Amazon Web Services, Amazon Operations, and Accenture. 
              
              At Amazon, Edgar led key innovations across AWS customer experience products, notably launching Amazon Connect’s agent applications and scaling them from inception to millions of daily users.
              
              Edgar created EA AI to enable organizations of any background to adopt practical AI solutions that improve customer experiences and operational efficiency."
            />
            <PersonCard
              name="Clarem Gonzalez"
              title="Co-Founder & COO"
              photoTestId="photo-clarem"
              photoSrc="/team/Clarem.jpg"
              bio="Clarem is a creative project manager with over 10 years of experience helping brands bring ideas to life.

She has worked across food, fashion, tech, and lifestyle, guiding campaigns from the first brief through final launch.

Her strength lies in connecting strategy with execution, keeping teams aligned, timelines on track, and brands looking their best."
              href="https://claremglez.com"
              ctaLabel="Visit Site"
            />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-white">
        <Container>
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-blue-50 p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-12 md:items-center">
              <div className="md:col-span-8">
                <h2 className="text-2xl font-bold">Want to see if we’re a fit?</h2>
                <p className="mt-2 text-slate-600">
                  Share your goals and we’ll recommend the fastest path to measurable ROI.
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
                <a
                  href="/#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/#contact";
                  }}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-zinc-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 md:w-auto"
                >
                  Book a Consult
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <Container className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <Logo size={32} />
            <div className="text-sm font-semibold">EA AI</div>
          </div>
          <div className="text-xs text-slate-500">© {new Date().getFullYear()} EA AI. All rights reserved.</div>
        </Container>
      </footer>
    </div>
  );
}
