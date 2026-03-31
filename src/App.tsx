import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SiteNavigation from "@/components/SiteNavigation";
import Index from "./pages/Index.tsx";
import OekoComparison from "./pages/OekoComparison.tsx";
import InflationCalculator from "./pages/InflationCalculator.tsx";
import ShrinkflationHallOfShame from "./pages/ShrinkflationHallOfShame.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SiteNavigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/oeko" element={<OekoComparison />} />
          <Route path="/beregner" element={<InflationCalculator />} />
          <Route path="/shrinkflation" element={<ShrinkflationHallOfShame />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
