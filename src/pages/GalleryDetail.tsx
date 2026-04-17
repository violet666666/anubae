import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin, Clock, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { galleryImages } from "@/data/galleryData";

const GalleryDetail = () => {
  const { id } = useParams();
  const index = galleryImages.findIndex((img) => img.id === id);

  if (index === -1) return <Navigate to="/gallery" replace />;

  const image = galleryImages[index];
  const prev = index > 0 ? galleryImages[index - 1] : null;
  const next = index < galleryImages.length - 1 ? galleryImages[index + 1] : null;

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
              <img
                src={image.src}
                alt={image.alt}
                className="w-full rounded-2xl"
              />
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-foreground text-3xl md:text-4xl font-bold tracking-tight mb-2">
                  {image.caption}
                </h1>
                <p className="text-primary font-medium">{image.student}</p>
              </div>

              <div className="border-l-4 border-primary pl-5">
                <p className="text-muted-foreground text-sm font-medium tracking-wider uppercase">{image.course}</p>
              </div>

              <p className="text-foreground/80 text-lg leading-relaxed">{image.description}</p>

              <div className="bg-muted rounded-xl p-6 space-y-4 border border-border">
                <h3 className="text-foreground font-semibold text-sm tracking-wider uppercase">Detail Acara</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-foreground/80">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{image.camera}</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/80">
                    <Users className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{image.settings}</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/80">
                    <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{image.date}</span>
                  </div>
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
                  <p className="text-foreground font-medium group-hover:text-primary transition-colors">{prev.caption}</p>
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
                  <p className="text-foreground font-medium group-hover:text-primary transition-colors">{next.caption}</p>
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
