import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Header', () => {
  it('renders the logo and company name', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('EAA Cap')).toBeInTheDocument();
    expect(screen.getByAltText('EAA Cap Logo')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Results')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('has correct href attributes for navigation links', () => {
    renderWithRouter(<Header />);
    const servicesLink = screen.getByText('Services');
    const resultsLink = screen.getByText('Results');
    const contactLinks = screen.getAllByText('Contact');
    const portfolioLink = screen.getByText('Portfolio');
    const aboutLink = screen.getByText('About');

    expect(servicesLink).toHaveAttribute('href', '/#services');
    expect(resultsLink).toHaveAttribute('href', '/#results');
    expect(contactLinks[0]).toHaveAttribute('href', '/#contact');
    // React Router <Link> renders to an <a>
    expect(portfolioLink).toHaveAttribute('href', '/portfolio');
    expect(aboutLink).toHaveAttribute('href', '/about');
  });

  it('renders the Book a Consult button', () => {
    renderWithRouter(<Header />);
    const button = screen.getByText('Book a Consult');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', '/#contact');
  });

  it('has sticky positioning class', () => {
    const { container } = renderWithRouter(<Header />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('sticky');
  });

  it('home link points to #home', () => {
    renderWithRouter(<Header />);
    const homeLink = screen.getByText('EAA Cap').closest('a');
    expect(homeLink).toHaveAttribute('href', '#home');
  });
});
