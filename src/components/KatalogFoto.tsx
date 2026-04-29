import FadeInSection from "./FadeInSection";
import { useGalleryMedia } from "@/hooks/useGalleryMedia";

const KatalogFoto = () => {
  const { images, loading } = useGalleryMedia();

  return (
    <section id="katalog-foto" className="bg-background py-24 px-4 md:px-8">
      <FadeInSection>
        <div className="text-center mb-16">
          <h2 className="inline-block text-foreground text-4xl md:text-5xl font-bold tracking-tight pb-3 border-b-4 border-primary">
            Katalog Foto
          </h2>
          <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto">
            Dokumentasi foto acara-acara terbaik yang telah kami tangani
          </p>
        </div>
      </FadeInSection>

      {loading ? (
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-xl animate-pulse" style={{ backgroundColor: '#1a1a1a' }} />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">Belum ada foto.</p>
          <p className="text-muted-foreground/70 text-sm mt-2">Pantau terus ya!</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((img, i) => (
            <FadeInSection key={img.id} delay={i * 60}>
              <div className="relative overflow-hidden rounded-xl group aspect-square border border-border">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-foreground text-sm font-semibold">{img.caption}</p>
                  <p className="text-primary text-xs mt-1">{img.course}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      )}
    </section>
  );
};

export default KatalogFoto;
