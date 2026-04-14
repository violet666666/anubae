

# Rebranding: Shutter Theory → Anubae Organizer (Event Organizer)

Mengubah seluruh situs dari photography academy menjadi website event organizer **Anubae Organizer** dalam Bahasa Indonesia.

---

## Ringkasan Perubahan

Seluruh konten akan di-rebranding menjadi situs event organizer profesional berbahasa Indonesia. Tema warna tetap dipertahankan (hitam, putih, amber/emas) karena cocok untuk bisnis event organizer yang elegan.

---

## Detail Teknis

### 1. index.html — Meta tags & SEO
- Title → "Anubae Organizer | Jasa Event Organizer Profesional"
- Meta description → deskripsi event organizer dalam Bahasa Indonesia
- OG tags disesuaikan

### 2. Header.tsx — Navigasi
- Logo text: "ANUBAE ORGANIZER"
- Nav links: "TENTANG KAMI", "LAYANAN", "PORTOFOLIO"
- CTA button: "KONSULTASI GRATIS"
- Link href disesuaikan (#tentang, #layanan, #portofolio)

### 3. Hero.tsx — Hero section
- Headline: "Anubae" / "Organizer"
- Sub-text: "Wujudkan acara impian Anda bersama kami"
- Gambar hero diganti dengan foto event/dekorasi dari Pexels (menggunakan URL langsung)

### 4. About.tsx — Tentang Kami
- id → "tentang"
- Konten tentang Anubae Organizer — pengalaman, visi, tim
- Gambar instruktur diganti dengan foto event planner/team

### 5. Courses.tsx → Services.tsx — Layanan
- id → "layanan"
- 3 layanan utama:
  - **Wedding Organizer** — perencanaan pernikahan lengkap
  - **Corporate Event** — seminar, gala dinner, peluncuran produk
  - **Private Party** — ulang tahun, anniversary, gathering
- Icon disesuaikan (Heart, Building, PartyPopper dari lucide)

### 6. Testimonials.tsx — Testimoni
- Heading → "Apa Kata Klien Kami"
- Testimoni dalam Bahasa Indonesia dengan nama-nama lokal

### 7. CaptureWithUs.tsx → EventShowcase.tsx
- Heading → "PORTFOLIO ACARA KAMI"
- Label & alt text diganti ke konteks event (Pernikahan, Corporate, dll)

### 8. Gallery.tsx — Galeri
- Heading → "PORTOFOLIO"
- id → "portofolio"
- Button text → "Lihat semua portofolio"

### 9. Footer.tsx
- Brand → "ANUBAE ORGANIZER"
- Tagline → "Mewujudkan momen tak terlupakan untuk setiap acara Anda"
- Kontak: email, telepon, alamat (contoh Indonesia)
- Social link Instagram → @anubae.organizer
- Quick links dalam Bahasa Indonesia
- Copyright → Anubae Organizer

### 10. CourseSchedule.tsx → Halaman Paket Layanan
- Rename route: /course-schedule → /paket-layanan
- Konten diubah menjadi daftar paket layanan event organizer dengan harga contoh dalam Rupiah

### 11. Halaman Legal (Privacy, Terms, Refund)
- Teks diubah ke Bahasa Indonesia, brand diganti Anubae Organizer

### 12. galleryData.ts
- Caption dan alt text diterjemahkan ke konteks event

### 13. Gambar
- Hero images dan section images akan menggunakan gambar dari Pexels/Unsplash via URL (event, wedding, dekorasi)
- Asset import paths disesuaikan atau diganti dengan URL langsung

---

## Yang Tidak Berubah
- Struktur komponen & arsitektur tetap sama
- Sistem warna (hitam, amber, putih) tetap dipertahankan — cocok untuk event organizer elegan
- Animasi & layout dipertahankan
- Gallery system tetap berfungsi sama

