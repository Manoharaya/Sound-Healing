import { Service, Workshop, Testimonial } from "@/types";

export const MOCK_SERVICES: Service[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    name: "Crystal Singing Bowls",
    title: "Crystal Singing Bowls",
    description: "A deep sound journey using pure quartz crystal singing bowls tuned to the chakras to clear blockages and induce deep meditation.",
    price: 140,
    duration_minutes: 60
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    name: "Sacred Gong Resonance",
    title: "Sacred Gong Resonance",
    description: "Bathe in the complex harmonics of planetary gongs. Perfect for releasing deep physical tension and resetting the nervous system.",
    price: 180,
    duration_minutes: 60
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    name: "Vibrational Sound Bath",
    title: "Vibrational Sound Bath",
    description: "An immersive acoustic experience combining Tibetan bowls, chimes, and ocean drums to restore balance and harmony to body and mind.",
    price: 150,
    duration_minutes: 60
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    name: "Energy Alignment Therapy",
    title: "Energy Alignment Therapy",
    description: "A personalized session combining light touch energy work, sound frequencies, and breathwork to balance your biofield.",
    price: 160,
    duration_minutes: 60
  },
  {
    id: "55555555-5555-5555-5555-555555555555",
    name: "Angel Touch Healing",
    title: "Angel Touch Healing",
    description: "Gentle hands-on vibrational healing designed to channel high-frequency angelic light for emotional release and spiritual comfort.",
    price: 170,
    duration_minutes: 60
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
    title: "Vibrational Meditation & Sound Journey",
    description: "Join us for an immersive multi-instrumental sound healing experience. We will use gongs, crystal bowls, and ancestral instruments to journey deep within.",
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days in the future
    location: "Lemuria Temple, Sanctuary Room",
    capacity: 20,
    total_slots: 15,
    price: 75
  }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "88888888-8888-8888-8888-888888888888",
    name: "Sarah M.",
    testimonial: "The sound healing session with Jenny was completely transformative. My chronic back pain disappeared.",
    rating: 5,
    status: "approved",
    created_at: new Date().toISOString()
  }
];
