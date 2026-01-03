import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Clock, Calendar, Tag, Quote } from "lucide-react";
import Header from "./Header";
import Logo from "./logo";
import { caseStudies } from "./caseStudies";

const Section = ({ children, className = "" }) => (
  <section className={`py-14 md:py-20 ${className}`}>{children}</section>
);

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const caseStudy = caseStudies.find(cs => cs.slug === slug);

  // If case study not found, redirect to portfolio
  if (!caseStudy) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header />

      {/* Back Button */}
      <div className="border-b border-slate-200 bg-white">
        <Container className="py-4">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-indigo-700 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </Container>
      </div>

      {/* Hero */}
      <Section className="pt-8 pb-0">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                {caseStudy.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              {caseStudy.title}
            </h1>

            {/* Meta Info */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(caseStudy.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {caseStudy.readTime}
              </span>
              <span>•</span>
              <span className="font-semibold text-slate-900">{caseStudy.client}</span>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {caseStudy.tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Featured Image */}
      <Section className="pt-8">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg"
          >
            <img
              src={caseStudy.image}
              alt={caseStudy.title}
              className="h-96 w-full object-cover"
            />
          </motion.div>
        </Container>
      </Section>

      {/* Content */}
      <Section className="pt-8">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-slate max-w-none"
          >
            {/* Challenge */}
            <div className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">The Challenge</h2>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-slate-700 leading-relaxed">{caseStudy.challenge}</p>
              </div>
            </div>

            {/* Solution */}
            <div className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Our Solution</h2>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-slate-700 leading-relaxed">{caseStudy.solution}</p>
              </div>
            </div>

            {/* Results */}
            <div className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">The Results</h2>
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-blue-50 p-6">
                <ul className="space-y-3">
                  {caseStudy.results.map((result, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-indigo-700" />
                      <span className="text-slate-900 font-medium">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Testimonial */}
            {caseStudy.testimonial && (
              <div className="mb-10">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Client Testimonial</h2>
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <Quote className="mb-4 h-8 w-8 text-indigo-700" />
                  <blockquote className="text-lg italic text-slate-700 leading-relaxed">
                    "{caseStudy.testimonial.quote}"
                  </blockquote>
                  <p className="mt-4 text-sm font-semibold text-slate-900">
                    — {caseStudy.testimonial.author}, {caseStudy.client}
                  </p>
                </div>
              </div>
            )}

            {/* Technologies */}
            <div className="mb-10">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {caseStudy.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-slate-100">
        <Container>
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-blue-50 p-8 md:p-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold">Want similar results for your business?</h2>
              <p className="mt-2 text-slate-600">
                Let's discuss how we can help you achieve your goals with AI and automation.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
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
                <Link
                  to="/portfolio"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  View More Case Studies
                </Link>
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
