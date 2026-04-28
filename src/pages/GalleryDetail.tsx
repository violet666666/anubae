import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
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
  created_at: string;
};

const GalleryDetail = () => {
  const { id } = useParams();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      const { data, error } = await supabase
        .from("gallery_media")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (!error && data) setItems(data as MediaItem[]);
      setLoading(false);
    };
    fetchMedia();
  }, []);

  const index = items.findIndex((item) => item.id === id);
  const item = index !== -1 ? items[index] : null;
  const prev = index > 0 ? items[index - 1] : null;
  const next = index < items.length - 1 ? items[index + 1] : null;

  if (loading) {
    return (
      <>
        <Header />
        <div className="bg-card min-h-screen pt-28 pb-24 px-4 md:px-8">
          <div className="max-w-6xl mx-auto text-center py-24">
            <p className="text-muted-foreground text-lg">Memuat...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!item) return <Navigate to="/gallery" replace />;

  const formattedDate = new Date(item.created_at).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Header />
      <div className="bg-card min-h-screen pt-28 pb-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Portofolio
          </Link>

          <div className="grid lg:grid-cols-5 gap-10 md:gap-16">
            <div className="lg:col-span-3">
              {item.media_type === "video" ? (
                <video
                  src={item.file_url}
                  controls
                  className="w-full rounded-2xl"
                  poster={item.thumbnail_url || undefined}
                />
              ) : (
                <img
                  src={item.file_url}
                  alt={item.title || "Gallery media"}
                  className="w-full rounded-2xl"
                />
              )}
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-foreground text-3xl md:text-4xl font-bold tracking-tight mb-2">
                  {item.title || "Untitled"}
                </h1>
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

              <div className="bg-muted rounded-xl p-6 space-y-4 border border-border">
                <h3 className="text-foreground font-semibold text-sm tracking-wider uppercase">Detail</h3>
                <div className="space-y-3 text-sm text-foreground/80">
                  <p>{formattedDate}</p>
                  <p>Tipe: {item.media_type === "video" ? "Video" : "Foto"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-16 pt-8 border-t border-border">
            {prev ? (
              <Link
                to={`/gallery/${prev.id}`}
                className="flex items-center gap-3 group"
              >
                <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Sebelumnya</p>
                  <p className="text-foreground font-medium group-hover:text-primary transition-colors">{prev.title || "Untitled"}</p>
                </div>
              </Link>
            ) : <div />}

            {next ? (
              <Link
                to={`/gallery/${next.id}`}
                className="flex items-center gap-3 text-right group"
              >
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Selanjutnya</p>
                  <p className="text-foreground font-medium group-hover:text-primary transition-colors">{next.title || "Untitled"}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GalleryDetail;
