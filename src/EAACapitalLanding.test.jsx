import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EAACapitalLanding from './EAACapitalLanding';

const renderPage = () =>
  render(
    <BrowserRouter>
      <EAACapitalLanding />
    </BrowserRouter>
  );

// Nav labels, the company name, emails and the office all appear in BOTH the
// header/footer chrome and the page body, so getAllByText is used where a
// single match is not guaranteed. That is a property of having a real footer,
// not a defect.
describe('EAACapitalLanding', () => {
  describe('Hero', () => {
    it('renders the main heading', () => {
      renderPage();
      expect(screen.getByText('The right technology,')).toBeInTheDocument();
      expect(screen.getByText('made simple.')).toBeInTheDocument();
    });

    it('renders the hero description', () => {
      renderPage();
      expect(
        screen.getByText(/EAA Cap helps businesses confidently adopt tools/i)
      ).toBeInTheDocument();
    });

    it('renders the hero calls to action', () => {
      renderPage();
      expect(screen.getByText('Start a Conversation')).toHaveAttribute('href', '#contact');
      expect(screen.getByText('See How We Help')).toHaveAttribute('href', '#results');
    });

    it('displays the consulting and implementation tracks', () => {
      renderPage();
      expect(screen.getByText('Consulting')).toBeInTheDocument();
      expect(screen.getByText('Implementation')).toBeInTheDocument();
      expect(screen.getByText('Product & AI Strategy')).toBeInTheDocument();
      expect(screen.getByText('Public Websites')).toBeInTheDocument();
    });
  });

  describe('Services', () => {
    it('renders the services heading', () => {
      renderPage();
      expect(screen.getByText('What We Do')).toBeInTheDocument();
    });

    // Scoped to the section: "AI Agents" is also an item in the hero's
    // Implementation track, so an unscoped query matches twice.
    it('displays all four services', () => {
      const { container } = renderPage();
      const services = within(container.querySelector('#services'));
      expect(services.getByText('Process Transformation')).toBeInTheDocument();
      expect(services.getByText('Websites')).toBeInTheDocument();
      expect(services.getByText('CRM & Contact Center')).toBeInTheDocument();
      expect(services.getByText('AI Agents')).toBeInTheDocument();
    });

    it('renders service descriptions', () => {
      renderPage();
      expect(
        screen.getByText(/Modern, responsive websites that convert visitors into customers/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Automate front and back office operations/i)
      ).toBeInTheDocument();
    });

    it('gives every service image alt text and explicit dimensions', () => {
      const { container } = renderPage();
      const images = container.querySelectorAll('#services img');
      expect(images.length).toBe(4);
      images.forEach((img) => {
        expect(img).toHaveAttribute('alt', expect.stringMatching(/\S/));
        expect(img).toHaveAttribute('width');
        expect(img).toHaveAttribute('height');
      });
    });
  });

  describe('Approach', () => {
    it('renders the approach section that was previously commented out', () => {
      renderPage();
      expect(screen.getByText('A Practical, Outcome-First Approach')).toBeInTheDocument();
      expect(
        screen.getByText(/We start by understanding your business/i)
      ).toBeInTheDocument();
      for (const step of ['Discover', 'Design', 'Validate', 'Enable']) {
        expect(screen.getByText(step)).toBeInTheDocument();
      }
    });
  });

  describe('Results', () => {
    it('renders the results heading', () => {
      renderPage();
      expect(screen.getByText('Results that matter')).toBeInTheDocument();
    });

    it('displays key metrics and their labels', () => {
      renderPage();
      expect(screen.getByText('$5M')).toBeInTheDocument();
      expect(screen.getByText('30%')).toBeInTheDocument();
      expect(screen.getByText('4 wks')).toBeInTheDocument();
      expect(screen.getByText('3 days')).toBeInTheDocument();

      expect(screen.getByText('Savings reported by clients')).toBeInTheDocument();
      expect(screen.getByText('Avg. productivity lift')).toBeInTheDocument();
      expect(screen.getByText('Avg. time to production')).toBeInTheDocument();
      expect(screen.getByText('Typical training required')).toBeInTheDocument();
    });

    it('renders the client testimonial with attribution', () => {
      renderPage();
      expect(screen.getByText(/EAA Cap helped us grow our ABA practice/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Alex, CEO of Blossoming Mind Therapies/i)
      ).toBeInTheDocument();
    });

    it('displays the efficiency outcomes', () => {
      renderPage();
      expect(
        screen.getByText(/Deploy a customer experience desktop in minutes/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/20–40% productivity gains/i)).toBeInTheDocument();
      expect(screen.getByText(/Lower IT costs by 25%/i)).toBeInTheDocument();
    });
  });

  describe('Contact', () => {
    it('renders the contact heading', () => {
      renderPage();
      expect(screen.getByText(/Let.?s talk about your roadmap/i)).toBeInTheDocument();
    });

    it('renders every form field', () => {
      renderPage();
      expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('sample@company.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Your company')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Let us know how we can help you')).toBeInTheDocument();
    });

    // Formspree keys off these exact names — renaming one silently breaks
    // every inbound lead, with no error anywhere.
    it('preserves the Formspree endpoint and field names', () => {
      const { container } = renderPage();
      const form = container.querySelector('form');
      expect(form).toHaveAttribute('action', 'https://formspree.io/f/xqadveqj');
      expect(form).toHaveAttribute('method', 'POST');

      for (const name of ['FullName', 'email', 'company', 'message']) {
        expect(form.querySelector(`[name="${name}"]`)).toBeInTheDocument();
      }
    });

    it('associates every form field with a label', () => {
      renderPage();
      expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Company')).toBeInTheDocument();
      expect(screen.getByLabelText('What do you need help with?')).toBeInTheDocument();
    });

    it('renders the submit button', () => {
      renderPage();
      expect(screen.getByRole('button', { name: /send inquiry/i })).toBeInTheDocument();
    });

    it('displays contact details', () => {
      renderPage();
      expect(screen.getByText(/Quick chat/i)).toBeInTheDocument();
      expect(screen.getByText(/Offices/i)).toBeInTheDocument();
      expect(screen.getAllByText(/edgar@eaacap.com/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/clarem@eaacap.com/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText('Fort Lauderdale, FL').length).toBeGreaterThan(0);
    });

    it('links to Calendly in a new tab', () => {
      renderPage();
      const link = screen.getByText('Schedule time').closest('a');
      expect(link).toHaveAttribute('href', 'https://calendly.com/edgar-eaacap/30min');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    });
  });

  describe('Chrome', () => {
    it('renders header and footer', () => {
      renderPage();
      expect(screen.getAllByText('EAA Cap').length).toBeGreaterThan(0);
      expect(screen.getAllByAltText('EAA Cap Logo').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Services').length).toBeGreaterThan(0);
      expect(screen.getByText('Book a Consult')).toBeInTheDocument();
    });

    it('displays the copyright with the current year', () => {
      renderPage();
      const year = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${year} EAA Cap`))).toBeInTheDocument();
    });
  });

  describe('Anchor navigation', () => {
    it('keeps the section ids the nav depends on', () => {
      const { container } = renderPage();
      for (const id of ['home', 'services', 'results', 'contact']) {
        expect(container.querySelector(`#${id}`)).toBeInTheDocument();
      }
    });

    it('renders the main landmark', () => {
      renderPage();
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });
});
