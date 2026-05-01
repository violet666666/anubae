import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import FadeInSection from "./FadeInSection";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";
import { toast } from "@/hooks/use-toast";

const SERVICES = ["Wedding", "Live Cam", "Videotron", "Multimedia", "Lainnya"];

const ContactForm = () => {
  const { settings } = useSiteSettings();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    setSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: name.trim(),
      phone: phone.trim(),
      service: service || null,
      message: message.trim(),
    });
    setSubmitting(false);
    if (error) {
      toast({ title: 'Gagal mengirim pesan', description: 'Terjadi kesalahan. Silakan coba lagi.', variant: 'destructive' });
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="bg-muted py-24 px-4 md:px-8">
        <FadeInSection>
          <div className="max-w-xl mx-auto text-center">
            <CheckCircle size={48} className="mx-auto mb-4 text-primary" />
            <h2 className="text-foreground text-2xl font-bold mb-2">Pesan Terkirim!</h2>
            <p className="text-muted-foreground text-lg mb-6">
              Terima kasih telah menghubungi kami. Tim kami akan segera menghubungi Anda.
            </p>
            <button
              onClick={() => { setSubmitted(false); setName(""); setPhone(""); setService(""); setMessage(""); }}
              className="px-6 py-3 rounded-lg border border-primary text-primary font-bold hover:bg-primary/10 transition-all"
            >
              Kirim Pesan Lagi
            </button>
          </div>
        </FadeInSection>
      </section>
    );
  }

  return (
    <section id="kontak" className="bg-muted py-24 px-4 md:px-8">
      <div className="max-w-xl mx-auto">
        <FadeInSection>
          <div className="text-center mb-10">
            <h2 className="text-foreground text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Hubungi Kami
            </h2>
            <p className="text-muted-foreground text-lg">
              Punya pertanyaan atau ingin konsultasi? Kirim pesan dan kami akan segera merespons.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={100}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-foreground text-sm font-medium mb-1.5">Nama Lengkap</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-foreground text-sm font-medium mb-1.5">Nomor WhatsApp</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-foreground text-sm font-medium mb-1.5">Layanan yang Diminati</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:border-primary focus:outline-none transition-colors"
              >
                <option value="">Pilih layanan (opsional)</option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-foreground text-sm font-medium mb-1.5">Pesan</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis pesan Anda di sini…"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors resize-vertical"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/80 transition-all disabled:opacity-60"
            >
              <Send size={18} />
              {submitting ? "Mengirim…" : "Kirim Pesan"}
            </button>
          </form>
        </FadeInSection>
      </div>
    </section>
  );
};

export default ContactForm;
