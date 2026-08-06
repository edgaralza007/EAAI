import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CaseStudyDetail from './CaseStudyDetail';
import Portfolio from './Portfolio';
import { caseStudies } from './caseStudies';

const study = caseStudies[0];

// MemoryRouter with the real route table so the unknown-slug <Navigate>
// fallback can actually be observed landing on /portfolio.
const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<CaseStudyDetail />} />
      </Routes>
    </MemoryRouter>
  );

describe('CaseStudyDetail', () => {
  it('renders the case study matching the slug', () => {
    renderAt(`/portfolio/${study.slug}`);
    expect(screen.getByText(study.title)).toBeInTheDocument();
    expect(screen.getAllByText(study.client).length).toBeGreaterThan(0);
  });

  it('renders challenge, solution, results and technologies', () => {
    renderAt(`/portfolio/${study.slug}`);
    expect(screen.getByText('The Challenge')).toBeInTheDocument();
    expect(screen.getByText(study.challenge)).toBeInTheDocument();

    expect(screen.getByText('Our Solution')).toBeInTheDocument();
    expect(screen.getByText(study.solution)).toBeInTheDocument();

    expect(screen.getByText('The Results')).toBeInTheDocument();
    for (const result of study.results) {
      expect(screen.getByText(result)).toBeInTheDocument();
    }

    expect(screen.getByText('Technologies Used')).toBeInTheDocument();
    for (const tech of study.technologies) {
      expect(screen.getByText(tech)).toBeInTheDocument();
    }
  });

  it('renders the testimonial when one exists', () => {
    renderAt(`/portfolio/${study.slug}`);
    expect(screen.getByText('Client Testimonial')).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(study.testimonial.quote.slice(0, 40), 'i'))
    ).toBeInTheDocument();
  });

  it('offers a way back to the portfolio', () => {
    renderAt(`/portfolio/${study.slug}`);
    expect(screen.getByText('Back to Portfolio').closest('a')).toHaveAttribute(
      'href',
      '/portfolio'
    );
  });

  it('redirects an unknown slug to the portfolio index', () => {
    renderAt('/portfolio/no-such-case-study');
    // The portfolio index rendered instead of the detail page.
    expect(screen.getByText('Case Studies & Success Stories')).toBeInTheDocument();
    expect(screen.queryByText('The Challenge')).not.toBeInTheDocument();
  });
});
