import { Instagram, Youtube, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Kebijakan Privasi", to: "/privacy-policy" },
  { label: "Syarat & Ketentuan", to: "/terms-of-service" },
  { label: "Kebijakan Pengembalian", to: "/refund-policy" },
  { label: "Paket Layanan", to: "/paket-layanan" },
];

const ApertureLogo = () => (
  <img
    src="/anubae-logo2.png"
    alt="Anubae Organizer"
    width="160"
    height="44"
    loading="lazy"
    className="h-11 w-auto object-contain opacity-90"
  />
);

const Footer = () => (
  <footer className="bg-background py-16 px-4 md:px-8 border-t border-foreground/10">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <ApertureLogo />
          <span className="text-foreground text-sm font-semibold tracking-widest">ANUBAE ORGANIZER</span>
        </div>
        <p className="text-foreground/50 text-sm mb-2">Mewujudkan momen tak terlupakan untuk setiap acara Anda.</p>
        <div className="flex gap-4 mt-6">
          <a
            href="https://www.instagram.com/anubae.organizer"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4 text-foreground" />
          </a>
          <a
            href="https://www.youtube.com/@Anubaeorganizer/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300"
            aria-label="YouTube"
          >
            <Youtube className="w-4 h-4 text-foreground" />
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300"
            aria-label="Facebook"
          >
            <Facebook className="w-4 h-4 text-foreground" />
          </a>
        </div>
      </div>

      <div>
        <h3 className="text-foreground text-sm font-semibold tracking-widest mb-6">KONTAK</h3>
        <a
          href="tel:+6281242401771"
          className="text-foreground/50 text-sm hover:text-primary transition-colors block mb-2"
        >
          +62 812-4240-1771
        </a>
        <a
          href="https://wa.me/6281242401771"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/50 text-sm hover:text-primary transition-colors block mb-2"
        >
          WhatsApp
        </a>
        <a
          href="https://maps.app.goo.gl/7yRLUaKsPGzbwHvy8"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/50 text-sm hover:text-primary transition-colors block"
        >
          Makassar, Sulawesi Selatan
        </a>
      </div>

      <div>
        <h3 className="text-foreground text-sm font-semibold tracking-widest mb-6">TAUTAN</h3>
        {quickLinks.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className="text-foreground/50 text-sm hover:text-primary transition-colors block mb-3"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div>
        <h3 className="text-foreground text-sm font-semibold tracking-widest mb-6">SOSIAL MEDIA</h3>
        <a href="https://www.instagram.com/anubae.organizer" target="_blank" rel="noopener noreferrer" className="text-foreground/50 text-sm hover:text-primary transition-colors block mb-3">@anubae.organizer</a>
        <a href="#" className="text-foreground/50 text-sm hover:text-primary transition-colors block mb-3">Anubae Organizer di YouTube</a>
        <a href="#" className="text-foreground/50 text-sm hover:text-primary transition-colors block mb-3">Galeri Pinterest</a>
      </div>
    </div>

    <div className="border-t border-foreground/10 mt-12 pt-8 text-center text-foreground/40 text-sm max-w-7xl mx-auto">
      © 2024–2026 Anubae Organizer. All rights reserved.
    </div>
  </footer>
);

export default Footer;
