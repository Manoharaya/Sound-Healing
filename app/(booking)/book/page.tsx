import React from 'react';
import { getServices } from '@/actions/services/getServices';
import { getWorkshops } from '@/actions/workshops/getWorkshops';
import { BookingFlow } from '@/components/booking/BookingFlow';

export const metadata = {
  title: "Book a Session | Lemuria",
  description: "Schedule your private sound therapy session or reserve your spot in our weekend group educational workshops.",
};

export default async function BookPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ service?: string; workshop?: string; canceled?: string }> 
}) {
  const resolvedParams = await searchParams;
  const serviceId = resolvedParams.service;
  const workshopId = resolvedParams.workshop;
  const isCanceled = resolvedParams.canceled === 'true';

  // Fetch all services and workshops from database (or mock fallbacks)
  const services = await getServices();
  const workshops = await getWorkshops();

  return (
    <BookingFlow 
      services={services} 
      workshops={workshops} 
      defaultServiceId={serviceId} 
      defaultWorkshopId={workshopId}
      isCanceled={isCanceled}
    />
  );
}
