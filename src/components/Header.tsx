import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

const navLinks = [
  { label: "Tentang Kami", id: "tentang-kami" },
  { label: "Wedding", id: "wedding" },
  { label: "Multimedia", id: "multimedia" },
  { label: "Videotron", id: "videotron" },
  { label: "Katalog", id: "katalog-foto" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const { getWALink, settings } = useSiteSettings();
  const isHome = location.pathname === "/";

  const goHome = () => {
    setMobileOpen(false);
    setActiveId("");
    if (location.pathname !== "/") {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) { setActiveId(""); return; }
    const ids = ["tentang-kami", "wedding", "multimedia", "videotron", "katalog-foto", "katalog-video"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id === "katalog-video" ? "katalog-foto" : id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [isHome]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openWhatsApp = () => {
    setMobileOpen(false);
    const url = getWALink(`Halo ${settings.company_name}, saya ingin konsultasi gratis untuk acara saya.`);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4 max-w-7xl mx-auto">
        <button aria-label={`${settings.company_name} Home`} onClick={goHome} className="flex-shrink-0">
          <img src="/anubae-logo2.png" alt={settings.company_name} width="280" height="40" loading="eager" className="h-20 w-auto object-contain" />
        </button>

        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <button
            onClick={goHome}
            className={`relative text-sm font-medium tracking-wide transition-colors duration-200 ${
              isHome && !activeId ? "text-primary" : "text-foreground hover:text-primary"
            }`}
          >
            Home
            {isHome && !activeId && (
              <span className="absolute -bottom-1.5 left-0 right-0 mx-auto w-6 h-0.5 bg-primary rounded-full" />
            )}
          </button>
          {navLinks.map((link) => {
            const isActive = isHome && activeId === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-200 ${
                  isActive ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 right-0 mx-auto w-6 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={openWhatsApp}
          className="hidden md:inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-5 py-2.5 rounded-lg hover:bg-primary/80 transition-colors duration-200 text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          Konsultasi Sekarang
        </button>

        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <div className="flex flex-col">
          <button
            onClick={goHome}
            className={`w-full text-left px-6 py-4 text-base font-medium border-b border-border transition-colors duration-200 ${
              isHome && !activeId ? "text-primary" : "text-foreground hover:text-primary"
            }`}
          >
            Home
          </button>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`w-full text-left px-6 py-4 text-base font-medium border-b border-border transition-colors duration-200 ${
                isHome && activeId === link.id ? "text-primary" : "text-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="p-4">
            <button
              onClick={openWhatsApp}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-5 py-3 rounded-lg hover:bg-primary/80 transition-colors duration-200"
            >
              <MessageCircle className="w-5 h-5" />
              Konsultasi Sekarang
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
