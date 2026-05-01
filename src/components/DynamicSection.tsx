import FadeInSection from "./FadeInSection";

type DynamicSectionData = {
  id: string;
  title: string;
  content: string;
  layout_type: string;
  image_url: string | null;
  background: string;
};

const bgMap: Record<string, string> = {
  default: "bg-background",
  dark: "bg-[#0a0a0a]",
  primary: "bg-[rgba(128,240,255,0.05)]",
  muted: "bg-muted",
};

const DynamicSection = ({ section }: { section: DynamicSectionData }) => {
  const { title, content, layout_type, image_url, background } = section;
  const bg = bgMap[background] || bgMap.default;

  if (layout_type === "full-banner" && image_url) {
    return (
      <section className="relative py-24 px-4 md:px-8 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${image_url}')` }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeInSection>
            <h2 className="text-foreground text-4xl md:text-5xl font-bold tracking-tight mb-6">{title}</h2>
            <div className="text-foreground/80 text-lg leading-relaxed whitespace-pre-line">{content}</div>
          </FadeInSection>
        </div>
      </section>
    );
  }

  if (layout_type === "text-image-left" && image_url) {
    return (
      <section className={`${bg} py-24 px-4 md:px-8`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <FadeInSection>
            <img src={image_url} alt={title} className="w-full h-[400px] object-cover rounded-2xl" />
          </FadeInSection>
          <FadeInSection delay={150}>
            <div>
              <h2 className="text-foreground text-4xl md:text-5xl font-bold tracking-tight mb-6">{title}</h2>
              <div className="text-foreground/80 text-lg leading-relaxed whitespace-pre-line">{content}</div>
            </div>
          </FadeInSection>
        </div>
      </section>
    );
  }

  if (layout_type === "text-image-right" && image_url) {
    return (
      <section className={`${bg} py-24 px-4 md:px-8`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <FadeInSection>
            <div>
              <h2 className="text-foreground text-4xl md:text-5xl font-bold tracking-tight mb-6">{title}</h2>
              <div className="text-foreground/80 text-lg leading-relaxed whitespace-pre-line">{content}</div>
            </div>
          </FadeInSection>
          <FadeInSection delay={150}>
            <img src={image_url} alt={title} className="w-full h-[400px] object-cover rounded-2xl" />
          </FadeInSection>
        </div>
      </section>
    );
  }

  // text-only (default)
  return (
    <section className={`${bg} py-24 px-4 md:px-8`}>
      <div className="max-w-3xl mx-auto text-center">
        <FadeInSection>
          <h2 className="text-foreground text-4xl md:text-5xl font-bold tracking-tight mb-6">{title}</h2>
          <div className="text-foreground/80 text-lg leading-relaxed whitespace-pre-line">{content}</div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default DynamicSection;
