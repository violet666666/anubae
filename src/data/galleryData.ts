import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import g7 from "@/assets/gallery-7.jpg";
import g8 from "@/assets/gallery-8.jpg";
import g9 from "@/assets/gallery-9.jpg";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  student: string;
  course: string;
  camera: string;
  settings: string;
  description: string;
  date: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "pernikahan-garden",
    src: g1,
    alt: "Dekorasi pernikahan garden party",
    caption: "Pernikahan Garden Party",
    student: "Rina & Budi Santoso",
    course: "Wedding Organizer",
    camera: "Venue: The Garden Hall, Jakarta",
    settings: "150 tamu · Tema rustic garden",
    description: "Pernikahan outdoor yang romantis dengan konsep garden party. Dekorasi bunga segar, pencahayaan hangat, dan suasana alami menciptakan momen indah yang tak terlupakan bagi pasangan dan seluruh tamu undangan.",
    date: "14 Oktober 2023",
  },
  {
    id: "gala-dinner-corporate",
    src: g2,
    alt: "Gala dinner perusahaan dengan dekorasi mewah",
    caption: "Gala Dinner Corporate",
    student: "PT Maju Bersama",
    course: "Corporate Event",
    camera: "Venue: Grand Ballroom, Hotel Mulia",
    settings: "300 tamu · Tema black & gold",
    description: "Gala dinner tahunan perusahaan dengan konsep elegan black & gold. Panggung utama, entertainment, dan pengaturan meja yang sempurna menciptakan malam yang berkesan bagi seluruh karyawan dan tamu undangan.",
    date: "2 November 2023",
  },
  {
    id: "ulang-tahun-anak",
    src: g3,
    alt: "Pesta ulang tahun anak dengan dekorasi warna-warni",
    caption: "Ulang Tahun Anak",
    student: "Keluarga Wijaya",
    course: "Private Party",
    camera: "Venue: Rumah Klien, BSD",
    settings: "50 tamu · Tema superhero",
    description: "Pesta ulang tahun ke-7 dengan tema superhero yang meriah. Balon warna-warni, games interaktif, dan dekorasi tematik membuat anak-anak dan orang tua sama-sama menikmati perayaan yang menyenangkan.",
    date: "22 September 2023",
  },
  {
    id: "peluncuran-produk",
    src: g4,
    alt: "Acara peluncuran produk baru",
    caption: "Peluncuran Produk",
    student: "Brand Kosmetik Lokal",
    course: "Corporate Event",
    camera: "Venue: Soehanna Hall, Jakarta",
    settings: "200 tamu · Tema minimalis modern",
    description: "Peluncuran produk skincare dengan konsep minimalis modern. Setup panggung yang clean, lighting profesional, dan flow acara yang seamless membuat brand launching ini menjadi highlight di industri kecantikan.",
    date: "18 Agustus 2023",
  },
  {
    id: "pernikahan-adat",
    src: g5,
    alt: "Pernikahan adat Jawa dengan dekorasi tradisional",
    caption: "Pernikahan Adat Jawa",
    student: "Dian & Arief Wicaksono",
    course: "Wedding Organizer",
    camera: "Venue: Gedung Serbaguna, Yogyakarta",
    settings: "500 tamu · Tema adat Jawa",
    description: "Pernikahan adat Jawa yang megah dengan sentuhan modern. Gebyok ukir, dekorasi janur kuning, dan rangkaian upacara adat yang sakral berpadu dengan tata panggung modern untuk menciptakan perayaan yang bermakna.",
    date: "8 Juli 2023",
  },
  {
    id: "anniversary-perusahaan",
    src: g6,
    alt: "Perayaan anniversary perusahaan",
    caption: "Anniversary Perusahaan",
    student: "PT Teknologi Nusantara",
    course: "Corporate Event",
    camera: "Venue: Rooftop Bar, SCBD Jakarta",
    settings: "180 tamu · Tema futuristik",
    description: "Perayaan ulang tahun ke-10 perusahaan dengan tema futuristik. LED wall, hologram display, dan entertainment kelas satu membuat malam anniversary ini menjadi perayaan yang tidak terlupakan.",
    date: "1 Desember 2023",
  },
  {
    id: "seminar-nasional",
    src: g7,
    alt: "Seminar nasional dengan pembicara internasional",
    caption: "Seminar Nasional",
    student: "Asosiasi Pengusaha Muda",
    course: "Corporate Event",
    camera: "Venue: JCC Senayan, Jakarta",
    settings: "1000 peserta · Tema leadership",
    description: "Seminar nasional berskala besar dengan pembicara dari dalam dan luar negeri. Setup auditorium profesional, sistem registrasi digital, dan pengelolaan peserta yang efisien memastikan acara berjalan lancar.",
    date: "15 November 2023",
  },
  {
    id: "bridal-shower",
    src: g8,
    alt: "Bridal shower intimate dengan dekorasi cantik",
    caption: "Bridal Shower",
    student: "Anisa Rahma",
    course: "Private Party",
    camera: "Venue: Cafe & Resto, Kemang",
    settings: "25 tamu · Tema floral pastel",
    description: "Bridal shower intimate dengan konsep floral pastel yang cantik. Dekorasi bunga segar, photobooth corner, dan aktivitas seru membuat calon pengantin dan sahabat-sahabatnya menikmati momen kebersamaan yang hangat.",
    date: "28 Oktober 2023",
  },
  {
    id: "gathering-keluarga",
    src: g9,
    alt: "Family gathering outdoor di villa",
    caption: "Family Gathering",
    student: "Keluarga Besar Sutanto",
    course: "Private Party",
    camera: "Venue: Villa Puncak, Bogor",
    settings: "80 tamu · Tema tropical",
    description: "Family gathering dua hari di villa dengan konsep tropical. Outbound games, BBQ party, dan api unggun malam hari menciptakan pengalaman berkumpul keluarga yang seru dan penuh kehangatan.",
    date: "9 September 2023",
  },
];
