import { Service, Workshop, Testimonial } from "@/types";

export const MOCK_SERVICES: Service[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    name: "Kinesiology",
    title: "Kinesiology",
    description: "Personalised one-on-one sessions using muscle monitoring to identify stressors, release emotional tension, and support your body's natural ability to restore balance.",
    price: 150,
    duration_minutes: 60
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    name: "Private Sound Therapy",
    title: "Private Sound Therapy",
    description: "Experience the calming effects of therapeutic sound and vibration. Designed to reduce stress, quiet the mind, and promote deep relaxation in a supportive environment.",
    price: 150,
    duration_minutes: 60
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    name: "Aromatherapy & Bodywork",
    title: "Aromatherapy & Bodywork",
    description: "A nurturing session using high-quality essential oils and gentle bodywork to support stress relief, ease tension, and restore your natural clarity and calm.",
    price: 150,
    duration_minutes: 60
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    name: "Mind-Body Balance",
    title: "Mind-Body Balance",
    description: "A personalized session combining kinesiology and sound therapy to support your goals, reduce burnout, and restore focus.",
    price: 180,
    duration_minutes: 75
  },
  {
    id: "fa111111-1111-1111-1111-111111111111",
    name: "The Friday Unwind",
    title: "The Friday Unwind",
    description: "Your weekly circuit breaker. Designed for busy minds, tense bodies, and nervous systems that haven't fully switched off all week.",
    price: 45,
    duration_minutes: 60
  },
  {
    id: "da222222-2222-2222-2222-222222222222",
    name: "The Saturday Reset",
    title: "The Saturday Reset",
    description: "Step out of doing mode and into being mode, so the rest of your weekend actually feels like a weekend.",
    price: 50,
    duration_minutes: 75
  },
  {
    id: "ea333333-3333-3333-3333-333333333333",
    name: "The Sunday Restoration",
    title: "The Sunday Restoration",
    description: "Deep sound frequencies, breathwork, and guided stillness to clear the week's residue and rebuild your inner resources.",
    price: 60,
    duration_minutes: 90
  }
];

export const MOCK_WORKSHOPS: Workshop[] = [
  {
    id: "99999999-9999-9999-9999-999999999999",
    title: "Wellbeing & Sound Therapy Workshop",
    description: "Join us for an immersive group sound therapy experience. Learn practical stress management techniques and experience deep relaxation in a calm environment.",
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Lemuria Studio, Perth",
    capacity: 20,
    total_slots: 15,
    price: 75
  }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah M.",
    testimonial: "I was feeling completely overwhelmed, exhausted and disconnected from myself. After my sessions with Jenny, I felt calmer, more balanced and much clearer about what I needed to focus on. The experience helped me reconnect with myself and move forward with confidence.",
    rating: 5,
    status: "approved",
    created_at: new Date().toISOString()
  },
  {
    id: "t2",
    name: "James R.",
    testimonial: "Years of stress had built up in my body and I constantly felt tense. The sound healing session allowed me to relax on a level I hadn't experienced before. I left feeling lighter, calmer and with a much clearer mind.",
    rating: 5,
    status: "approved",
    created_at: new Date().toISOString()
  },
  {
    id: "t3",
    name: "Elena P.",
    testimonial: "I felt stuck both personally and professionally. Jenny helped me identify what was holding me back and gave me practical tools to move forward. The combination of kinesiology and coaching was incredibly valuable.",
    rating: 5,
    status: "approved",
    created_at: new Date().toISOString()
  },
  {
    id: "t4",
    name: "David L.",
    testimonial: "I was struggling with work stress and constantly felt overwhelmed. After several sessions I noticed improvements in my focus, energy levels and ability to manage pressure. The changes were gradual but very noticeable.",
    rating: 5,
    status: "approved",
    created_at: new Date().toISOString()
  },
  {
    id: "t5",
    name: "Michelle T.",
    testimonial: "The environment Jenny creates is calm, welcoming and supportive. Every session feels personalised and I always leave with greater clarity and a sense of direction.",
    rating: 5,
    status: "approved",
    created_at: new Date().toISOString()
  },
  {
    id: "t6",
    name: "HR Manager",
    testimonial: "Our team wellbeing session was one of the highlights of the year. Staff left feeling relaxed, refreshed and more connected to each other. The feedback from employees was overwhelmingly positive.",
    rating: 5,
    status: "approved",
    created_at: new Date().toISOString()
  },
  {
    id: "t7",
    name: "Operations Manager",
    testimonial: "We booked Jenny as part of a staff wellness day and the response was fantastic. The sound therapy session provided a genuine opportunity for our team to slow down, reset and recharge.",
    rating: 5,
    status: "approved",
    created_at: new Date().toISOString()
  }
];
