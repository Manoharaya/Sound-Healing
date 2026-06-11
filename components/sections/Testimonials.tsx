"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah M.",
    text: "I was feeling completely overwhelmed, exhausted and disconnected from myself. After my sessions with Jenny, I felt calmer, more balanced and much clearer about what I needed to focus on. The experience helped me reconnect with myself and move forward with confidence.",
    rating: 5,
    role: "Perth"
  },
  {
    name: "James R.",
    text: "Years of stress had built up in my body and I constantly felt tense. The sound healing session allowed me to relax on a level I hadn't experienced before. I left feeling lighter, calmer and with a much clearer mind.",
    rating: 5,
    role: "Melbourne"
  },
  {
    name: "Elena P.",
    text: "I felt stuck both personally and professionally. Jenny helped me identify what was holding me back and gave me practical tools to move forward. The combination of kinesiology and coaching was incredibly valuable.",
    rating: 5,
    role: "Creative Professional"
  },
  {
    name: "David L.",
    text: "I was struggling with work stress and constantly felt overwhelmed. After several sessions I noticed improvements in my focus, energy levels and ability to manage pressure. The changes were gradual but very noticeable.",
    rating: 5,
    role: "Business Owner"
  },
  {
    name: "Michelle T.",
    text: "The environment Jenny creates is calm, welcoming and supportive. Every session feels personalised and I always leave with greater clarity and a sense of direction.",
    rating: 5,
    role: "Perth"
  },
  {
    name: "HR Manager",
    text: "Our team wellbeing session was one of the highlights of the year. Staff left feeling relaxed, refreshed and more connected to each other. The feedback from employees was overwhelmingly positive.",
    rating: 5,
    role: "Professional Services Firm"
  },
  {
    name: "Operations Manager",
    text: "We booked Jenny as part of a staff wellness day and the response was fantastic. The sound therapy session provided a genuine opportunity for our team to slow down, reset and recharge.",
    rating: 5,
    role: "Healthcare Organisation"
  }
];

export function Testimonials() {
    return (
        <section id="testimonials" className="pt-24 pb-12 bg-white relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/5 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-teal/5 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-3 mb-8">
                        <div className="w-12 h-[1px] bg-brand-gold/50"></div>
                        <span className="text-[10px] font-bold text-brand-gold tracking-[0.4em] uppercase">Client Experiences</span>
                    </div>
                    <h2 className="font-serif text-5xl md:text-6xl font-medium text-brand-text mb-8 tracking-tight">
                        Client <span className="text-brand-teal italic font-light">Experiences</span>
                    </h2>
                    <p className="text-brand-text/50 max-w-2xl mx-auto leading-relaxed font-light text-lg italic">
                        Helping people reduce stress, find clarity and create positive change in their lives.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: (i % 3) * 0.2 }}
                            className="bg-brand-bg rounded-[30px] p-8 shadow-premium border border-brand-teal/5 flex flex-col h-full relative group transition-all duration-500 hover:scale-[1.02]"
                        >
                            <div className="flex mb-6">
                                {[...Array(t.rating)].map((_, star) => (
                                    <span key={star} className="text-brand-gold text-lg">⭐</span>
                                ))}
                            </div>

                            <div className="space-y-6 flex-grow flex items-center">
                                <p className="font-serif text-lg text-brand-text leading-relaxed italic">
                                    &ldquo;{t.text}&rdquo;
                                </p>
                            </div>

                            <div className="mt-8 flex items-center gap-6">
                                <div className="w-12 h-12 rounded-full bg-brand-teal/10 flex items-center justify-center font-serif text-xl font-bold text-brand-teal">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-serif text-lg text-brand-text leading-none mb-1">{t.name}</p>
                                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
