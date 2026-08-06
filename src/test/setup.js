import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// jsdom implements neither of these. Framer Motion's `whileInView` (used by
// the Reveal component on every page) reaches for IntersectionObserver, and
// matchMedia backs the reduced-motion query. Without stubs the reveal state
// never resolves and assertions get flaky rather than wrong.
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe(target) {
    // Report immediately in view so revealed content is asserted as present.
    this.callback([{ target, isIntersecting: true, intersectionRatio: 1 }], this);
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

vi.stubGlobal(
  'matchMedia',
  vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
);

// jsdom has no layout engine and no scrolling. The navigation layer drives
// both of these for every in-page anchor.
Element.prototype.scrollIntoView = vi.fn();
window.scrollTo = vi.fn();

afterEach(() => {
  cleanup();
});
