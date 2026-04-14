import FadeInSection from "./FadeInSection";

const images = [
  { src: "https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Dekorasi pernikahan mewah", label: "Pernikahan" },
  { src: "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Acara seminar perusahaan", label: "Corporate" },
  { src: "https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Dekorasi pesta ulang tahun", label: "Ulang Tahun" },
  { src: "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Setup meja gala dinner", label: "Gala Dinner" },
  { src: "https://images.pexels.com/photos/2291462/pexels-photo-2291462.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Acara outdoor gathering", label: "Garden Party" },
  { src: "https://images.pexels.com/photos/3171770/pexels-photo-3171770.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Pesta perayaan meriah", label: "Perayaan" },
];

const CaptureWithUs = () => (
  <section className="bg-background py-24 px-4 md:px-8">
    <FadeInSection>
      <h2 className="text-center text-foreground text-5xl md:text-6xl font-bold tracking-tight mb-16">
        PORTFOLIO ACARA KAMI
      </h2>
    </FadeInSection>
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
      {images.map((img, i) => (
        <FadeInSection key={img.alt} delay={i * 80}>
          <div className="relative overflow-hidden rounded-xl group h-80">
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-5 left-5 text-foreground text-sm font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {img.label}
            </span>
          </div>
        </FadeInSection>
      ))}
    </div>
  </section>
);

export default CaptureWithUs;
