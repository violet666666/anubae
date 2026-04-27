import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

type MediaItem = {
  id: string;
  title: string | null;
  category: string | null;
  media_type: string | null;
  file_url: string;
  thumbnail_url: string | null;
};

const FILTERS = [
  { key: "semua", label: "Semua" },
  { key: "wedding", label: "Wedding" },
  { key: "multimedia", label: "Multimedia" },
  { key: "videotron", label: "Videotron" },
  { key: "lainnya", label: "Lainnya" },
];

const GalleryIndex = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("semua");
  const [lightbox, setLightbox] = useState<MediaItem | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      const { data, error } = await supabase
        .from("gallery_media")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (!error && data) setMedia(data as MediaItem[]);
      setLoading(false);
    };
    fetchMedia();
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  const filtered =
    activeFilter === "semua"
      ? media
      : media.filter((m) => m.category === activeFilter);

  return (
    <>
      <Header />
      <div className="bg-card min-h-screen pt-28 pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-foreground text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Portofolio Acara
          </h1>
          <p className="text-muted-foreground text-xl mb-10">
            Dokumentasi acara-acara yang telah kami tangani — bukti dedikasi kami dalam mewujudkan momen spesial.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-6 mb-10 border-b border-white/10">
            {FILTERS.map((f) => {
              const isActive = activeFilter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className="pb-3 text-sm md:text-base font-medium transition-colors"
                  style={{
                    color: isActive ? "#80f0ff" : "#666",
                    borderBottom: isActive ? "2px solid #80f0ff" : "2px solid transparent",
                    marginBottom: "-1px",
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Loading state */}
          {loading && (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="break-inside-avoid rounded-xl animate-pulse aspect-[3/4]"
                  style={{ backgroundColor: "#1a1a1a" }}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-lg">
                Belum ada foto atau video di kategori ini.
              </p>
              <p className="text-muted-foreground/70 text-sm mt-2">Pantau terus ya!</p>
            </div>
          )}

          {/* Masonry grid */}
          {!loading && filtered.length > 0 && (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {filtered.map((item) => {
                const isVideo = item.media_type === "video";
                const displaySrc = isVideo ? item.thumbnail_url || item.file_url : item.file_url;
                return (
                  <button
                    key={item.id}
                    onClick={() => setLightbox(item)}
                    className="break-inside-avoid group cursor-pointer relative block w-full text-left"
                  >
                    <div className="relative">
                      <img
                        src={displaySrc}
                        alt={item.title || "Gallery media"}
                        loading="lazy"
                        className="w-full rounded-xl"
                      />
                      {isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                            <Play className="w-7 h-7 text-white ml-1" fill="currentColor" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 rounded-xl transition-all flex items-end">
                      <div className="p-5 opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.title && (
                          <p className="text-foreground font-semibold text-lg">{item.title}</p>
                        )}
                        {item.category && (
                          <span
                            className="inline-block mt-2 px-2 py-1 rounded text-xs"
                            style={{
                              backgroundColor: "rgba(128,240,255,0.15)",
                              color: "#80f0ff",
                            }}
                          >
                            {item.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div onClick={(e) => e.stopPropagation()} className="max-w-[90vw] max-h-[90vh]">
            {lightbox.media_type === "video" ? (
              <video
                src={lightbox.file_url}
                controls
                autoPlay
                className="max-h-[90vh] max-w-[90vw] object-contain"
              />
            ) : (
              <img
                src={lightbox.file_url}
                alt={lightbox.title || "Gallery media"}
                className="max-h-[90vh] max-w-[90vw] object-contain"
              />
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default GalleryIndex;
