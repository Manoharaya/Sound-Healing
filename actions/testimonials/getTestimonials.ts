'use server';
import { cache } from 'react';

import { createAdminClient } from '@/lib/supabase/admin';
import { MOCK_TESTIMONIALS } from '@/lib/mocks';

export const getTestimonials = cache(async () => {
  try {
    const supabase = createAdminClient();
    const { data: testimonials, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Error fetching testimonials (using mock fallback):', error.message);
      return MOCK_TESTIMONIALS;
    }

    return testimonials || [];
  } catch (error) {
    console.warn('Server error fetching testimonials (using mock fallback):', error);
    return MOCK_TESTIMONIALS;
  }
});
