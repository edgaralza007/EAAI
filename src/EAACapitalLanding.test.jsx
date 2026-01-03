import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EAACapitalLanding from './EAACapitalLanding';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('EAACapitalLanding', () => {
  describe('Hero Section', () => {
    it('renders the main heading', () => {
      renderWithRouter(<EAACapitalLanding />);
      expect(screen.getByText('Confident AI solutions')).toBeInTheDocument();
      expect(screen.getByText('focused on real outcomes')).toBeInTheDocument();
    });

    it('renders the hero description', () => {
      renderWithRouter(<EAACapitalLanding />);
      expect(
        screen.getByText(/EAA Cap helps companies make confident decisions/i)
      ).toBeInTheDocument();
    });

    it('renders CTA buttons in hero', () => {
      renderWithRouter(<EAACapitalLanding />);
      expect(screen.getByText('Book a Free Discovery Call')).toBeInTheDocument();
      expect(screen.getByText('View Results')).toBeInTheDocument();
    });

    it('displays consulting and implementation tracks', () => {
      renderWithRouter(<EAACapitalLanding />);
      expect(screen.getByText('Consulting')).toBeInTheDocument();
      expect(screen.getByText('Implementation')).toBeInTheDocument();
      expect(screen.getByText('Product & AI Strategy')).toBeInTheDocument();
      expect(screen.getByText('Public Websites')).toBeInTheDocument();
    });
  });

  describe('Services Section', () => {
    it('renders the services heading', () => {
      renderWithRouter(<EAACapitalLanding />);
      expect(screen.getByText('What We Do')).toBeInTheDocument();
    });

    it('displays all four service features', () => {
      renderWithRouter(<EAACapitalLanding />);
      expect(screen.getByText('Process Transformation')).toBeInTheDocument();
      expect(screen.getByText('Professional Websites')).toBeInTheDocument();
      expect(screen.getByText('CRM & Contact Center')).toBeInTheDocument();
      expect(screen.getByText('Chatbots & AI Agents')).toBeInTheDocument();
    });

    it('renders service descriptions', () => {
      renderWithRouter(<EAACapitalLanding />);
      expect(
        screen.getByText(/Modern, responsive websites that convert visitors into customers/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Automate customer service and sales processes/i)
      ).toBeInTheDocument();
    });
  });

  describe('Results Section', () => {
    it('renders the results heading', () => {
      renderWithRouter(<EAACapitalLanding />);
      expect(screen.getByText('Results that matter')).toBeInTheDocument();
    });

    it('displays key metrics', () => {
      renderWithRouter(<EAACapitalLanding />);
      expect(screen.getByText('$15M')).toBeInTheDocument();
      expect(screen.getByText('30%')).toBeInTheDocument();
      expect(screen.getByText('4 wks')).toBeInTheDocument();
      expect(screen.getByText('2 days')).toBeInTheDocument();
    });

    it('displays metric descriptions', () => {
      renderWithRouter(<EAACapitalLanding />);
      expect(screen.getByText('Savings reported by clients')).toBeInTheDocument();
      expect(screen.getByText('Avg. productivity lift')).toBeInTheDocument();
      expect(screen.getByText('To production-ready solutions')).toBeInTheDocument();
      expect(screen.getByText('Typical training required')).toBeInTheDocument();
    });

    it('renders client testimonial', () => {
      renderWithRouter(<EAACapitalLanding />);
      expect(
        screen.getByText(/EAA Cap helped us grow our ABA practice/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/— Alex, CEO of Blossoming Mind Therapies/i)).toBeInTheDocument();
    });

    it('displays efficiency gains bullet points', () => {
      renderWithRouter(<EAACapitalLanding />);
      expect(screen.getByText(/Deploy a customer experience desktop in minutes/i)).toBeInTheDocument();
      expect(screen.getByText(/20–40% productivity gains/i)).toBeInTheDocument();
      expect(screen.getByText(/Lower IT costs by 25%/i)).toBeInTheDocument();
    });
  });

  describe('Contact Section', () => {
    it('renders the contact heading', () => {
      renderWithRouter(<EAACapitalLanding />);
      expect(screen.getByText(/Let.?s talk about your roadmap/i)).toBeInTheDocument();
    });

    it('renders contact form with all fields', () => {
      renderWithRouter(<EAACapitalLanding />);
      expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('sample@company.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Your company')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Let us know how we can help you')).toBeInTheDocument();
    });

    it('has correct form action URL', () => {
      const { container } = renderWithRouter(<EAACapitalLanding />);
      const form = container.querySelector('form');
      expect(form).toHaveAttribute('action', 'https://formspree.io/f/xqadveqj');
      expect(form).toHaveAttribute('method', 'POST');
    });

    it('renders submit button', () => {
      renderWithRouter(<EAACapitalLanding />);
      expect(screen.getByText('Send Inquiry')).toBeInTheDocument();
    });

    it('displays contact information cards', () => {
      renderWithRouter(<EAACapitalLanding />);
      expect(screen.getByText(/Quick chat/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Email/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/Offices/i)).toBeInTheDocument();
    });

    it('displays email addresses', () => {
      renderWithRouter(<EAACapitalLanding />);
      expect(screen.getByText(/edgar@eaacap.com/i)).toBeInTheDocument();
      expect(screen.getByText(/clarem@eaacap.com/i)).toBeInTheDocument();
    });

    it('displays office location', () => {
      renderWithRouter(<EAACapitalLanding />);
      expect(screen.getByText('Fort Lauderdale, FL')).toBeInTheDocument();
    });

    it('has Calendly link', () => {
      renderWithRouter(<EAACapitalLanding />);
      const calendlyLink = screen.getByText('Schedule time').closest('a');
      expect(calendlyLink).toHaveAttribute('href', 'https://calendly.com/edgar-eaacap/30min');
      expect(calendlyLink).toHaveAttribute('target', '_blank');
    });
  });

  describe('Footer', () => {
    it('renders footer with company name', () => {
      renderWithRouter(<EAACapitalLanding />);
      const footerElements = screen.getAllByText('EAA Cap');
      expect(footerElements.length).toBeGreaterThan(0);
    });

    it('displays copyright with current year', () => {
      renderWithRouter(<EAACapitalLanding />);
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${currentYear} EAA Cap`))).toBeInTheDocument();
    });

    it('renders logo in footer', () => {
      renderWithRouter(<EAACapitalLanding />);
      const logos = screen.getAllByAltText('EAA Cap Logo');
      expect(logos.length).toBeGreaterThan(0);
    });
  });

  describe('Header Integration', () => {
    it('includes the Header component', () => {
      renderWithRouter(<EAACapitalLanding />);
      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('Book a Consult')).toBeInTheDocument();
    });
  });

  describe('Section IDs for Navigation', () => {
    it('has correct section IDs for anchor navigation', () => {
      const { container } = renderWithRouter(<EAACapitalLanding />);
      expect(container.querySelector('#home')).toBeInTheDocument();
      expect(container.querySelector('#services')).toBeInTheDocument();
      expect(container.querySelector('#results')).toBeInTheDocument();
      expect(container.querySelector('#contact')).toBeInTheDocument();
    });
  });
});
