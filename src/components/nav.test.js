import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { scrollToId, isExternal } from './nav';

describe('isExternal', () => {
  it('recognises off-site and protocol links', () => {
    expect(isExternal('https://calendly.com/x')).toBe(true);
    expect(isExternal('mailto:edgar@eaacap.com')).toBe(true);
    expect(isExternal('tel:+15550000')).toBe(true);
  });

  it('treats in-app destinations as internal', () => {
    expect(isExternal('/portfolio')).toBe(false);
    expect(isExternal('/#contact')).toBe(false);
    expect(isExternal('#home')).toBe(false);
    expect(isExternal(undefined)).toBe(false);
  });
});

describe('scrollToId', () => {
  const SECTION_TOP = 3706;
  const HEADER_PAD = 96;

  beforeEach(() => {
    vi.useFakeTimers();
    window.scrollTo = vi.fn();
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });

    document.body.innerHTML = '<section id="results"></section>';
    document.getElementById('results').getBoundingClientRect = () => ({ top: SECTION_TOP });

    // scroll-padding-top is the single source of truth for the header offset.
    vi.spyOn(window, 'getComputedStyle').mockReturnValue({
      scrollPaddingTop: `${HEADER_PAD}px`,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('returns false for an anchor that does not exist', () => {
    expect(scrollToId('nope')).toBe(false);
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('scrolls to the anchor offset by the sticky header', () => {
    expect(scrollToId('results')).toBe(true);
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: SECTION_TOP - HEADER_PAD,
      behavior: 'smooth',
    });
  });

  it('never scrolls above the top of the document', () => {
    document.getElementById('results').getBoundingClientRect = () => ({ top: 10 });
    scrollToId('results');
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  // Smooth scrolling silently does nothing in some environments. Without the
  // fallback the URL changes to #results and the page never moves — which is
  // exactly the bug this guards.
  it('forces arrival when smooth scrolling never ran', () => {
    scrollToId('results');
    expect(window.scrollY).toBe(0); // animation did not happen

    vi.advanceTimersByTime(500);

    expect(window.scrollTo).toHaveBeenLastCalledWith(0, SECTION_TOP - HEADER_PAD);
  });

  it('does not yank the page when the scroll already arrived', () => {
    scrollToId('results');
    window.scrollY = SECTION_TOP - HEADER_PAD;

    vi.advanceTimersByTime(500);

    expect(window.scrollTo).toHaveBeenCalledTimes(1); // only the initial call
  });
});
