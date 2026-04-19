const Hero = () => (
  <section
    className="min-h-screen relative overflow-hidden flex items-center justify-center bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/hero.png')" }}
  >
    <div className="absolute inset-0 bg-black/55 z-0" />

    <div className="relative z-20 text-center">
      <h1>
        <span className="block text-foreground text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-2">
          Anubae
        </span>
        <span className="block text-foreground text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight">
          Organizer
        </span>
      </h1>
      <p className="text-foreground/80 text-xl md:text-2xl mt-6 tracking-wide">
        Wujudkan acara impian Anda bersama kami
      </p>
    </div>
  </section>
);

export default Hero;
