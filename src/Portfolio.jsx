import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";
import Header from "./Header";
import Logo from "./logo";
import { caseStudies } from "./caseStudies";

const Section = ({ children, className = "" }) => (
  <section className={`py-14 md:py-20 ${className}`}>{children}</section>
);

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const CaseStudyCard = ({ caseStudy, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Link
      to={`/portfolio/${caseStudy.slug}`}
      className="group block h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:border-slate-300"
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50">
        <img
          src={caseStudy.image}
          alt={caseStudy.title}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
            {caseStudy.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {caseStudy.readTime}
          </span>
          <span>•</span>
          <span>{new Date(caseStudy.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
        </div>

        <h3 className="mb-2 text-xl font-bold text-slate-900 group-hover:text-indigo-700 transition">
          {caseStudy.title}
        </h3>

        <p className="mb-4 text-sm text-slate-600 line-clamp-3">
          {caseStudy.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {caseStudy.tags.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm font-semibold text-indigo-700">
          Read case study
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  </motion.div>
);

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header />

      {/* Hero */}
      <Section className="pt-10 md:pt-14 bg-slate-100">
        <Container>
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Case Studies & Success Stories
            </h1>
            <p className="mt-4 text-base text-slate-600 md:text-lg">
              Real results from real clients. See how we've helped businesses transform their operations with AI and automation.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Case Studies Grid */}
      <Section className="bg-white">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((caseStudy, index) => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} index={index} />
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-slate-100">
        <Container>
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-blue-50 p-8 md:p-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold">Ready to write your success story?</h2>
              <p className="mt-2 text-slate-600">
                Let's discuss how we can help you achieve similar results.
              </p>
              <a
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/#contact";
                }}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600"
              >
                Book a Consult <ArrowRight className="h-4 w-4" />
              </a>
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