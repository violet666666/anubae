const Hero = () => (
  <section
    className="min-h-screen relative overflow-hidden flex items-center justify-center bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/hero.png')" }}
  >
    <div className="absolute inset-0 bg-black/55 z-0" />

    <img
      src="https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800"
      alt="Dekorasi pernikahan elegan dengan bunga"
      className="absolute top-24 right-4 md:right-10 w-60 md:w-96 h-40 md:h-64 object-cover rounded-2xl opacity-80 hover:opacity-100 transition-all duration-500 rotate-2 hover:rotate-0 z-10"
    />

    <img
      src="https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800"
      alt="Setup acara corporate profesional"
      className="absolute bottom-20 left-4 md:left-10 w-52 md:w-80 h-64 md:h-96 object-cover rounded-2xl opacity-80 hover:opacity-100 transition-all duration-500 -rotate-2 hover:rotate-0 z-10"
    />

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
