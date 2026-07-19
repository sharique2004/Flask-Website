import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import Home from '@/pages/Home';
import Bibi from '@/pages/Bibi';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

// Redirect component – replaces current URL immediately
function Redirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/bibi" component={Bibi} />
      {/* /scribe → external MeetingScribe product site */}
      <Route path="/scribe">
        <Redirect to="https://meetingscribe.insforge.site/" />
      </Route>
      {/* /resume → static PDF asset */}
      <Route path="/resume">
        <Redirect to="/resume.pdf" />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
