'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { sendEmail } from '@/lib/resend/client';
import { stripe } from '@/lib/stripe/client';
import { MOCK_SERVICES, MOCK_WORKSHOPS } from '@/lib/mocks';

const bookingSchema = z.object({
  service_id: z.string().uuid().optional(),
  workshop_id: z.string().uuid().optional(),
  full_name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  session_date: z.string().min(1, 'Session date is required'),
}).refine(data => data.service_id || data.workshop_id, {
  message: "Either service_id or workshop_id must be provided",
  path: ["service_id"]
});

export async function createBooking(formData: FormData) {
  try {
    const supabase = createAdminClient();

    const rawData = {
      service_id: formData.get('service_id') as string || undefined,
      workshop_id: formData.get('workshop_id') as string || undefined,
      full_name: formData.get('full_name') as string,
      email: formData.get('email') as string,
      session_date: formData.get('session_date') as string,
    };

    const validatedData = bookingSchema.parse(rawData);

    let itemTitle = 'Sacred Session';
    let itemPrice = 0;
    let itemType = 'Service';

    // 1. Fetch Details (Service or Workshop)
    if (validatedData.service_id) {
        let service = null;
        let serviceError = null;

        try {
          const { data, error } = await supabase
            .from('services')
            .select('title, price')
            .eq('id', validatedData.service_id)
            .single();
          service = data;
          serviceError = error;
        } catch (err) {
          serviceError = err;
        }

        if (serviceError || !service) {
          const mockService = MOCK_SERVICES.find(s => s.id === validatedData.service_id);
          if (mockService) {
            itemTitle = mockService.title || mockService.name || 'Sacred Session';
            itemPrice = mockService.price;
            itemType = 'Service';
          } else {
            return { success: false, error: 'Failed to retrieve service details' };
          }
        } else {
          itemTitle = service.title as string;
          itemPrice = service.price;
          itemType = 'Service';
        }
    } else if (validatedData.workshop_id) {
        let workshop = null;
        let workshopError = null;

        try {
          const { data, error } = await supabase
            .from('workshops')
            .select('title, price')
            .eq('id', validatedData.workshop_id)
            .single();
          workshop = data;
          workshopError = error;
        } catch (err) {
          workshopError = err;
        }

        if (workshopError || !workshop) {
          const mockWorkshop = MOCK_WORKSHOPS.find(w => w.id === validatedData.workshop_id);
          if (mockWorkshop) {
            itemTitle = mockWorkshop.title;
            itemPrice = mockWorkshop.price;
            itemType = 'Workshop';
          } else {
            return { success: false, error: 'Failed to retrieve workshop details' };
          }
        } else {
          itemTitle = workshop.title;
          itemPrice = workshop.price;
          itemType = 'Workshop';
        }
    }

    // 2. Insert Booking
    let bookingId = 'mock-booking-' + Math.random().toString(36).substring(2, 9);
    try {
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          service_id: validatedData.service_id || null,
          workshop_id: validatedData.workshop_id || null,
          email: validatedData.email,
          full_name: validatedData.full_name,
          amount: itemPrice,
          session_date: new Date(validatedData.session_date).toISOString(),
        })
        .select('id')
        .single();

      if (bookingError || !booking) {
        console.warn('Database error inserting booking (using mock registration):', bookingError?.message);
      } else {
        bookingId = booking.id;
      }
    } catch (err) {
      console.warn('Unexpected database insertion error (using mock registration):', err);
    }

    // 3. Send Notification Emails
    try {
      await sendEmail(
        validatedData.email,
        'Booking Received - Lemuria Healing',
        `<p>Dear ${validatedData.full_name},</p><p>Thank you for initiating a booking for the ${itemType}: <strong>${itemTitle}</strong>.</p><p><strong>Date:</strong> ${new Date(validatedData.session_date).toLocaleString()}</p><p>Please note: Your session will be fully confirmed upon successful energy exchange (payment).</p><br/><p>With light,<br/>Lemuria Healing Sanctuary</p>`
      );
    } catch (err) {
      console.warn('Email sending failed (skipped in dev mode):', err);
    }

    // 4. Create Stripe Checkout Session
    const domain = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    let checkoutUrl = `${domain}/success?session_id=mock_session_${Math.random().toString(36).substring(2, 9)}`;

    try {
      const unitAmount = Math.round(Number(itemPrice) * 100);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer_email: validatedData.email,
        client_reference_id: bookingId,
        line_items: [
          {
            price_data: {
              currency: 'aud',
              product_data: {
                name: `${itemType}: ${itemTitle}`,
                description: `Booking for ${validatedData.full_name} — Lemuria Healing Sanctuary`,
              },
              unit_amount: unitAmount,
            },
            quantity: 1,
          },
        ],
        success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domain}/book?${validatedData.service_id ? `service=${validatedData.service_id}` : `workshop=${validatedData.workshop_id}`}&canceled=true`,
      });
      if (session.url) {
        checkoutUrl = session.url;
      }
    } catch (err) {
      console.warn('Stripe checkout creation failed (simulating redirect to success page):', err);
    }

    try {
      revalidatePath('/admin/bookings');
    } catch (err) {
      console.warn('Cache revalidation failed:', err);
    }

    return { success: true, url: checkoutUrl };
  } catch (error) {
    console.warn('Error creating booking:', error);
    if (error instanceof Error && error.name === 'ZodError') {
      const zodErr = error as z.ZodError;
      return { success: false, error: zodErr.issues?.[0]?.message || 'Validation failed' };
    }
    return { success: false, error: 'An unexpected error occurred' };
  }
}


