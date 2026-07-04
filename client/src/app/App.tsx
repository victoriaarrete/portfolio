import { lazy, Suspense } from 'react';
import { Router, Switch, Route } from 'wouter';
import { MotionConfig } from 'motion/react';
import Home from '@/pages/home';
import { CursorGlow } from '@/shared/components/cursor-glow';

// Separate chunk: the 404 page stays out of the main bundle's critical path.
const NotFound = lazy(() => import('@/features/not-found/not-found'));

function AppRoutes() {
  return (
    <div className="dark">
      <Switch>
        <Route path="/" component={Home} />
        <Route>
          <Suspense fallback={null}>
            <NotFound />
          </Suspense>
        </Route>
      </Switch>
    </div>
  );
}

function App() {
  // Served from the root of the custom domain (victoriakirichenko.com)
  const base = '';

  return (
    // reducedMotion="user" makes every motion.* transform/layout animation
    // respect prefers-reduced-motion — the CSS kill-switch can't reach
    // framer's inline-style animations.
    <MotionConfig reducedMotion="user">
      <CursorGlow />
      <Router base={base}>
        <AppRoutes />
      </Router>
    </MotionConfig>
  );
}

export default App;
