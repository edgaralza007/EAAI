import React, { useEffect } from "react";
import Logo from "./logo";
import Header from "./Header";
import { motion } from "framer-motion";
import {
  BarChart3,
  Briefcase,
  Bot,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Mail,
  Laptop,
  MapPin,
  Dock,
} from "lucide-react";

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>{children}</section>
);

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
    {children}
  </span>
);

const Feature = ({ imageSrc, imageAlt, title, desc }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
    <div className="-mx-6 -mt-6 mb-4">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="h-32 w-full object-cover"
      />
    </div>
    <h3 className="mb-1 text-lg font-semibold text-slate-900">{title}</h3>
    <p className="text-sm text-slate-600">{desc}</p>
    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-indigo-200 to-blue-200 opacity-0 transition group-hover:opacity-80" />
  </div>
);

const Step = ({ number, title, desc }) => (
  <div className="relative rounded-2xl border border-slate-200 bg-white p-6">
    <div className="mb-3 flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">{number}</div>
      <h4 className="text-base font-semibold text-slate-900">{title}</h4>
    </div>
    <p className="text-sm text-slate-600">{desc}</p>
  </div>
);

export default function EAACapitalLanding() {
  // Handle hash navigation when coming from other pages
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Wait for page to fully render before scrolling
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen scroll-smooth bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header />

      {/* Hero */}
      <Section id="home" className="pb-10 pt-12 md:pt-20 bg-slate-100">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Confident AI solutions
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                  focused on real outcomes
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base text-slate-600 md:text-lg">
                EAA Cap helps companies make confident decisions about how to incorporate AI into their operations. A simple, affordable, and reliable partner focused on real outcomes.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  Book a Free Discovery Call <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#results"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  View Results
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="relative isolate rounded-3xl border border-slate-200 bg-white p-4 shadow-xl">
                <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-indigo-200/60 blur-xl" />
                <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-blue-200/60 blur-xl" />
                <div className="relative rounded-2xl bg-slate-50 p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold"><Briefcase className="h-4 w-4" /> Consulting</div>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>Product & AI Strategy</li>
                        <li>Project Management</li>
                        <li>Creative Execution</li>
                        <li>Process Optimization</li>
                      </ul>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold"><BarChart3 className="h-4 w-4" /> Implementation</div>
                      <ul className="space-y-1 text-sm text-slate-600">
                        <li>Public Websites</li>
                        <li>Contact Center & CRM</li>
                        <li>Chatbots</li>
                        <li>AI agents</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section id="services" className="bg-white">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">What We Do</h2>
            <p className="mt-2 text-slate-600">
             Comprehensive process improvement, change management, and technology solutions tailored for emerging businesses. We enable business transformation and deliver websites, contact center & CRM solutions, and AI agents that drive growth and cost savings.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Feature
              imageSrc="/services/process.jpg"
              imageAlt="Process transformation illustration"
              title=" Process Transformation"
              desc="Transform and optimize your processes with the right tools and training for your business"
            />
            <Feature
              imageSrc="/services/website.jpg"
              imageAlt="Professional websites illustration"
              title=" Professional Websites"
              desc="Modern, responsive websites that convert visitors into customers. Built with the latest technologies for optimal performance and SEO."
            />
            <Feature
              imageSrc="/services/saas.jpg"
              imageAlt="CRM and contact center illustration"
              title="CRM & Contact Center"
              desc="Streamline your customer relationships with powerful contact center solutions and CRM software designed for growing businesses."
            />
            <Feature
              imageSrc="/services/agents.jpg"
              imageAlt="Chatbots and AI agents illustration"
              title="Chatbots & AI Agents"
              desc="Automate customer service and sales processes with intelligent chatbots and AI agents that work 24/7 to grow your business."
            />
          </div>
        </Container>
      </Section>

      {/* Approach 
      <Section id="approach" className="bg-slate-100">
        <Container>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">A Practical, Outcome-First Approach</h2>
            <p className="mt-2 text-slate-600">We ship artifacts you can use tomorrow—not slideware.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Step number="1" title="Discover" desc="Stakeholder interviews, baseline metrics, and goal alignment." />
            <Step number="2" title="Design" desc="Solution design across product, GTM, and finance." />
            <Step number="3" title="Validate" desc="Model, prototype, and iterate with real constraints." />
            <Step number="4" title="Enable" desc="Roadmaps, runbooks, and production ready solutions" />
          </div>
        </Container>
      </Section> */}

      {/* Results */}
      <Section id="results" className="bg-slate-100">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Results that matter</h2>
              <ul className="mt-6 space-y-4 text-slate-700">
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-indigo-600" /> Deploy a customer experience desktop in minutes.</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-indigo-600" /> 20–40% productivity gains from a unified workflow tool and user interface.</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-indigo-600" /> Lower IT costs by 25% while converting new customers.</li>
              </ul>
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
                “EAA Cap helped us grow our ABA practice from 20 to 150 annual patients. While I focus on hiring and training therapists, developing new programs, and building relationships, EAA Cap provides the tools we need to attract new patients and automate time-consuming tasks—giving me and my team more time to do what we love most.”
                <div className="mt-2 text-xs text-slate-500">— Alex, CEO of Blossoming Mind Therapies</div>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-blue-50 p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="text-3xl font-extrabold">$15M</div>
                  <div className="mt-1 text-sm text-slate-600">Savings reported by clients</div>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="text-3xl font-extrabold">30%</div>
                  <div className="mt-1 text-sm text-slate-600">Avg. productivity lift</div>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="text-3xl font-extrabold">4 wks</div>
                  <div className="mt-1 text-sm text-slate-600">To production-ready solutions</div>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="text-3xl font-extrabold">2 days</div>
                  <div className="mt-1 text-sm text-slate-600">Typical training required</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section id="contact" className="bg-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Let’s talk about your roadmap</h2>
            <p className="mt-2 text-slate-600">Tell us a bit about your goals and we’ll reply within 1 business day.</p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-8 md:grid-cols-5">
            <form action="https://formspree.io/f/xqadveqj" method="POST" className="md:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-slate-700">Full Name</label>
                  <input type="text" name = "FullName" placeholder="Enter your name" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700">Email</label>
                  <input type="email" name="email" placeholder="sample@company.com" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-slate-700">Company</label>
                  <input type="text" name="company" placeholder="Your company" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-slate-700">What do you need help with?</label>
                  <textarea rows={4} name="message" placeholder="Let us know how we can help you" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring" />
                </div>
              </div>
              <button type="submit" className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-600">
                Send Inquiry <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="md:col-span-2 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><PhoneCall className="h-4 w-4" /> Quick chat</div>
                <p className="text-sm text-slate-600">Prefer to talk? Book a 15‑minute intro call and get a fast read on fit.</p>
                <a href="https://calendly.com/edgar-eaacap/30min" target="_blank" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:underline">Schedule time <ArrowRight className="h-4 w-4" /></a>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><Mail className="h-4 w-4" /> Email</div>
                <p className="text-sm text-slate-600">Edgar Alza: edgar@eaacap.com</p>
                <p className="text-sm text-slate-600">Clarem Gonzalez: clarem@eaacap.com</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><MapPin className="h-4 w-4" /> Offices</div>
                <p className="text-sm text-slate-600">Fort Lauderdale, FL</p>
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
            <div className="text-sm font-semibold">EAA Cap</div>
          </div>
          <div className="text-xs text-slate-500">© {new Date().getFullYear()} EAA Cap. All rights reserved.</div>
        </Container>
      </footer>
    </div>
  );
}
