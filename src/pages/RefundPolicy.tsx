import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RefundPolicy = () => (
  <>
    <Header />
    <div className="bg-card min-h-screen pt-28 pb-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-foreground text-4xl md:text-5xl font-bold tracking-tight mb-8">Kebijakan Pengembalian Dana</h1>
        <p className="text-muted-foreground text-sm mb-12">Terakhir diperbarui: 15 Januari 2024</p>

        <div className="space-y-10 text-foreground/90 text-lg leading-relaxed">
          <section>
            <h2 className="text-foreground text-2xl font-semibold mb-4">Komitmen Kami</h2>
            <p>
              Di Anubae Organizer, kami berkomitmen memberikan layanan event organizer terbaik. Kami memahami
              bahwa rencana bisa berubah, dan kami merancang kebijakan pengembalian dana yang adil dan transparan.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-2xl font-semibold mb-4">Pengembalian Penuh (100%)</h2>
            <div className="bg-muted p-6 rounded-xl border border-border">
              <p className="font-semibold text-foreground mb-2">90+ hari sebelum tanggal acara</p>
              <p>
                Batalkan pemesanan minimal 90 hari sebelum acara dan terima pengembalian dana penuh.
                Proses pengembalian membutuhkan 7–14 hari kerja ke metode pembayaran asli.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-foreground text-2xl font-semibold mb-4">Pengembalian Sebagian (50%)</h2>
            <div className="bg-muted p-6 rounded-xl border border-border">
              <p className="font-semibold text-foreground mb-2">30–89 hari sebelum tanggal acara</p>
              <p>
                Pembatalan antara 30 hingga 89 hari sebelum acara berhak atas pengembalian 50%.
                Alternatifnya, Anda dapat memindahkan pemesanan ke tanggal lain tanpa biaya tambahan.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-foreground text-2xl font-semibold mb-4">Tanpa Pengembalian</h2>
            <div className="bg-muted p-6 rounded-xl border border-border">
              <p className="font-semibold text-foreground mb-2">Kurang dari 30 hari sebelum tanggal acara</p>
              <p>
                Pembatalan dalam 30 hari sebelum acara tidak berhak atas pengembalian dana. Namun,
                Anda dapat memindahkan ke tanggal lain (tergantung ketersediaan, maksimal 1x pemindahan).
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-foreground text-2xl font-semibold mb-4">Pembatalan oleh Anubae Organizer</h2>
            <p>
              Dalam keadaan jarang terjadi di mana kami perlu membatalkan layanan karena force majeure,
              Anda akan menerima pengembalian dana penuh atau opsi untuk memindahkan ke tanggal lain.
              Kami akan memberitahu Anda sesegera mungkin.
            </p>
          </section>

          <section>
            <h2 className="text-foreground text-2xl font-semibold mb-4">Cara Mengajukan Pengembalian</h2>
            <p>
              Kirim email ke{" "}
              <a href="mailto:hello@anubaeorganizer.com" className="text-primary hover:text-primary/80 underline">
                hello@anubaeorganizer.com
              </a>{" "}
              dengan nomor konfirmasi pemesanan dan alasan pembatalan. Kami akan merespons dalam 2 hari kerja.
            </p>
          </section>
        </div>
      </div>
    </div>
    <Footer />
  </>
);

export default RefundPolicy;
