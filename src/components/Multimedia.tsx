import { Check } from "lucide-react";
import FadeInSection from "./FadeInSection";
import { useWATemplates } from "@/hooks/useWATemplates";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { useContentSettings } from "@/hooks/useContentSettings";

type Package = {
  name: string;
  badge: string;
  price: string;
  features: string[];
  featured?: boolean;
  templateKey: string;
};

const DEFAULT_PACKAGES: Package[] = [
  {
    name: "1 Camera",
    badge: "Starter",
    price: "Rp 1.500.000",
    features: [
      "1 Unit Kamera",
      "Recording File",
      "Hollyland RX & TX (Wireless)",
      "Laptop",
      "Operator Cam Profesional",
    ],
    templateKey: "livecam_1cam",
  },
  {
    name: "2 Camera",
    badge: "Terpopuler",
    price: "Rp 2.500.000",
    featured: true,
    features: [
      "2 Unit Kamera",
      "Recording File",
      "Hollyland RX & TX (Wireless)",
      "Laptop",
      "VJ VMix Software",
      "HDMI Kabel",
    ],
    templateKey: "livecam_2cam",
  },
  {
    name: "3 Camera",
    badge: "Professional",
    price: "Rp 3.500.000",
    features: [
      "3 Unit Kamera",
      "Recording File",
      "Hollyland RX & TX (Wireless)",
      "Laptop",
      "VJ VMix Software",
      "Instalasi HDMI Lengkap",
    ],
    templateKey: "livecam_3cam",
  },
];

const DEFAULT_SECTION_TITLE = "Layanan Multimedia";
const DEFAULT_SECTION_DESC = "Solusi dokumentasi dan produksi multimedia lengkap untuk segala jenis acara";
const DEFAULT_PROMO = "🎉 FREE LED TV 43 INCH UNTUK SEMUA PAKET LIVE CAM";
const DEFAULT_DISCLAIMER = "*Harga belum termasuk transportasi di luar Makassar. Hubungi kami untuk detail lebih lanjut.";

const parsePackages = (json?: string): Package[] => {
  if (!json) return DEFAULT_PACKAGES;
  try { const parsed = JSON.parse(json); return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_PACKAGES; } catch { return DEFAULT_PACKAGES; }
};

const Multimedia = () => {
  const templates = useWATemplates();
  const { settings } = useSiteSettings();
  const { values } = useContentSettings(["multimedia_section_title", "multimedia_section_desc", "multimedia_promo_text", "multimedia_packages", "multimedia_disclaimer"]);

  const packages = parsePackages(values.multimedia_packages);
  const sectionTitle = values.multimedia_section_title || DEFAULT_SECTION_TITLE;
  const sectionDesc = values.multimedia_section_desc || DEFAULT_SECTION_DESC;
  const promoText = values.multimedia_promo_text || DEFAULT_PROMO;
  const disclaimer = values.multimedia_disclaimer || DEFAULT_DISCLAIMER;

  const buildWaUrl = (key: string) =>
    `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(templates[key] ?? "")}`;

  return (
    <section id="multimedia" className="bg-card py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <FadeInSection>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-1 bg-primary rounded-full" />
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">Multimedia</span>
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

        {/* Highlighted promo banner */}
        <FadeInSection>
          <div
            className="w-full text-center font-bold rounded-xl px-6 py-4 mb-8 border border-primary"
            style={{ backgroundColor: "rgba(128,240,255,0.1)", color: "#80f0ff" }}
          >
            {promoText}
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {packages.map((pkg, i) => {
            const isFeatured = pkg.featured;
            return (
              <FadeInSection key={pkg.templateKey} delay={i * 120}>
                <div
                  className={`relative h-full flex flex-col justify-between rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_24px_rgba(128,240,255,0.15)] ${
                    isFeatured
                      ? "border-2 border-primary lg:scale-[1.02]"
                      : "border border-border"
                  }`}
                  style={{ backgroundColor: isFeatured ? "#1a1a1a" : "#111111" }}
                >
                  <div className="mb-6">
                    {isFeatured ? (
                      <span className="inline-block bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full">
                        {pkg.badge}
                      </span>
                    ) : (
                      <span className="inline-block border border-primary text-primary font-semibold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-foreground text-xl font-bold mb-2">{pkg.name}</h3>

                    <div className="mb-8">
                      <div className="text-primary text-3xl md:text-4xl font-bold tracking-tight">
                        {pkg.price}
                      </div>
                      <div className="text-muted-foreground text-sm mt-1">per event</div>
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
                    className={`block w-full text-center font-bold px-6 py-3 rounded-lg transition-all duration-200 ${
                      isFeatured
                        ? "bg-primary text-primary-foreground hover:bg-primary/80"
                        : "border border-primary text-primary bg-transparent hover:bg-primary/10"
                    }`}
                  >
                    Pesan Sekarang
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

export default Multimedia;
