-- Seed Real Content from Lemuria Healing Website

-- Clear existing data (optional, but good for clean state)
TRUNCATE services, workshops, testimonials CASCADE;

-- Insert Services
INSERT INTO services (id, name, description, price, duration_minutes)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'Kinesiology',
    'Personalised one-on-one sessions using muscle monitoring to identify stressors, release emotional tension, and support your body''s natural ability to restore balance.',
    150.00,
    60
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Private Sound Therapy',
    'Experience the calming effects of therapeutic sound and vibration. Designed to reduce stress, quiet the mind, and promote deep relaxation in a supportive environment.',
    150.00,
    60
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Aromatherapy & Bodywork',
    'A nurturing session using high-quality essential oils and gentle bodywork to support stress relief, ease tension, and restore your natural clarity and calm.',
    150.00,
    60
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'Mind-Body Balance',
    'A personalized session combining kinesiology and sound therapy to support your goals, reduce burnout, and restore focus.',
    180.00,
    75
  ),
  (
    'fa111111-1111-1111-1111-111111111111',
    'The Friday Unwind',
    'Your weekly circuit breaker. Designed for busy minds, tense bodies, and nervous systems that haven''t fully switched off all week.',
    45.00,
    60
  ),
  (
    'da222222-2222-2222-2222-222222222222',
    'The Saturday Reset',
    'Step out of doing mode and into being mode, so the rest of your weekend actually feels like a weekend.',
    50.00,
    75
  ),
  (
    'ea333333-3333-3333-3333-333333333333',
    'The Sunday Restoration',
    'Deep sound frequencies, breathwork, and guided stillness to clear the week''s residue and rebuild your inner resources.',
    60.00,
    90
  );

-- Insert Testimonials
INSERT INTO testimonials (id, name, testimonial, rating, status)
VALUES
  ('t1', 'Sarah M.', 'I was feeling completely overwhelmed, exhausted and disconnected from myself. After my sessions with Jenny, I felt calmer, more balanced and much clearer about what I needed to focus on. The experience helped me reconnect with myself and move forward with confidence.', 5, 'approved'),
  ('t2', 'James R.', 'Years of stress had built up in my body and I constantly felt tense. The sound healing session allowed me to relax on a level I hadn''t experienced before. I left feeling lighter, calmer and with a much clearer mind.', 5, 'approved'),
  ('t3', 'Elena P.', 'I felt stuck both personally and professionally. Jenny helped me identify what was holding me back and gave me practical tools to move forward. The combination of kinesiology and coaching was incredibly valuable.', 5, 'approved'),
  ('t4', 'David L.', 'I was struggling with work stress and constantly felt overwhelmed. After several sessions I noticed improvements in my focus, energy levels and ability to manage pressure. The changes were gradual but very noticeable.', 5, 'approved'),
  ('t5', 'Michelle T.', 'The environment Jenny creates is calm, welcoming and supportive. Every session feels personalised and I always leave with greater clarity and a sense of direction.', 5, 'approved'),
  ('t6', 'HR Manager', 'Our team wellbeing session was one of the highlights of the year. Staff left feeling relaxed, refreshed and more connected to each other. The feedback from employees was overwhelmingly positive.', 5, 'approved'),
  ('t7', 'Operations Manager', 'We booked Jenny as part of a staff wellness day and the response was fantastic. The sound therapy session provided a genuine opportunity for our team to slow down, reset and recharge.', 5, 'approved');

-- Insert initial Workshop
INSERT INTO workshops (id, title, description, date, capacity, price)
VALUES
  (
    '99999999-9999-9999-9999-999999999999',
    'Wellbeing & Sound Therapy Workshop',
    'Join us for an immersive group sound therapy experience. Learn practical stress management techniques and experience deep relaxation in a calm environment.',
    NOW() + INTERVAL '30 days',
    20,
    75.00
  );
