import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type Applicant = {
  full_name: string;
  location: string;
  created_at: string;
};

export default function useRecentApplicants() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecentApplicants() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('applications')
          .select('full_name, location, created_at')
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) {
          throw error;
        }

        if (data) {
          setApplicants(data);
        }
      } catch (err) {
        console.error('Error fetching recent applicants:', err);
        setError('Failed to load recent applicants');
      } finally {
        setLoading(false);
      }
    }

    fetchRecentApplicants();
  }, []);

  return { applicants, loading, error };
}
