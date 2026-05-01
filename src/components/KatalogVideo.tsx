import { useState } from "react";
import { X } from "lucide-react";
import FadeInSection from "./FadeInSection";
import { useGalleryMedia } from "@/contexts/GalleryMediaContext";
import { useContentSettings } from "@/hooks/useContentSettings";
import type { MediaItem } from "@/contexts/GalleryMediaContext";

const DEFAULT_TITLE = "Katalog Video";
const DEFAULT_DESC = "Highlight video sinematik dari setiap momen istimewa yang kami abadikan";

const KatalogVideo = () => {
  const { videos, loading } = useGalleryMedia();
  const { values } = useContentSettings(["katalog_video_title", "katalog_video_desc"]);
  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);

  const title = values.katalog_video_title || DEFAULT_TITLE;
  const desc = values.katalog_video_desc || DEFAULT_DESC;

  if (!loading && videos.length === 0) return null;

  return (
    <section id="katalog-video" className="bg-card py-24 px-4 md:px-8">
      <FadeInSection>
        <div className="text-center mb-16">
          <h2 className="inline-block text-foreground text-4xl md:text-5xl font-bold tracking-tight pb-3 border-b-4 border-primary">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto">{desc}</p>
        </div>
      </FadeInSection>

      {loading ? (
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-video rounded-xl animate-pulse" style={{ backgroundColor: '#1a1a1a' }} />
          ))}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <FadeInSection key={video.id} delay={i * 80}>
              <button
                type="button"
                onClick={() => setActiveVideo(video)}
                className="relative overflow-hidden rounded-xl group aspect-video border border-border w-full text-left cursor-pointer block"
              >
                <video
                  src={video.file_url}
                  poster={video.thumbnail_url || undefined}
                  muted
                  preload="metadata"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                />
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-all duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-primary-foreground ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/95 to-transparent">
                  <p className="text-foreground text-sm font-semibold">{video.title || 'Untitled'}</p>
                  {video.category && <p className="text-primary text-xs mt-0.5">{video.category}</p>}
                </div>
              </button>
            </FadeInSection>
          ))}
        </div>
      )}

      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div onClick={(e) => e.stopPropagation()} className="max-w-[90vw] max-h-[90vh]">
            <video
              src={activeVideo.file_url}
              controls
              autoPlay
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default KatalogVideo;
