import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Without vitest globals, RTL can't register its own auto-cleanup.
afterEach(cleanup);

// jsdom lacks the observer/media APIs the site uses; stub them so components
// mount. Reveal-on-scroll content simply stays in its initial state.
class ObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
Object.assign(globalThis, {
  IntersectionObserver: ObserverStub,
  ResizeObserver: ObserverStub,
});

window.matchMedia ??= ((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
})) as typeof window.matchMedia;

Element.prototype.scrollIntoView ??= () => {};
