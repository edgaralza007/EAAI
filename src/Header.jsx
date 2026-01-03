import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./logo";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen((open) => !open);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white">
      <div className="px-4 sm:px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + Home Link */}
          <a href="#home" className="flex items-center gap-2" onClick={closeMobileMenu}>
            <Logo size={32} />
            <span className="text-sm font-bold tracking-wide">EAA Cap</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex font-bold">
            <a
              href="/#services"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/#services";
              }}
              className="text-sm text-slate-700 hover:text-slate-900"
            >
              Services
            </a>
            <a
              href="/#results"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/#results";
              }}
              className="text-sm text-slate-700 hover:text-slate-900"
            >
              Results
            </a>
            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/#contact";
              }}
              className="text-sm text-slate-700 hover:text-slate-900"
            >
              Contact
            </a>
            <Link
              to="/about"
              className="text-sm text-slate-700 hover:text-slate-900"
            >
              About
            </Link>
            <Link
              to="/portfolio"
              className="text-sm text-slate-700 hover:text-slate-900"
            >
              Portfolio
            </Link>
          </nav>

          {/* Desktop button */}
          <a
            href="/#contact"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/#contact";
            }}
            className="hidden rounded-xl bg-zinc-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 md:inline-block"
          >
            Book a Consult
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={toggleMobileMenu}
          >
            {/* Icon: three bars when closed, X when open */}
            <span className="sr-only">Open main menu</span>
            <svg
              className={`h-6 w-6 ${mobileOpen ? "hidden" : "block"}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            </svg>
            <svg
              className={`h-6 w-6 ${mobileOpen ? "block" : "hidden"}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2 font-bold">
            <a
              href="/#services"
              onClick={(e) => {
                e.preventDefault();
                closeMobileMenu();
                window.location.href = "/#services";
              }}
              className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            >
              Services
            </a>
            <a
              href="/#results"
              onClick={(e) => {
                e.preventDefault();
                closeMobileMenu();
                window.location.href = "/#results";
              }}
              className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            >
              Results
            </a>
            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                closeMobileMenu();
                window.location.href = "/#contact";
              }}
              className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            >
              Contact
            </a>
            <Link
              to="/about"
              className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link
              to="/portfolio"
              className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              onClick={closeMobileMenu}
            >
              Portfolio
            </Link>
            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                closeMobileMenu();
                window.location.href = "/#contact";
              }}
              className="mt-2 block rounded-xl bg-zinc-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Book a Consult
            </a>
          </div>
        </div>
      )}
    </header>
  )

}
