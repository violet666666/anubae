import { Heart, Sparkles, Camera, Music, Utensils, Flower2 } from "lucide-react";
import FadeInSection from "./FadeInSection";

const features = [
  { icon: Heart, title: "Konsep Personal", desc: "Setiap pernikahan dirancang sesuai cerita cinta unik Anda" },
  { icon: Sparkles, title: "Dekorasi Eksklusif", desc: "Bunga segar, lighting elegan, dan venue styling premium" },
  { icon: Camera, title: "Dokumentasi Lengkap", desc: "Foto & video sinematik mengabadikan momen berharga Anda" },
  { icon: Music, title: "Entertainment", desc: "MC profesional, live band, dan DJ berpengalaman" },
  { icon: Utensils, title: "Katering Premium", desc: "Pilihan menu beragam dari vendor katering terpercaya" },
  { icon: Flower2, title: "Bridal Service", desc: "Make-up artist, hair-do, dan attire untuk pengantin" },
];

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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <FadeInSection key={f.title} delay={i * 80}>
            <div className="bg-muted p-8 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 group h-full">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-foreground text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

export default Wedding;
