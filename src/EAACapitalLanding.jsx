import React from "react";
import PageLayout from "./components/PageLayout";
import Section from "./components/Section";
import Container from "./components/Container";
import Eyebrow from "./components/Eyebrow";
import Display from "./components/Display";
import SectionHeader from "./components/SectionHeader";
import Button from "./components/Button";
import Stat from "./components/Stat";
import Reveal from "./components/Reveal";

const tracks = [
  {
    label: "Consulting",
    items: [
      "Product & AI Strategy",
      "Project Management",
      "Creative Execution",
      "Process Optimization",
    ],
  },
  {
    label: "Implementation",
    items: [
      "Public Websites",
      "Contact Center & CRM",
      "Bespoke Applications",
      "AI Agents",
    ],
  },
];

const services = [
  {
    n: "SOLUTION",
    title: "Process Transformation",
    desc: "Transform and optimize your processes with the right tools and training for your business.",
    image: "/services/process.webp",
    alt: "Process transformation illustration",
  },
  {
    n: "SOLUTION",
    title: "Websites",
    desc: "Modern, responsive websites that convert visitors into customers. Built with the latest technologies for optimal performance and SEO.",
    image: "/services/website.webp",
    alt: "Professional websites illustration",
  },
  {
    n: "SOLUTION",
    title: "CRM & Contact Center",
    desc: "Streamline your customer relationships with powerful contact center solutions and CRM software designed for growing businesses.",
    image: "/services/saas.webp",
    alt: "CRM and contact center illustration",
  },
  {
    n: "SOLUTION",
    title: "AI Agents",
    desc: "Automate front and back office operations with customized AI agents that work 24/7 for your business.",
    image: "/services/agents.webp",
    alt: "AI agents illustration",
  },
];

const steps = [
  { n: "01", title: "Discover", desc: "Stakeholder interviews, baseline metrics, and goal alignment." },
  { n: "02", title: "Design", desc: "Solution design across product, GTM, and finance." },
  { n: "03", title: "Validate", desc: "Model, prototype, and iterate with real constraints." },
  { n: "04", title: "Enable", desc: "Roadmaps, runbooks, and production ready solutions" },
];

const outcomes = [
  "Deploy a customer experience desktop in minutes.",
  "20–40% productivity gains from a unified workflow tool and user interface.",
  "Lower IT costs by 25% while converting new customers.",
];

const stats = [
  { value: "$5M", label: "Savings reported by clients" },
  { value: "30%", label: "Avg. productivity lift" },
  { value: "4 wks", label: "Avg. time to production" },
  { value: "3 days", label: "Typical training required" },
];

const field =
  "w-full border-0 border-b border-rule bg-transparent px-0 py-3 text-base text-ink placeholder:text-ink-muted/50 focus:border-accent focus:outline-none";
const fieldLabel = "text-2xs uppercase tracking-label text-ink-muted";

export default function EAACapitalLanding() {
  return (
    <PageLayout>
      {/* Hero ------------------------------------------------------------ */}
      <Section
        id="home"
        tone="ink"
        space="tight"
        className="relative overflow-hidden pt-14 md:pt-20"
      >
        {/* Soft accent glow, upper right — depth without a literal graphic. */}
        <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0" />

        <Container>
          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
            {/* One column, one starting edge: eyebrow, headline, paragraph,
                buttons all stack on the same left rule. */}
            <Reveal className="lg:col-span-7">
              <Eyebrow index="01" inverted>
                AI for small business
              </Eyebrow>

              <Display as="h1" size="xl" className="mt-6 max-w-xl">
                <span className="block">The right technology,</span>
                <span className="block italic">made simple.</span>
              </Display>

              <p className="mt-6 max-w-xl text-lg leading-[1.65] text-paper/70">
                EAA Cap helps businesses confidently adopt tools that make work easier, not
                harder. We guide the process, handle the details, and deliver solutions built
                for real teams and real goals.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button to="#contact" variant="primary" arrow>
                  Start a Conversation
                </Button>
                <Button to="#results" variant="inverted">
                  See How We Help
                </Button>
              </div>
            </Reveal>

            {/* Enclosed as one bordered panel so it reads as a single object
                beside the copy, rather than as a second column of text
                competing for the reader's starting point. Paper-tinted
                outline instead of a solid card — a solid paper-raised panel
                here would read as a light box dropped onto the dark hero. */}
            <Reveal delay={0.08} className="lg:col-span-5">
              <div className="rounded-lg border border-paper/15 bg-paper/5 p-7 sm:p-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  {tracks.map((track) => (
                    <div key={track.label}>
                      <div className="text-2xs font-semibold uppercase tracking-label text-accent">
                        {track.label}
                      </div>
                      <ul className="mt-4">
                        {track.items.map((item) => (
                          <li
                            key={item}
                            className="border-t border-paper/15 py-2.5 text-sm text-paper/90"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Stats ----------------------------------------------------------- */}
      <Section space="flush" className="mt-6 md:mt-12">
        <Container>
          {/* gap-px over a rule-colored background draws exact hairlines
              between cells at any column count. overflow-hidden clips the
              cells to the strip's own rounded corners. */}
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border-y border-rule bg-rule md:grid-cols-4">
            {stats.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} className="bg-paper px-6 py-9" />
            ))}
          </div>
        </Container>
      </Section>

      {/* Services -------------------------------------------------------- */}
      <Section id="services">
        <Container>
          <Reveal>
            <SectionHeader
              index="02"
              eyebrow="What we do"
              title="What We Do"
              intro="Comprehensive process improvement, change management, and technology solutions tailored for emerging businesses. We enable business transformation and deliver websites, contact center & CRM solutions, and AI agents that drive growth and cost savings."
            />
          </Reveal>

          {/* Three-up card grid with a shorter image band and a smaller
              title — sized so four cards read as a set at a glance rather
              than as four separate features to study individually. */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <article className="flex h-full flex-col overflow-hidden rounded-lg border border-rule bg-paper-raised">
                  <img
                    src={s.image}
                    alt={s.alt}
                    width={800}
                    height={450}
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="tabular text-2xs uppercase tracking-label text-accent">
                      {s.n}
                    </div>
                    <h3 className="mt-2.5 font-serif text-xl leading-snug text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-[1.6] text-ink-muted">{s.desc}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Approach -------------------------------------------------------- */}
      <Section bordered>
        <Container>
          <Reveal>
            <SectionHeader
              index="03"
              eyebrow="How we work"
              title="A Practical, Outcome-First Approach"
              intro="We start by understanding your business and design every solution by working backwards from your goals and objectives."
            />
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border-y border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.05} className="bg-paper">
                <div className="h-full px-6 py-9">
                  <div className="tabular font-serif text-2xl text-accent">{step.n}</div>
                  <h4 className="mt-5 font-serif text-xl text-ink">{step.title}</h4>
                  <p className="mt-2.5 text-base leading-[1.65] text-ink-muted">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Results --------------------------------------------------------- */}
      <Section id="results" bordered>
        <Container>
          <Reveal>
            <SectionHeader index="04" eyebrow="Results" title="Results that matter" />
          </Reveal>

          {/* Stacked directly under the heading on the same left edge. */}
          <Reveal>
            <ul className="mt-12 max-w-3xl">
              {outcomes.map((o) => (
                <li key={o} className="flex gap-5 border-b border-rule py-5 first:border-t">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                  <span className="text-lg leading-[1.6] text-ink">{o}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <figure className="mt-16 max-w-3xl border-l-2 border-accent pl-8">
              <blockquote className="font-serif text-2xl italic leading-[1.4] text-ink sm:text-[1.75rem]">
                “EAA Cap helped us grow our ABA practice from 20 to 150 annual patients. While I
                focus on hiring and training therapists, developing new programs, and building
                relationships, EAA Cap provides the tools we need to attract new patients and
                automate time-consuming tasks—giving me and my team more time to do what we love
                most.”
              </blockquote>
              <figcaption className="mt-6 text-2xs uppercase tracking-label text-ink-muted">
                — Alex, CEO of Blossoming Mind Therapies
              </figcaption>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* Contact --------------------------------------------------------- */}
      <Section id="contact" bordered>
        <Container>
          <Reveal>
            <SectionHeader
              index="05"
              eyebrow="Contact"
              title="Let’s talk about your roadmap"
              intro="Tell us a bit about your goals and we’ll reply within 1 business day."
            />
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <form action="https://formspree.io/f/xqadveqj" method="POST">
                <div className="grid gap-7 sm:grid-cols-2">
                  <div>
                    <label className={fieldLabel} htmlFor="FullName">
                      Full Name
                    </label>
                    <input
                      id="FullName"
                      type="text"
                      name="FullName"
                      placeholder="Enter your name"
                      className={field}
                    />
                  </div>
                  <div>
                    <label className={fieldLabel} htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="sample@company.com"
                      className={field}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={fieldLabel} htmlFor="company">
                      Company
                    </label>
                    <input
                      id="company"
                      type="text"
                      name="company"
                      placeholder="Your company"
                      className={field}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={fieldLabel} htmlFor="message">
                      What do you need help with?
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      name="message"
                      placeholder="Let us know how we can help you"
                      className={`${field} resize-none`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-9 inline-flex items-center gap-2.5 rounded-lg bg-accent px-6 py-3.5 text-xs uppercase tracking-label text-white transition-colors hover:bg-accent-deep"
                >
                  Send Inquiry
                </button>
              </form>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
              <div className="rounded-lg border border-rule bg-paper-raised p-7">
                <dl>
                  <div className="pb-6">
                    <dt className="text-2xs uppercase tracking-label text-accent">Quick chat</dt>
                    <dd className="mt-3 text-base leading-[1.65] text-ink-muted">
                      Prefer to talk? Book a 15‑minute intro call and get a fast read on fit.
                      <div className="mt-4">
                        <Button
                          to="https://calendly.com/edgar-eaacap/30min"
                          variant="link"
                          arrow
                        >
                          Schedule time
                        </Button>
                      </div>
                    </dd>
                  </div>

                  <div className="border-t border-rule py-6">
                    <dt className="text-2xs uppercase tracking-label text-accent">Email</dt>
                    <dd className="mt-3 space-y-1.5 text-base text-ink-muted">
                      <div>Edgar Alza: edgar@eaacap.com</div>
                      <div>Clarem Gonzalez: clarem@eaacap.com</div>
                    </dd>
                  </div>

                  <div className="border-t border-rule pt-6">
                    <dt className="text-2xs uppercase tracking-label text-accent">Offices</dt>
                    <dd className="mt-3 text-base text-ink-muted">Fort Lauderdale, FL</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </PageLayout>
  );
}
