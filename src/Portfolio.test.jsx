import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Portfolio from './Portfolio';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Portfolio', () => {
  it('renders the Portfolio page heading', () => {
    renderWithRouter(<Portfolio />);
    expect(screen.getByText('Our Portfolio')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    renderWithRouter(<Portfolio />);
    expect(
      screen.getByText(/Here.?s a look at some of our recent projects and collaborations/i)
    ).toBeInTheDocument();
  });

  it('includes the Header component', () => {
    renderWithRouter(<Portfolio />);
    expect(screen.getByText('EA AI')).toBeInTheDocument();
  });

  it('has correct layout classes', () => {
    const { container } = renderWithRouter(<Portfolio />);
    const mainDiv = container.querySelector('.min-h-screen');
    expect(mainDiv).toBeInTheDocument();
    expect(mainDiv).toHaveClass('bg-white', 'text-slate-900');
  });

  it('renders navigation links from Header', () => {
    renderWithRouter(<Portfolio />);
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Results')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
