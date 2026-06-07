'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { MOCK_SERVICES } from '@/lib/mocks';

export async function getServiceById(id: string) {
  try {
    const supabase = createAdminClient();
    
    const { data: service, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.warn(`Error fetching service ${id} (trying mock fallback):`, error.message);
      return MOCK_SERVICES.find(s => s.id === id) || null;
    }

    return service;
  } catch (error) {
    console.warn(`Server error fetching service ${id} (trying mock fallback):`, error);
    return MOCK_SERVICES.find(s => s.id === id) || null;
  }
}
