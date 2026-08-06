import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

const renderWithRouter = (component) => render(<BrowserRouter>{component}</BrowserRouter>);

// These assert behavior and wiring — the text a user reads and where each
// link actually points. The previous suite also asserted the `sticky` class,
// which is presentation: it broke on the redesign without any user-visible
// behavior having changed, so it is gone.
describe('Header', () => {
  it('renders the logo and company name', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('EAA Cap')).toBeInTheDocument();
    expect(screen.getByAltText('EAA Cap Logo')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    renderWithRouter(<Header />);
    for (const label of ['Services', 'Results', 'Portfolio', 'About']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it('points each navigation link at the right destination', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('Services')).toHaveAttribute('href', '/#services');
    expect(screen.getByText('Results')).toHaveAttribute('href', '/#results');
    expect(screen.getByText('Portfolio')).toHaveAttribute('href', '/portfolio');
    expect(screen.getByText('About')).toHaveAttribute('href', '/about');
  });

  // "Contact" was dropped from the nav list itself — the Book a Consult
  // button is the single path to #contact, rather than duplicating it as a
  // plain nav link too.
  it('renders the Book a Consult button as the path to #contact', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('Book a Consult')).toHaveAttribute('href', '/#contact');
    expect(screen.queryByText('Contact')).not.toBeInTheDocument();
  });

  it('home link points to #home', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText('EAA Cap').closest('a')).toHaveAttribute('href', '#home');
  });

  it('exposes an accessible mobile menu toggle', () => {
    renderWithRouter(<Header />);
    const toggle = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveAttribute('aria-controls', 'mobile-menu');
  });

  // The mobile panel is the one piece of header behavior that is pure state
  // rather than CSS, so it is worth driving rather than eyeballing.
  describe('mobile menu', () => {
    it('opens on toggle and exposes the full nav', async () => {
      const user = userEvent.setup();
      const { container } = renderWithRouter(<Header />);

      expect(container.querySelector('#mobile-menu')).not.toBeInTheDocument();

      const toggle = screen.getByRole('button', { name: /toggle navigation menu/i });
      await user.click(toggle);

      const panel = container.querySelector('#mobile-menu');
      expect(panel).toBeInTheDocument();
      expect(toggle).toHaveAttribute('aria-expanded', 'true');

      const menu = within(panel);
      for (const label of ['Services', 'Results', 'Portfolio', 'About']) {
        expect(menu.getByText(label)).toBeInTheDocument();
      }
      expect(menu.getByText('Book a Consult')).toBeInTheDocument();
    });

    it('closes again when a link inside it is chosen', async () => {
      const user = userEvent.setup();
      const { container } = renderWithRouter(<Header />);

      const toggle = screen.getByRole('button', { name: /toggle navigation menu/i });
      await user.click(toggle);

      await user.click(within(container.querySelector('#mobile-menu')).getByText('About'));

      expect(container.querySelector('#mobile-menu')).not.toBeInTheDocument();
      expect(toggle).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
