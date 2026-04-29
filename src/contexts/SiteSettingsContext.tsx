import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

type SiteSettings = {
  whatsapp_number: string;
  instagram_url: string;
  youtube_url: string;
  maps_url: string;
};

const DEFAULT_SETTINGS: SiteSettings = {
  whatsapp_number: '6281242401771',
  instagram_url: 'https://www.instagram.com/anubae.organizer',
  youtube_url: 'https://www.youtube.com/@Anubaeorganizer/videos',
  maps_url: 'https://maps.app.goo.gl/7yRLUaKsPGzbwHvy8',
};

type SiteSettingsContextType = {
  settings: SiteSettings;
  loading: boolean;
  getWALink: (messageTemplate: string) => string;
};

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: DEFAULT_SETTINGS,
  loading: true,
  getWALink: () => '',
});

export const SiteSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('site_settings').select('key, value');
      if (data) {
        const mapped = data.reduce(
          (acc, row) => ({ ...acc, [row.key]: row.value }),
          {} as Partial<SiteSettings>
        );
        setSettings({ ...DEFAULT_SETTINGS, ...mapped });
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const getWALink = (messageTemplate: string) =>
    `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(messageTemplate)}`;

  return (
    <SiteSettingsContext.Provider value={{ settings, loading, getWALink }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);
