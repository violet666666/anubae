import { Check, MapPin, Truck } from "lucide-react";
import FadeInSection from "./FadeInSection";
import { useWATemplates } from "@/hooks/useWATemplates";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useContentSettings } from "@/hooks/useContentSettings";

type LocationPackage = {
  title: string;
  price: string;
  description: string;
  features: string[];
  templateKey: string;
};

const ICON_MAP: Record<string, typeof MapPin> = { MapPin, Truck };

const DEFAULT_PACKAGES: LocationPackage[] = [
  {
    title: "Dalam Kota Makassar",
    price: "Rp 500.000",
    description: "Meliputi seluruh wilayah dalam Kota Makassar dan sekitarnya",
    features: ["Termasuk Operator", "Instalasi & Uninstalasi", "Konten Setup Awal"],
    templateKey: "videotron_dalam",
  },
  {
    title: "Luar Kota Makassar",
    price: "Rp 700.000",
    description: "Meliputi kota-kota lain di Sulawesi Selatan dan sekitarnya",
    features: [
      "Termasuk Operator",
      "Instalasi & Uninstalasi",
      "Konten Setup Awal",
      "Biaya Transport Termasuk",
    ],
    templateKey: "videotron_luar",
  },
];

const DEFAULT_SECTION_TITLE = "Harga Sewa Videotron";
const DEFAULT_SECTION_DESC = "Solusi layar LED profesional untuk setiap kebutuhan acara Anda";
const DEFAULT_PROMO = "📺 Tersedia berbagai ukuran — Konsultasikan kebutuhan Anda bersama tim kami";
const DEFAULT_DISCLAIMER = "*Harga per meter per hari. Minimum pemesanan 4m². Hubungi kami untuk survei lokasi gratis.";

const parsePackages = (json?: string): LocationPackage[] => {
  if (!json) return DEFAULT_PACKAGES;
  try { const parsed = JSON.parse(json); return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_PACKAGES; } catch { return DEFAULT_PACKAGES; }
};

const Videotron = () => {
  const templates = useWATemplates();
  const { settings } = useSiteSettings();
  const { values } = useContentSettings(["videotron_section_title", "videotron_section_desc", "videotron_promo_text", "videotron_packages", "videotron_disclaimer"]);

  const packages = parsePackages(values.videotron_packages);
  const sectionTitle = values.videotron_section_title || DEFAULT_SECTION_TITLE;
  const sectionDesc = values.videotron_section_desc || DEFAULT_SECTION_DESC;
  const promoText = values.videotron_promo_text || DEFAULT_PROMO;
  const disclaimer = values.videotron_disclaimer || DEFAULT_DISCLAIMER;

  const buildWaUrl = (key: string) =>
    `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(templates[key] ?? "")}`;

  return (
    <section id="videotron" className="bg-background py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <FadeInSection>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-1 bg-primary rounded-full" />
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">
                Videotron
              </span>
              <div className="w-8 h-1 bg-primary rounded-full" />
            </div>
            <h2 className="text-foreground text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {sectionTitle}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {sectionDesc}
            </p>
          </div>
        </FadeInSection>

        {/* Promo / info banner */}
        <FadeInSection>
          <div
            className="w-full text-center font-bold rounded-xl px-6 py-4 mb-10 border border-primary max-w-3xl mx-auto"
            style={{ backgroundColor: "rgba(128,240,255,0.1)", color: "#80f0ff" }}
          >
            {promoText}
          </div>
        </FadeInSection>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-[700px] mx-auto items-stretch">
          {packages.map((pkg, i) => {
            const Icon = i === 0 ? MapPin : Truck;
            return (
              <FadeInSection key={pkg.templateKey} delay={i * 120}>
                <div
                  className="relative h-full flex flex-col justify-between rounded-2xl p-8 border border-border transition-all duration-300 hover:shadow-[0_0_24px_rgba(128,240,255,0.15)]"
                  style={{ backgroundColor: "#111111" }}
                >
                  <div className="flex-1">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>

                    <h4 className="text-foreground text-xl font-bold mb-2">{pkg.title}</h4>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      {pkg.description}
                    </p>

                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-primary text-3xl md:text-4xl font-bold tracking-tight">
                          {pkg.price}
                        </span>
                        <span className="text-muted-foreground text-sm">/ meter</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed" style={{ color: "#cccccc" }}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={buildWaUrl(pkg.templateKey)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center font-bold px-6 py-3 rounded-lg border border-primary text-primary bg-transparent hover:bg-primary/10 transition-all duration-200"
                  >
                    Hubungi Kami
                  </a>
                </div>
              </FadeInSection>
            );
          })}
        </div>

        <p className="text-center text-muted-foreground text-sm mt-10 italic">
          {disclaimer}
        </p>
      </div>
    </section>
  );
};

export default Videotron;
