// The most recent theme change; only it may clear data-theme-transition
let latest: object | undefined;

/**
 * Runs `apply` (which must switch the theme class on <html> synchronously)
 * inside a view transition: the old theme blurs away while the new one
 * fades in (styled under html[data-theme-transition] in globals.css). With
 * reduced motion, without view transition support, or while the page is
 * hidden (browsers abort transitions then), the theme switches at once.
 */
export const runThemeTransition = (apply: () => void) => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (
    reducedMotion ||
    !document.startViewTransition ||
    document.visibilityState !== 'visible'
  ) {
    apply();
    return;
  }

  const token = {};
  latest = token;
  root.dataset.themeTransition = '';

  const viewTransition = document.startViewTransition(apply);
  // A transition that gets skipped (e.g. another one starts) still applies
  // the theme; only its animation is dropped
  viewTransition.ready.catch(() => {});
  void viewTransition.finished.finally(() => {
    // A newer theme change may still be running; leave its marker
    if (latest !== token) return;
    latest = undefined;
    delete root.dataset.themeTransition;
  });
};
