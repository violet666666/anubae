import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useContentSettings = (keys: string[]) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (keys.length === 0) { setLoading(false); return; }
    const keyList = keys.join(',');
    supabase
      .from('site_settings')
      .select('key, value')
      .in('key', keys)
      .then(({ data, error }) => {
        if (!error && data) {
          const mapped: Record<string, string> = {};
          data.forEach((row: { key: string; value: string }) => { mapped[row.key] = row.value; });
          setValues(mapped);
        }
        setLoading(false);
      });
  }, [keys.join(',')]);

  return { values, loading };
};
