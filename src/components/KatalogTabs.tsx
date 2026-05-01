import { useEffect, useState } from "react";
import { useContentSettings } from "@/hooks/useContentSettings";

const DEFAULT_TITLE = "Portofolio Kami";

const tabs = [
  { id: "katalog-foto", label: "Foto", icon: "📷" },
  { id: "katalog-video", label: "Video", icon: "🎬" },
] as const;

const KatalogTabs = () => {
  const { values } = useContentSettings(["katalog_title"]);
  const title = values.katalog_title || DEFAULT_TITLE;
  const [active, setActive] = useState<string>("katalog-foto");

  useEffect(() => {
    const observers = tabs.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const handleClick = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="portofolio" className="bg-background pt-24 pb-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        <h2 className="text-foreground text-3xl md:text-4xl font-bold tracking-tight text-center">
          {title}
        </h2>
        <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-muted border border-border">
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleClick(tab.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-foreground border border-primary hover:bg-primary/10"
                }`}
                aria-pressed={isActive}
              >
                <span className="mr-1.5">{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KatalogTabs;
