import { Toaster } from "@/components/ui/sonner";
import { motion } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ThankYou from "./pages/ThankYou";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/thank-you"} component={ThankYou} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          {/* Global Background Pattern */}
          <div 
            className="fixed inset-0 z-[-1] opacity-30 pointer-events-none bg-secondary/20"
            style={{
              backgroundImage: `url('/images/hero-bg.jpg')`,
              backgroundSize: '150%',
              backgroundPosition: 'center',
            }}
          />
          
          {/* Global Floating Confetti/Icons Animation */}
          <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-8 h-8 bg-primary rounded-sm border-2 border-black"
                initial={{ 
                  x: Math.random() * 100 + "vw", 
                  y: -50, 
                  rotate: 0 
                }}
                animate={{ 
                  y: "100vh", 
                  rotate: 360 
                }}
                transition={{ 
                  duration: Math.random() * 5 + 5, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: Math.random() * 5
                }}
                style={{
                  backgroundColor: ['#FFCC00', '#00A2FF', '#FF4444'][Math.floor(Math.random() * 3)],
                  left: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
