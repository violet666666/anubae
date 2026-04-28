import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import ScrollToTop from "./components/ScrollToTop.tsx";
import { createAdminUser } from "./utils/createAdminUser";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { useSiteSettings } from "./hooks/useSiteSettings";
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
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminPanel from "./pages/admin/AdminPanel.tsx";

const queryClient = new QueryClient();

const FloatingWhatsApp = () => {
  const { settings } = useSiteSettings();
  const handleClick = () => {
    window.open(`https://wa.me/${settings.whatsapp_number}`, "_blank", "noopener,noreferrer");
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="28"
            height="28"
            fill="#ffffff"
          >
            <path d="M16 0C7.163 0 0 7.163 0 16c0 2.827.738 5.476 2.027 7.774L0 32l8.469-2.004A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.764-1.848l-.485-.29-5.027 1.188 1.22-4.893-.316-.502A13.268 13.268 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.878c-.398-.2-2.355-1.162-2.72-1.295-.366-.133-.632-.199-.899.2-.266.398-1.031 1.295-1.264 1.562-.232.266-.465.299-.863.1-.398-.2-1.682-.62-3.204-1.977-1.184-1.057-1.984-2.362-2.217-2.76-.232-.398-.025-.613.175-.812.18-.179.398-.465.598-.698.199-.232.265-.398.398-.664.133-.266.066-.498-.033-.698-.1-.199-.9-2.162-1.232-2.96-.325-.778-.655-.672-.9-.684l-.763-.013c-.266 0-.698.1-1.064.498-.365.398-1.397 1.363-1.397 3.326s1.43 3.858 1.629 4.124c.2.266 2.814 4.297 6.82 6.025.954.412 1.698.658 2.278.842.957.305 1.828.262 2.517.159.768-.114 2.355-.963 2.688-1.893.332-.93.332-1.727.232-1.893-.099-.166-.365-.266-.763-.465z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/panel"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingWhatsApp />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
