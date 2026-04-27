import { Check } from "lucide-react";
import FadeInSection from "./FadeInSection";
import { useWATemplates } from "@/hooks/useWATemplates";
import { useSiteSettings } from "@/hooks/useSiteSettings";

type Package = {
  name: string;
  price: string;
  features: string[];
  featured?: boolean;
  templateKey: string;
};

const packages: Package[] = [
  {
    name: "Basic Package",
    price: "Rp 3.999.999",
    features: [
      "1 Set Album Magazine 30x30, 20 Sheet",
      "Trailer Video 3 Menit FHD",
      "16R With Frame",
      "Dokumentasi Video 90 Menit",
      "3 Prosesi",
    ],
    whatsappText: "Halo,%20saya%20tertarik%20dengan%20Basic%20Package%20Wedding",
  },
  {
    name: "Premium Package",
    price: "Rp 4.999.999",
    featured: true,
    features: [
      "1 Set Album Magazine 30x40, 20 Sheet",
      "Highlight Video 3 Menit FHD",
      "Dokumentasi Video 90 Menit",
      "All File in Flashdisk",
      "20R With Frame",
      "4 Prosesi",
    ],
    whatsappText: "Halo,%20saya%20tertarik%20dengan%20Premium%20Package%20Wedding",
  },
  {
    name: "Luxury Package",
    price: "Rp 6.999.999",
    features: [
      "2 Set Album Magazine 30x40, 20 Sheet",
      "Cinema Video 3 Menit FHD",
      "20R With Frame",
      "Dokumentasi Video 90 Menit",
      "Live Cam 1 Prosesi + TV",
      "All File in Flashdisk",
      "4 Prosesi",
      "Foto Banner 1 Set",
    ],
    whatsappText: "Halo,%20saya%20tertarik%20dengan%20Luxury%20Package%20Wedding",
  },
];

const WHATSAPP_BASE = "https://wa.me/6281242401771?text=";

const Wedding = () => (
  <section id="wedding" className="bg-background py-24 px-4 md:px-8">
    <div className="max-w-7xl mx-auto">
      <FadeInSection>
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-1 bg-primary rounded-full" />
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Wedding</span>
            <div className="w-8 h-1 bg-primary rounded-full" />
          </div>
          <h2 className="text-foreground text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Wedding Organizer
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Wujudkan pernikahan impian dengan layanan wedding organizer profesional kami
          </p>
        </div>
      </FadeInSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {packages.map((pkg, i) => {
          const isFeatured = pkg.featured;
          return (
            <FadeInSection key={pkg.name} delay={i * 120}>
              <div
                className={`relative h-full flex flex-col justify-between rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_24px_rgba(128,240,255,0.15)] ${
                  isFeatured
                    ? "bg-card border-2 border-primary lg:scale-[1.02]"
                    : "bg-card border border-border"
                }`}
                style={!isFeatured ? { backgroundColor: "#111111" } : { backgroundColor: "#1a1a1a" }}
              >
                {/* Badge */}
                <div className="mb-6">
                  {isFeatured ? (
                    <span className="inline-block bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full">
                      Paling Populer
                    </span>
                  ) : (
                    <span className="inline-block border border-primary text-primary font-semibold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full">
                      {pkg.name}
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  {isFeatured && (
                    <h3 className="text-foreground text-xl font-bold mb-2">{pkg.name}</h3>
                  )}

                  {/* Price */}
                  <div className="mb-8">
                    <div className="text-primary text-3xl md:text-4xl font-bold tracking-tight">
                      {pkg.price}
                    </div>
                    <div className="text-muted-foreground text-sm mt-1">per paket</div>
                  </div>

                  {/* Features */}
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

                {/* CTA */}
                <a
                  href={`${WHATSAPP_BASE}${pkg.whatsappText}`}
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
        *Harga dapat berubah sewaktu-waktu. Hubungi kami untuk penawaran terbaik.
      </p>
    </div>
  </section>
);

export default Wedding;
