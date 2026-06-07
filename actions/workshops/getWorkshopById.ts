'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { MOCK_WORKSHOPS } from '@/lib/mocks';

export async function getWorkshopById(id: string) {
  try {
    const supabase = createAdminClient();
    
    const { data: workshop, error } = await supabase
      .from('workshops')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.warn(`Error fetching workshop ${id} (trying mock fallback):`, error.message);
      return MOCK_WORKSHOPS.find(w => w.id === id) || null;
    }

    return workshop;
  } catch (error) {
    console.warn(`Server error fetching workshop ${id} (trying mock fallback):`, error);
    return MOCK_WORKSHOPS.find(w => w.id === id) || null;
  }
}
