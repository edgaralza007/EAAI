import React from 'react'
import Header from './Header'
import Footer from './Footer'

// Flat paper. The old wrapper used bg-gradient-to-b from-slate-50 to-white on
// every page — a gradient doing no work except signalling "template".
export default function PageLayout({ children, className = '' }) {
  return (
    <div className={`flex min-h-screen flex-col bg-paper text-ink ${className}`}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
