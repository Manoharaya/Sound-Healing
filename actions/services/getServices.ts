'use server';
import { cache } from 'react';

import { createAdminClient } from '@/lib/supabase/admin';
import { MOCK_SERVICES } from '@/lib/mocks';

export const getServices = cache(async () => {
  try {
    const supabase = createAdminClient();
    
    const { data: services, error } = await supabase
      .from('services')
      .select('*');

    if (error) {
      console.warn('Error fetching services (using mock fallback):', error.message);
      return MOCK_SERVICES;
    }

    return services || [];
  } catch (error) {
    console.warn('Server error fetching services (using mock fallback):', error);
    return MOCK_SERVICES;
  }
});
