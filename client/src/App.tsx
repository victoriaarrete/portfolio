import { Router, Switch, Route } from "wouter";
import { MotionConfig } from "motion/react";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { CursorGlow } from "@/components/cursor-glow";

function AppRoutes() {
  return (
    <div className="dark">
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
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
