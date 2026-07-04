import { Router, Switch, Route } from "wouter";
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
    <>
      <CursorGlow />
      <Router base={base}>
        <AppRoutes />
      </Router>
    </>
  );
}

export default App;
