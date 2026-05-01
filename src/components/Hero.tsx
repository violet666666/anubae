import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useContentSettings } from "@/hooks/useContentSettings";

const DEFAULT_WORDS = ["Wedding Impian", "Momen Istimewa", "Kenangan Abadi", "Acara Profesional", "Hari Spesialmu"];
const DEFAULT_TAGLINE = "Wujudkan acara impian Anda bersama kami";

const Hero = () => {
  const { values, loading } = useContentSettings(["hero_bg_image", "hero_tagline"]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const bgImage = values.hero_bg_image || "/hero.png";
  const tagline = values.hero_tagline || DEFAULT_TAGLINE;

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % DEFAULT_WORDS.length);
        setIsVisible(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const baseAnim = {
    animationFillMode: "both" as const,
    animationDuration: "0.8s",
    animationName: "heroFadeUp",
    animationTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
  };

  return (
    <section
      className="min-h-screen relative overflow-hidden flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${bgImage}')` }}
    >
      <div className="absolute inset-0 bg-black/55 z-0" />

      <div className="relative z-20 text-center px-4">
        <h1
          className="hero-fade-up"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            animationDelay: "0.1s",
            ...baseAnim,
          }}
        >
          <span className="block text-foreground text-6xl md:text-8xl lg:text-9xl tracking-tight mb-2">
            Anubae
          </span>
          <span className="block text-foreground text-6xl md:text-8xl lg:text-9xl tracking-tight">
            Organizer
          </span>
        </h1>

        {/* Rotating tagline */}
        <div
          className="hero-fade-up mt-8 h-10 md:h-12 flex items-center justify-center"
          style={{ animationDelay: "0.35s", ...baseAnim }}
        >
          <span
            className="text-primary text-2xl md:text-3xl tracking-wide transition-all duration-400"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 400ms ease, transform 400ms ease",
            }}
          >
            {DEFAULT_WORDS[currentIndex]}
          </span>
        </div>

        <p
          className="hero-fade-up text-foreground/80 text-xl md:text-2xl mt-6 tracking-wide"
          style={{ animationDelay: "0.5s", ...baseAnim }}
        >
          {tagline}
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          animation: "heroBounce 1.8s ease-in-out infinite",
        }}
      >
        <ChevronDown size={28} color="rgba(255,255,255,0.5)" />
      </div>
    </section>
  );
};

export default Hero;
