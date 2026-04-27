import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Templates = Record<string, string>;

const DEFAULT_TEMPLATES: Templates = {
  wedding_basic:   'Halo Anubae Organizer 👋, saya tertarik dengan *Basic Package Wedding* (Rp 3.999.999). Boleh saya tahu informasi lebih lanjut?',
  wedding_premium: 'Halo Anubae Organizer 👋, saya tertarik dengan *Premium Package Wedding* (Rp 4.999.999). Boleh saya tahu informasi lebih lanjut?',
  wedding_luxury:  'Halo Anubae Organizer 👋, saya tertarik dengan *Luxury Package Wedding* (Rp 6.999.999). Boleh saya tahu informasi lebih lanjut?',
  livecam_1cam:    'Halo Anubae Organizer 👋, saya tertarik dengan *Paket Live Cam 1 Kamera* (Rp 1.500.000). Boleh info lebih lanjut?',
  livecam_2cam:    'Halo Anubae Organizer 👋, saya tertarik dengan *Paket Live Cam 2 Kamera* (Rp 2.500.000). Boleh info lebih lanjut?',
  livecam_3cam:    'Halo Anubae Organizer 👋, saya tertarik dengan *Paket Live Cam 3 Kamera* (Rp 3.500.000). Boleh info lebih lanjut?',
  videotron_dalam: 'Halo Anubae Organizer 👋, saya ingin sewa *Videotron dalam kota Makassar*. Boleh info lebih lanjut?',
  videotron_luar:  'Halo Anubae Organizer 👋, saya ingin sewa *Videotron luar kota Makassar*. Boleh info lebih lanjut?',
  konsultasi:      'Halo Anubae Organizer 👋, saya ingin konsultasi gratis untuk acara saya.',
};

export const useWATemplates = () => {
  const [templates, setTemplates] = useState<Templates>(DEFAULT_TEMPLATES);

  useEffect(() => {
    supabase
      .from("wa_templates")
      .select("id, template")
      .then(({ data }) => {
        if (data) {
          const mapped = data.reduce(
            (acc, row) => ({ ...acc, [row.id]: row.template }),
            {} as Templates
          );
          setTemplates((prev) => ({ ...prev, ...mapped }));
        }
      });
  }, []);

  return templates;
};
