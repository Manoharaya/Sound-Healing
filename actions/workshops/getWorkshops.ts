'use server';
import { cache } from 'react';

import { createAdminClient } from '@/lib/supabase/admin';
import { MOCK_WORKSHOPS } from '@/lib/mocks';

export const getWorkshops = cache(async () => {
  try {
    const supabase = createAdminClient();
    
    const { data: workshops, error } = await supabase
      .from('workshops')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.warn('Error fetching workshops (using mock fallback):', error.message);
      return MOCK_WORKSHOPS;
    }

    return workshops || [];
  } catch (error) {
    console.warn('Server error fetching workshops (using mock fallback):', error);
    return MOCK_WORKSHOPS;
  }
});
