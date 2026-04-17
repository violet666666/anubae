import { Play } from "lucide-react";
import FadeInSection from "./FadeInSection";
import { galleryImages } from "@/data/galleryData";

const videos = galleryImages.slice(0, 6).map((img) => ({
  id: img.id,
  thumbnail: img.src,
  title: img.caption,
  category: img.course,
  duration: "2:45",
}));

const KatalogVideo = () => (
  <section id="katalog-video" className="bg-card py-24 px-4 md:px-8">
    <FadeInSection>
      <div className="text-center mb-16">
        <h2 className="inline-block text-foreground text-4xl md:text-5xl font-bold tracking-tight pb-3 border-b-4 border-primary">
          Katalog Video
        </h2>
        <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto">
          Highlight video sinematik dari setiap momen istimewa yang kami abadikan
        </p>
      </div>
    </FadeInSection>

    <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video, i) => (
        <FadeInSection key={video.id} delay={i * 80}>
          <div className="relative overflow-hidden rounded-xl group aspect-video border border-border cursor-pointer">
            <img
              src={video.thumbnail}
              alt={video.title}
              loading="lazy"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-all duration-300 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
              <span className="text-foreground text-xs font-medium">{video.duration}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/95 to-transparent">
              <p className="text-foreground text-sm font-semibold">{video.title}</p>
              <p className="text-primary text-xs mt-0.5">{video.category}</p>
            </div>
          </div>
        </FadeInSection>
      ))}
    </div>
  </section>
);

export default KatalogVideo;
