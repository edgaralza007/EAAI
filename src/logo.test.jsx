import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Logo from './logo';

describe('Logo', () => {
  it('renders logo image with correct alt text', () => {
    render(<Logo />);
    const img = screen.getByAltText('EAA Cap Logo');
    expect(img).toBeInTheDocument();
  });

  it('renders with default size of 32', () => {
    render(<Logo />);
    const img = screen.getByAltText('EAA Cap Logo');
    expect(img).toHaveStyle({ height: '32px', width: 'auto' });
  });

  it('renders with custom size when provided', () => {
    render(<Logo size={64} />);
    const img = screen.getByAltText('EAA Cap Logo');
    expect(img).toHaveStyle({ height: '64px', width: 'auto' });
  });

  it('has correct src attribute', () => {
    render(<Logo />);
    const img = screen.getByAltText('EAA Cap Logo');
    expect(img).toHaveAttribute('src', '/logo.png');
  });
});
