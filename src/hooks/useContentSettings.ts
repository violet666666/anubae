import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useContentSettings = (keys: string[]) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const keysRef = useRef(keys);
  keysRef.current = keys;

  useEffect(() => {
    if (keys.length === 0) { setLoading(false); return; }
    let cancelled = false;
    const keyList = keysRef.current;
    supabase
      .from('site_settings')
      .select('key, value')
      .in('key', keyList)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data) {
          const mapped: Record<string, string> = {};
          data.forEach((row: { key: string; value: string }) => { mapped[row.key] = row.value; });
          setValues(mapped);
        }
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [keys.join(',')]);

  return { values, loading };
};
