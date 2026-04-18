import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const ApertureLogo = () => (
  <svg
    viewBox="0 0 48 48"
    className="w-10 h-10 md:w-12 md:h-12 text-primary hover:animate-spin-slow transition-transform"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="24" cy="24" r="20" />
    <circle cx="24" cy="24" r="8" />
    <line x1="24" y1="4" x2="24" y2="16" />
    <line x1="24" y1="32" x2="24" y2="44" />
    <line x1="4" y1="24" x2="16" y2="24" />
    <line x1="32" y1="24" x2="44" y2="24" />
    <line x1="9.86" y1="9.86" x2="18.34" y2="18.34" />
    <line x1="29.66" y1="29.66" x2="38.14" y2="38.14" />
    <line x1="38.14" y1="9.86" x2="29.66" y2="18.34" />
    <line x1="18.34" y1="29.66" x2="9.86" y2="38.14" />
  </svg>
);

const navLinks = [
  { label: "Tentang Kami", id: "tentang-kami" },
  { label: "Wedding", id: "wedding" },
  { label: "Multimedia", id: "multimedia" },
  { label: "Videotron", id: "videotron" },
  { label: "Katalog", id: "katalog-foto" },
];

const WHATSAPP_URL = "https://wa.me/6281242401771";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
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
    const ids = ["tentang-kami", "wedding", "multimedia", "videotron", "katalog-foto", "katalog-video"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // map katalog-video to "katalog" link active state too
            setActiveId(id === "katalog-video" ? "katalog-foto" : id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openWhatsApp = () => {
    setMobileOpen(false);
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
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
        <button
          aria-label="Anubae Organizer Home"
          onClick={handleLogoClick}
          className="flex-shrink-0"
        >
          <ApertureLogo />
        </button>

        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
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
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`w-full text-left px-6 py-4 text-base font-medium border-b border-border transition-colors duration-200 ${
                activeId === link.id ? "text-primary" : "text-foreground hover:text-primary"
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
