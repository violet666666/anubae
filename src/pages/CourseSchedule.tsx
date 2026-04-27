import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Building, PartyPopper, Crown, Gem, Star } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useWATemplates } from "@/hooks/useWATemplates";

const packages = [
  {
    icon: Heart,
    title: "Paket Pernikahan Silver",
    price: "Rp 25.000.000",
    includes: ["Koordinasi hari-H", "Dekorasi standar", "MC profesional", "Sound system", "Dokumentasi foto"],
    description: "Paket pernikahan dasar untuk pasangan yang menginginkan perayaan sederhana namun berkesan.",
  },
  {
    icon: Crown,
    title: "Paket Pernikahan Gold",
    price: "Rp 50.000.000",
    includes: ["Semua fitur Silver", "Dekorasi premium", "Katering 300 porsi", "Entertainment live band", "Dokumentasi foto & video", "Photobooth"],
    description: "Paket lengkap untuk pernikahan impian dengan dekorasi premium dan entertainment berkualitas.",
  },
  {
    icon: Gem,
    title: "Paket Pernikahan Platinum",
    price: "Rp 100.000.000",
    includes: ["Semua fitur Gold", "Dekorasi mewah custom", "Katering 500 porsi", "Bridal & groom preparation", "Pre-wedding shoot", "Honeymoon arrangement"],
    description: "Paket pernikahan terlengkap dengan layanan eksklusif dari awal hingga akhir.",
  },
  {
    icon: Building,
    title: "Paket Corporate Event",
    price: "Mulai Rp 15.000.000",
    includes: ["Perencanaan konsep", "Setup panggung & backdrop", "Sound & lighting", "Registrasi peserta", "Koordinasi acara"],
    description: "Untuk seminar, workshop, peluncuran produk, dan acara perusahaan lainnya.",
  },
  {
    icon: PartyPopper,
    title: "Paket Ulang Tahun & Party",
    price: "Mulai Rp 8.000.000",
    includes: ["Konsep tema", "Dekorasi tematik", "MC & games", "Kue ulang tahun", "Goodie bag"],
    description: "Pesta ulang tahun, anniversary, atau gathering dengan konsep unik dan menyenangkan.",
  },
  {
    icon: Star,
    title: "Paket Custom",
    price: "Hubungi Kami",
    includes: ["Konsultasi gratis", "Konsep disesuaikan", "Budget fleksibel", "Layanan à la carte", "Dukungan penuh"],
    description: "Buat paket sendiri sesuai kebutuhan dan anggaran Anda. Kami siap membantu.",
  },
];

const CourseSchedule = () => {
  const { settings } = useSiteSettings();
  const templates = useWATemplates();
  const handleConsult = () => {
    const url = `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(templates.konsultasi ?? "")}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Header />
      <div className="bg-card min-h-screen pt-28 pb-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-foreground text-4xl md:text-5xl font-bold tracking-tight mb-4">Paket Layanan</h1>
          <p className="text-muted-foreground text-xl mb-16">Pilih paket yang sesuai dengan kebutuhan acara Anda</p>

          <div className="space-y-8">
            {packages.map((pkg) => (
              <div key={pkg.title} className="bg-muted rounded-2xl p-6 md:p-8 border border-border hover:border-primary/40 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                      <pkg.icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                      <h2 className="text-foreground text-xl font-semibold">{pkg.title}</h2>
                      <span className="text-primary text-2xl font-bold">{pkg.price}</span>
                    </div>
                    <p className="text-muted-foreground mb-4">{pkg.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {pkg.includes.map((item) => (
                        <span key={item} className="bg-background px-3 py-1.5 rounded-full text-foreground/80 border border-border text-sm">
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 bg-background rounded-2xl p-8 md:p-12 text-center border border-border">
            <h2 className="text-foreground text-3xl font-bold mb-4">Siap mewujudkan acara impian Anda?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Konsultasikan kebutuhan acara Anda secara gratis. Tim kami siap membantu merencanakan
              momen spesial yang tak terlupakan untuk Anda.
            </p>
            <button
              onClick={handleConsult}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 text-lg"
            >
              KONSULTASI GRATIS
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseSchedule;
