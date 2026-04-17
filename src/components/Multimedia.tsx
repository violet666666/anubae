import { Camera, Video, Image as ImageIcon, Mic } from "lucide-react";
import FadeInSection from "./FadeInSection";

const services = [
  { icon: Camera, title: "Photography", desc: "Foto dokumentasi profesional dengan komposisi sinematik untuk setiap momen penting" },
  { icon: Video, title: "Videography", desc: "Video highlight & dokumentasi acara dengan kualitas broadcast dan editing profesional" },
  { icon: ImageIcon, title: "Photobooth", desc: "Photobooth interaktif dengan instant print dan custom backdrop sesuai tema acara" },
  { icon: Mic, title: "Live Streaming", desc: "Layanan live streaming multi-platform untuk acara hybrid maupun online" },
];

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

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
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

export default Multimedia;
