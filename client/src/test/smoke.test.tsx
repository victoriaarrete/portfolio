import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/app/App';

// Critical-path smoke tests: the page renders, every section exists, the
// interactive pieces respond. These guard future refactors, not pixels —
// visual regressions are covered by scripts/visual-diff.mjs.

describe('portfolio smoke', () => {
  it('renders the home page with every section and landmark', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/victoria/i);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    for (const id of [
      'hero',
      'about',
      'experience',
      'philosophy',
      'projects',
      'testimonials',
      'contact',
    ]) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }
  });

  it('installs the console easter egg', () => {
    render(<App />);
    const victoria = (window as unknown as Record<string, unknown>).victoria as
      Record<string, unknown> | undefined;
    expect(victoria).toBeDefined();
    expect(typeof victoria?.maze).toBe('function');
  });

  it('switches testimonial conversations via the tablist', async () => {
    const user = userEvent.setup();
    render(<App />);

    const tablist = screen.getByRole('tablist', { name: /colleague testimonials/i });
    const tabs = within(tablist).getAllByRole('tab');
    expect(tabs).toHaveLength(4);

    // Last testimonial opens by default
    expect(tabs[3]).toHaveAttribute('aria-selected', 'true');

    await user.click(tabs[0]);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    const panel = screen.getByRole('tabpanel');
    expect(panel).toHaveAttribute('aria-labelledby', 'testimonial-tab-0');
  });

  it('reports mobile menu state on the toggle button', async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggle = screen.getByRole('button', { name: /toggle mobile menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });

  it('has the contact links', () => {
    render(<App />);
    expect(document.querySelector('a[href^="mailto:"]')).toBeInTheDocument();
    const linkedin = document.querySelector('a[href*="linkedin.com"]');
    expect(linkedin).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });
});
