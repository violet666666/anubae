import FadeInSection from "./FadeInSection";

const testimonials = [
  { quote: "ACARA PERNIKAHAN KAMI SEMPURNA", author: "Rina & Budi", context: "Wedding organizer terbaik yang pernah kami gunakan", photo: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" },
  { quote: "PROFESIONAL DAN SANGAT DETAIL", author: "Dewi Lestari", context: "Acara ulang tahun anak kami berjalan lancar berkat Anubae", photo: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" },
  { quote: "MELEBIHI EKSPEKTASI KAMI", author: "Hendra Wijaya", context: "Gala dinner perusahaan yang sangat berkesan", photo: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" },
  { quote: "TIM YANG KREATIF DAN RESPONSIF", author: "Sari Putri", context: "Konsep pesta yang unik dan berbeda dari yang lain", photo: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" },
  { quote: "PELAYANAN LUAR BIASA", author: "Agus Prasetyo", context: "Seminar kantor kami terorganisir dengan sangat baik", photo: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" },
  { quote: "SANGAT DIREKOMENDASIKAN", author: "Maya Anggraini", context: "Sudah 3x menggunakan jasa Anubae, selalu puas", photo: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" },
];

const TestimonialCard = ({ t }: { t: typeof testimonials[number] }) => (
  <article className="bg-background/30 backdrop-blur-sm p-10 rounded-2xl border border-foreground/10 min-w-[340px] max-w-[400px] flex-shrink-0 relative">
    <span className="absolute -top-4 left-8 text-foreground/20 text-7xl font-serif leading-none select-none">"</span>
    <p className="text-foreground text-2xl font-bold tracking-tight mb-6 leading-tight relative z-10">
      "{t.quote}"
    </p>
    <div className="flex items-center gap-3">
      <img
        src={t.photo}
        alt={t.author}
        className="w-10 h-10 rounded-full object-cover"
        loading="lazy"
      />
      <div>
        <p className="text-foreground text-sm font-medium tracking-wider">{t.author}</p>
        <p className="text-foreground/50 text-xs mt-0.5 italic">{t.context}</p>
      </div>
    </div>
  </article>
);

const Testimonials = () => (
  <section className="bg-muted py-24 overflow-hidden">
    <FadeInSection>
      <div className="text-center mb-16 px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-1 bg-primary rounded-full" />
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Testimoni</span>
          <div className="w-8 h-1 bg-primary rounded-full" />
        </div>
        <h2 className="text-foreground text-4xl md:text-5xl font-bold tracking-tight">Apa Kata Klien Kami</h2>
      </div>
    </FadeInSection>

    <div className="relative overflow-hidden">
      <div className="flex gap-8 animate-marquee w-max">
        {[...testimonials, ...testimonials].map((t, i) => (
          <TestimonialCard key={`${t.author}-${i}`} t={t} />
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
