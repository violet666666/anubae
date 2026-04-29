import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { useSiteSettings } from "@/contexts/SiteSettingsContext";

const formatPhoneDisplay = (raw: string) => {
  const digits = raw.replace(/\D/g, "");
  const local = digits.startsWith("62") ? digits.slice(2) : digits.replace(/^0/, "");
  const part1 = local.slice(0, 3);
  const part2 = local.slice(3, 7);
  const part3 = local.slice(7);
  return `+62 ${[part1, part2, part3].filter(Boolean).join("-")}`;
};

const PrivacyPolicy = () => {
  const { settings } = useSiteSettings();
  const phoneDisplay = formatPhoneDisplay(settings.whatsapp_number);

  return (
  <>
    <Header />
    <div className="bg-card min-h-screen pt-28 pb-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-foreground text-4xl md:text-5xl font-bold tracking-tight mb-8">Kebijakan Privasi</h1>
        <p className="text-muted-foreground text-sm mb-12">Terakhir diperbarui: 15 Januari 2024</p>

        <div className="space-y-10 text-foreground/90 text-lg leading-relaxed">
          <section>
            <h2 className="text-foreground text-2xl font-semibold mb-4">1. Informasi yang Kami Kumpulkan</h2>
            <p>
              Di Anubae Organizer, kami mengumpulkan informasi yang Anda berikan secara langsung saat
              menghubungi kami, melakukan konsultasi, atau memesan layanan kami. Ini termasuk nama, alamat email,
              nomor telepon, informasi pembayaran, dan detail acara yang Anda rencanakan.
            </p>
            <p className="mt-4">
              Kami juga secara otomatis mengumpulkan informasi tertentu saat Anda mengunjungi situs web kami,
              termasuk alamat IP, jenis browser, informasi perangkat, halaman yang dikunjungi, dan URL perujuk.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-2xl font-semibold mb-4">2. Penggunaan Informasi</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>Memproses pemesanan layanan dan mengelola acara Anda</li>
              <li>Mengirimkan informasi terkait perencanaan dan koordinasi acara</li>
              <li>Berkomunikasi tentang perubahan jadwal, penawaran layanan baru, dan promo</li>
              <li>Memproses pembayaran dan mengirim konfirmasi transaksi</li>
              <li>Meningkatkan situs web, layanan, dan pengalaman klien kami</li>
              <li>Menanggapi pertanyaan dan permintaan konsultasi Anda</li>
            </ul>
          </section>

          <section>
            <h2 className="text-foreground text-2xl font-semibold mb-4">3. Berbagi Informasi</h2>
            <p>
              Kami tidak menjual, memperdagangkan, atau menyewakan informasi pribadi Anda kepada pihak ketiga.
              Kami dapat membagikan informasi Anda dengan penyedia layanan tepercaya yang membantu kami
              mengoperasikan situs web dan memproses pembayaran.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-2xl font-semibold mb-4">4. Dokumentasi Acara</h2>
            <p>
              Foto dan video dokumentasi acara yang kami tangani dapat digunakan untuk portofolio dan
              materi pemasaran kami dengan persetujuan eksplisit dari klien. Anda dapat menarik persetujuan
              ini kapan saja dengan menghubungi kami di hello@anubaeorganizer.com.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-2xl font-semibold mb-4">5. Keamanan Data</h2>
            <p>
              Kami menerapkan langkah-langkah keamanan standar industri untuk melindungi informasi pribadi Anda,
              termasuk enkripsi SSL dan pemrosesan pembayaran yang aman.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-2xl font-semibold mb-4">6. Hubungi Kami</h2>
            <p>
              Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di{" "}
              <a href="mailto:hello@anubaeorganizer.com" className="text-primary hover:text-primary/80 underline">
                hello@anubaeorganizer.com
              </a>{" "}
              atau hubungi {phoneDisplay}.
            </p>
          </section>
        </div>
      </div>
    </div>
    <Footer />
  </>
  );
};

export default PrivacyPolicy;
