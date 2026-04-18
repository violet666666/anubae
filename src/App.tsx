import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import ScrollToTop from "./components/ScrollToTop.tsx";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsOfService from "./pages/TermsOfService.tsx";
import RefundPolicy from "./pages/RefundPolicy.tsx";
import CourseSchedule from "./pages/CourseSchedule.tsx";
import GalleryIndex from "./pages/GalleryIndex.tsx";
import GalleryDetail from "./pages/GalleryDetail.tsx";

const queryClient = new QueryClient();

const FloatingWhatsApp = () => {
  const handleClick = () => {
    window.open("https://wa.me/6281242401771", "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed z-[100]"
      style={{ bottom: "28px", right: "28px" }}
    >
      <div className="relative inline-flex items-center justify-center group">
        {/* Tooltip */}
        <span
          className="absolute right-full mr-3 whitespace-nowrap text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
          style={{ backgroundColor: "#111111", color: "#ffffff" }}
        >
          Chat WhatsApp
        </span>

        {/* Ping ring */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40 animate-ping" />

        {/* Button */}
        <button
          aria-label="Chat WhatsApp"
          onClick={handleClick}
          className="relative inline-flex items-center justify-center rounded-full transition-transform duration-200 hover:scale-[1.12] shadow-lg"
          style={{
            width: "56px",
            height: "56px",
            backgroundColor: "#25D366",
          }}
        >
          <MessageCircle size={26} color="#ffffff" />
        </button>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/paket-layanan" element={<CourseSchedule />} />
          <Route path="/course-schedule" element={<CourseSchedule />} />
          <Route path="/gallery" element={<GalleryIndex />} />
          <Route path="/gallery/:id" element={<GalleryDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingWhatsApp />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
