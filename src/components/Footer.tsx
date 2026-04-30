import { Instagram, Youtube, Clock, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

const quickLinks = [
  { label: "Kebijakan Privasi", to: "/privacy-policy" },
  { label: "Syarat & Ketentuan", to: "/terms-of-service" },
  { label: "Kebijakan Pengembalian", to: "/refund-policy" },
  { label: "Paket Layanan", to: "/paket-layanan" },
];

const formatPhoneDisplay = (raw: string) => {
  const digits = raw.replace(/\D/g, "");
  const local = digits.startsWith("62") ? digits.slice(2) : digits.replace(/^0/, "");
  const part1 = local.slice(0, 3);
  const part2 = local.slice(3, 7);
  const part3 = local.slice(7);
  return `+62 ${[part1, part2, part3].filter(Boolean).join("-")}`;
};

const Footer = () => {
  const { settings } = useSiteSettings();
  const phoneDisplay = formatPhoneDisplay(settings.phone || settings.whatsapp_number);
  const waLink = `https://wa.me/${settings.whatsapp_number}`;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background py-16 px-4 md:px-8 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/anubae-logo2.png" alt={settings.company_name} width="160" height="44" loading="lazy" className="h-11 w-auto object-contain opacity-90" />
            <span className="text-foreground text-sm font-semibold tracking-widest">{settings.company_name.toUpperCase()}</span>
          </div>
          <p className="text-foreground/50 text-sm mb-2">{settings.description}</p>
          <div className="flex gap-4 mt-6">
            <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300" aria-label="Instagram">
              <Instagram className="w-4 h-4 text-foreground" />
            </a>
            <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300" aria-label="YouTube">
              <Youtube className="w-4 h-4 text-foreground" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-foreground text-sm font-semibold tracking-widest mb-6">KONTAK</h3>
          <a href={`tel:+${settings.phone || settings.whatsapp_number}`} className="text-foreground/50 text-sm hover:text-primary transition-colors flex items-center gap-2 mb-3">
            <Phone size={14} /> {phoneDisplay}
          </a>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="text-foreground/50 text-sm hover:text-primary transition-colors block mb-3">
            WhatsApp
          </a>
          {settings.address && (
            <a href={settings.maps_url} target="_blank" rel="noopener noreferrer" className="text-foreground/50 text-sm hover:text-primary transition-colors flex items-center gap-2 mb-3">
              <MapPin size={14} /> {settings.address}
            </a>
          )}
          {settings.business_hours && (
            <p className="text-foreground/40 text-sm flex items-center gap-2">
              <Clock size={14} /> {settings.business_hours}
            </p>
          )}
        </div>

        <div>
          <h3 className="text-foreground text-sm font-semibold tracking-widest mb-6">TAUTAN</h3>
          {quickLinks.map((link) => (
            <Link key={link.label} to={link.to} className="text-foreground/50 text-sm hover:text-primary transition-colors block mb-3">
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <h3 className="text-foreground text-sm font-semibold tracking-widest mb-6">SOSIAL MEDIA</h3>
          <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="text-foreground/50 text-sm hover:text-primary transition-colors block mb-3">Instagram</a>
          <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer" className="text-foreground/50 text-sm hover:text-primary transition-colors block mb-3">YouTube</a>
        </div>
      </div>

      <div className="border-t border-foreground/10 mt-12 pt-8 text-center text-foreground/40 text-sm max-w-7xl mx-auto">
        &copy; {year} {settings.company_name}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
