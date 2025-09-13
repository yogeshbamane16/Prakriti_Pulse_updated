import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/layout/Navigation";
import Home from "./pages/Home";
import Register from "./pages/Register";
import PrakritiQuiz from "./pages/PrakritiQuiz";
import SymptomChecker from "./pages/SymptomChecker";
import HerbRecommendations from "./pages/HerbRecommendations";
import MarksSimulation from "./pages/MarksSimulation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/quiz" element={<PrakritiQuiz />} />
              <Route path="/symptoms" element={<SymptomChecker />} />
              <Route path="/herbs" element={<HerbRecommendations />} />
              <Route path="/marks" element={<MarksSimulation />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
