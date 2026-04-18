import { useEffect, useRef, ReactNode } from "react";

const FadeInSection = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.classList.remove("opacity-0", "translate-y-10");
      el.classList.add("opacity-100", "translate-y-0");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("opacity-100", "translate-y-0");
            el.classList.remove("opacity-0", "translate-y-10");
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-10 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
