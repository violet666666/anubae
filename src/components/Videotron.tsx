import { Monitor, Maximize, Zap, Settings, Check, MapPin, Truck } from "lucide-react";
import FadeInSection from "./FadeInSection";

type LocationPackage = {
  icon: typeof MapPin;
  title: string;
  price: string;
  description: string;
  features: string[];
  whatsappText: string;
};

const locationPackages: LocationPackage[] = [
  {
    icon: MapPin,
    title: "Dalam Kota Makassar",
    price: "Rp 500.000",
    description: "Meliputi seluruh wilayah dalam Kota Makassar dan sekitarnya",
    features: ["Termasuk Operator", "Instalasi & Uninstalasi", "Konten Setup Awal"],
    whatsappText: "Halo,%20saya%20ingin%20sewa%20Videotron%20dalam%20kota%20Makassar",
  },
  {
    icon: Truck,
    title: "Luar Kota Makassar",
    price: "Rp 700.000",
    description: "Meliputi kota-kota lain di luar Makassar, Sulawesi Selatan dan sekitarnya",
    features: [
      "Termasuk Operator",
      "Instalasi & Uninstalasi",
      "Konten Setup Awal",
      "Biaya Transport Termasuk",
    ],
    whatsappText: "Halo,%20saya%20ingin%20sewa%20Videotron%20luar%20kota%20Makassar",
  },
];

const WHATSAPP_BASE = "https://wa.me/6281242401771?text=";

const specs = [
  { icon: Monitor, title: "LED Indoor & Outdoor", desc: "Tersedia berbagai ukuran pixel pitch P3, P4, P5 untuk kebutuhan indoor maupun outdoor" },
  { icon: Maximize, title: "Custom Size", desc: "Konfigurasi ukuran videotron fleksibel sesuai dimensi panggung dan venue acara" },
  { icon: Zap, title: "High Brightness", desc: "Kecerahan tinggi 5000+ nits memastikan visual tetap jelas dalam kondisi cahaya apapun" },
  { icon: Settings, title: "Setup & Operator", desc: "Tim teknisi berpengalaman menangani instalasi, kalibrasi, dan operasional selama acara" },
];

const Videotron = () => (
  <section id="videotron" className="bg-background py-24 px-4 md:px-8">
    <div className="max-w-7xl mx-auto">
      <FadeInSection>
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-1 bg-primary rounded-full" />
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Videotron</span>
            <div className="w-8 h-1 bg-primary rounded-full" />
          </div>
          <h2 className="text-foreground text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Sewa Videotron LED
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Layar LED berkualitas tinggi untuk panggung acara yang lebih hidup dan profesional
          </p>
        </div>
      </FadeInSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {specs.map((s, i) => (
          <FadeInSection key={s.title} delay={i * 80}>
            <div className="bg-muted p-8 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 group h-full">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-foreground text-lg font-semibold mb-3">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

export default Videotron;
