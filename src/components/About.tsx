import FadeInSection from "./FadeInSection";
import { useContentSettings } from "@/hooks/useContentSettings";

const DEFAULT_IMAGE = "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=800";
const DEFAULT_TITLE = "Kenapa Memilih Anubae?";
const DEFAULT_PARAGRAPH1 = "Anubae Organizer adalah tim event organizer profesional yang berdedikasi untuk mewujudkan setiap momen spesial Anda menjadi pengalaman tak terlupakan. Dengan pengalaman lebih dari 8 tahun, kami telah menangani ratusan acara dari berbagai skala.";
const DEFAULT_PARAGRAPH2 = "Mulai dari pernikahan romantis, acara perusahaan bergengsi, hingga pesta privat yang intim — kami menghadirkan konsep kreatif, perencanaan detail, dan eksekusi sempurna. Setiap acara yang kami tangani dirancang khusus sesuai keinginan dan anggaran Anda.";

const About = () => {
  const { values } = useContentSettings(["about_image", "about_title", "about_paragraph1", "about_paragraph2"]);

  const image = values.about_image || DEFAULT_IMAGE;
  const title = values.about_title || DEFAULT_TITLE;
  const paragraph1 = values.about_paragraph1 || DEFAULT_PARAGRAPH1;
  const paragraph2 = values.about_paragraph2 || DEFAULT_PARAGRAPH2;

  return (
    <section id="tentang-kami" className="bg-muted py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <FadeInSection>
          <img
            src={image}
            alt={title}
            width={800}
            height={500}
            loading="lazy"
            className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl"
          />
        </FadeInSection>
        <FadeInSection delay={150}>
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-1 bg-primary rounded-full" />
              <span className="text-primary text-sm font-semibold tracking-widest uppercase">Tentang Kami</span>
            </div>
            <h2 className="text-foreground text-4xl md:text-5xl font-bold tracking-tight">{title}</h2>
            <div className="border-l-4 border-primary pl-6">
              <p className="text-foreground/80 text-lg leading-relaxed">{paragraph1}</p>
            </div>
            <p className="text-foreground/80 text-lg leading-relaxed">{paragraph2}</p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default About;
