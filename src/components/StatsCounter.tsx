import { useEffect, useRef, useState } from "react";
import FadeInSection from "./FadeInSection";

type Stat = { value: number; suffix: string; label: string };

const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Event Sukses" },
  { value: 8, suffix: "+", label: "Tahun Pengalaman" },
  { value: 200, suffix: "+", label: "Klien Puas" },
  { value: 24, suffix: "/7", label: "Siap Melayani" },
];

const DURATION = 1800;

const StatsCounter = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const startedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setCounts(stats.map((s) => s.value));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / DURATION, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - t, 3);
            setCounts(stats.map((s) => Math.round(s.value * eased)));
            if (t < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <FadeInSection>
      <section
        ref={sectionRef}
        className="py-16 px-4"
        style={{ backgroundColor: "#111111" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x divide-[rgba(255,255,255,0.08)]">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center px-4 py-6">
                <div
                  className="text-primary font-bold tabular-nums leading-none"
                  style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
                >
                  {counts[i]}
                  <span>{stat.suffix}</span>
                </div>
                <div
                  className="text-xs md:text-sm mt-2 uppercase tracking-wider"
                  style={{ color: "#999999" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>
  );
};

export default StatsCounter;
