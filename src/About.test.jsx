import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from './About';

const renderPage = () =>
  render(
    <BrowserRouter>
      <About />
    </BrowserRouter>
  );

describe('About', () => {
  it('renders the page heading', () => {
    renderPage();
    expect(
      screen.getByText(/A practical AI partner for real outcomes/i)
    ).toBeInTheDocument();
  });

  it('renders the mission', () => {
    renderPage();
    expect(screen.getByText('Our mission')).toBeInTheDocument();
    expect(
      screen.getByText(/To make technology work for businesses, not the other way around/i)
    ).toBeInTheDocument();
  });

  it('renders both principle groups', () => {
    renderPage();
    expect(screen.getByText('What we optimize for')).toBeInTheDocument();
    expect(screen.getByText('How we work')).toBeInTheDocument();
    expect(
      screen.getByText('Faster workflows and reduced manual effort')
    ).toBeInTheDocument();
    expect(screen.getByText('Knowledge transfer built-in')).toBeInTheDocument();
  });

  it('renders both team members with their photos', () => {
    const { container } = renderPage();
    expect(screen.getByText('Leadership Team')).toBeInTheDocument();
    expect(screen.getByText('Edgar Alza')).toBeInTheDocument();
    expect(screen.getByText('Clarem Gonzalez')).toBeInTheDocument();

    expect(container.querySelector('[data-testid="photo-edgar"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="photo-clarem"]')).toBeInTheDocument();
  });

  // The old PersonCard stretched an invisible anchor over the whole card and
  // disabled pointer events on the content. The link is now explicit, so it
  // should be reachable as a real link with a real accessible name.
  it("exposes Clarem's site as an ordinary external link", () => {
    renderPage();
    const link = screen.getByText('Visit Site').closest('a');
    expect(link).toHaveAttribute('href', 'https://claremglez.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('renders the closing call to action', () => {
    renderPage();
    expect(screen.getByText(/Want to see if we.?re a fit\?/i)).toBeInTheDocument();
    expect(screen.getAllByText('Book a Consult').length).toBeGreaterThan(0);
  });

  it('includes the shared chrome', () => {
    renderPage();
    expect(screen.getAllByText('Services').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Portfolio').length).toBeGreaterThan(0);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
