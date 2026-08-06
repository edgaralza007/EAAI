import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Portfolio from './Portfolio';
import { caseStudies } from './caseStudies';

const renderPage = () =>
  render(
    <BrowserRouter>
      <Portfolio />
    </BrowserRouter>
  );

describe('Portfolio', () => {
  it('renders the page heading and intro', () => {
    renderPage();
    expect(screen.getByText('Case Studies & Success Stories')).toBeInTheDocument();
    expect(
      screen.getByText(/We partner with growing businesses to automate operations/i)
    ).toBeInTheDocument();
  });

  it('renders a card for every case study', () => {
    renderPage();
    for (const cs of caseStudies) {
      expect(screen.getByText(cs.title)).toBeInTheDocument();
    }
  });

  it('links each case study to its detail route', () => {
    renderPage();
    for (const cs of caseStudies) {
      const link = screen.getByText(cs.title).closest('a');
      expect(link).toHaveAttribute('href', `/portfolio/${cs.slug}`);
    }
  });

  // "Book a Consult" appears in the header as well as the closing CTA, so
  // assert that every one of them points at the contact section.
  it('renders the closing call to action', () => {
    renderPage();
    expect(screen.getByText('Ready to write your success story?')).toBeInTheDocument();

    const ctas = screen.getAllByText('Book a Consult');
    expect(ctas.length).toBeGreaterThan(1);
    ctas.forEach((cta) => expect(cta).toHaveAttribute('href', '/#contact'));
  });

  it('includes the shared chrome', () => {
    renderPage();
    expect(screen.getAllByText('EAA Cap').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Services').length).toBeGreaterThan(0);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
