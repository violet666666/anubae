import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => (
  <>
    <Header />
    <div className="bg-card min-h-screen pt-28 pb-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-foreground text-4xl md:text-5xl font-bold tracking-tight mb-8">Syarat & Ketentuan</h1>
        <p className="text-muted-foreground text-sm mb-12">Berlaku sejak: 15 Januari 2024</p>

        <div className="space-y-10 text-foreground/90 text-lg leading-relaxed">
          <section>
            <h2 className="text-foreground text-2xl font-semibold mb-4">1. Penerimaan Syarat</h2>
            <p>
              Dengan mengakses dan menggunakan situs web Anubae Organizer serta memesan layanan kami,
              Anda setuju untuk terikat dengan Syarat & Ketentuan ini. Jika Anda tidak setuju, mohon untuk
              tidak menggunakan layanan kami.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-2xl font-semibold mb-4">2. Pemesanan Layanan</h2>
            <p>
              Pemesanan layanan Anubae Organizer bergantung pada ketersediaan. Setelah pembayaran berhasil,
              Anda akan menerima konfirmasi melalui email dengan detail layanan dan jadwal. Kami menyarankan
              untuk melakukan pemesanan minimal 3 bulan sebelum tanggal acara.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-2xl font-semibold mb-4">3. Ketentuan Pembayaran</h2>
            <p>
              Semua harga tercantum dalam Rupiah (IDR). Pembayaran DP minimal 30% diperlukan untuk konfirmasi
              pemesanan. Pelunasan dilakukan paling lambat 14 hari sebelum hari-H. Kami menerima transfer bank,
              kartu kredit, dan pembayaran digital.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-2xl font-semibold mb-4">4. Perubahan & Penyesuaian</h2>
            <p>
              Perubahan minor pada konsep atau detail acara dapat dilakukan hingga 30 hari sebelum hari-H
              tanpa biaya tambahan. Perubahan besar setelah periode tersebut dapat dikenakan biaya penyesuaian
              tergantung pada skala perubahan.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-2xl font-semibold mb-4">5. Tanggung Jawab</h2>
            <p>
              Anubae Organizer bertanggung jawab atas perencanaan dan koordinasi acara sesuai dengan kesepakatan.
              Kami tidak bertanggung jawab atas kerusakan atau kehilangan barang pribadi selama acara. Force
              majeure seperti bencana alam atau pandemi akan ditangani sesuai kebijakan khusus.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-2xl font-semibold mb-4">6. Hak Kekayaan Intelektual</h2>
            <p>
              Seluruh konsep desain, layout, dan materi kreatif yang dibuat oleh Anubae Organizer adalah
              hak kekayaan intelektual kami. Klien tidak diperkenankan mendistribusikan atau mereproduksi
              materi tersebut tanpa izin tertulis.
            </p>
          </section>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

export default TermsOfService;
