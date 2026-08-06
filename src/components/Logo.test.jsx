import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Logo from './Logo';

describe('Logo', () => {
  it('renders with accessible alt text', () => {
    render(<Logo />);
    expect(screen.getByAltText('EAA Cap Logo')).toBeInTheDocument();
  });

  it('defaults to the accent colorway', () => {
    render(<Logo />);
    expect(screen.getByAltText('EAA Cap Logo')).toHaveAttribute('src', '/logo-accent.png');
  });

  it('supports the other colorways', () => {
    const { rerender } = render(<Logo tone="ink" />);
    expect(screen.getByAltText('EAA Cap Logo')).toHaveAttribute('src', '/logo-ink.png');

    rerender(<Logo tone="paper" />);
    expect(screen.getByAltText('EAA Cap Logo')).toHaveAttribute('src', '/logo-paper.png');
  });

  it('falls back to accent for an unknown tone', () => {
    render(<Logo tone="chartreuse" />);
    expect(screen.getByAltText('EAA Cap Logo')).toHaveAttribute('src', '/logo-accent.png');
  });

  it('defaults to 32px and honors a custom size', () => {
    const { rerender } = render(<Logo />);
    expect(screen.getByAltText('EAA Cap Logo')).toHaveStyle({ height: '32px' });

    rerender(<Logo size={64} />);
    expect(screen.getByAltText('EAA Cap Logo')).toHaveStyle({ height: '64px' });
  });
});
