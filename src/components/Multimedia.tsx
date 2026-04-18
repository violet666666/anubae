import { Check } from "lucide-react";
import FadeInSection from "./FadeInSection";

type Package = {
  name: string;
  badge: string;
  price: string;
  features: string[];
  featured?: boolean;
  whatsappText: string;
};

const packages: Package[] = [
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
    whatsappText: "Halo,%20saya%20tertarik%20Paket%20Live%20Cam%201%20Kamera",
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
    whatsappText: "Halo,%20saya%20tertarik%20Paket%20Live%20Cam%202%20Kamera",
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
    whatsappText: "Halo,%20saya%20tertarik%20Paket%20Live%20Cam%203%20Kamera",
  },
];

const WHATSAPP_BASE = "https://wa.me/6281242401771?text=";

const Multimedia = () => (
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
            Layanan Multimedia
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Solusi dokumentasi dan produksi multimedia lengkap untuk segala jenis acara
          </p>
        </div>
      </FadeInSection>

      {/* Highlighted promo banner */}
      <FadeInSection>
        <div
          className="w-full text-center font-bold rounded-xl px-6 py-4 mb-8 border border-primary"
          style={{ backgroundColor: "rgba(128,240,255,0.1)", color: "#80f0ff" }}
        >
          🎉 FREE LED TV 43 INCH UNTUK SEMUA PAKET LIVE CAM
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
        *Harga belum termasuk transportasi di luar Makassar. Hubungi kami untuk detail lebih lanjut.
      </p>
    </div>
  </section>
);

export default Multimedia;
