"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const weekendSessions = [
  {
    id: "friday-unwind",
    title: "Friday Sound Session",
    tagline: "Because you have a trip switch too.",
    description: "A relaxing end-of-week session designed to help you release stress, calm your mind, and transition into a restful weekend.",
    duration: "60 MINS",
    price: 45,
    image: "/lemuria-assets/services/sound-bowls.jpg",
    link: "/friday-unwind"
  },
  {
    id: "saturday-reset",
    title: "Saturday Sound Session",
    tagline: "Your day off deserves to feel like one.",
    description: "A dedicated weekend session to help you step away from daily stress, relax deeply, and restore balance.",
    duration: "75 MINS",
    price: 50,
    image: "/lemuria-assets/services/singing-bowls.jpg",
    link: "/saturday-reset"
  },
  {
    id: "sunday-restoration",
    title: "Sunday Sound Session",
    tagline: "Arrive restored. Not just rested.",
    description: "A restorative session combining sound therapy and breathwork to help you clear stress and prepare for the week ahead.",
    duration: "90 MINS",
    price: 60,
    image: "/lemuria-assets/services/healing-session.jpg",
    link: "/sunday-restoration"
  }
];

export function WeekendSessions() {
  return (
    <section id="weekend-sessions" className="py-24 bg-brand-bg/30 relative overflow-hidden border-t border-brand-teal/5">
      {/* Ambient Background Pattern */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none" 
           style={{ backgroundImage: "url('/lemuria-assets/backgrounds/beige-texture.jpg')", backgroundSize: 'cover' }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-[1px] bg-brand-gold/50"></div>
            <span className="text-[10px] font-bold text-brand-gold tracking-[0.4em] uppercase">Weekend Sessions</span>
            <div className="w-12 h-[1px] bg-brand-gold/50"></div>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl font-medium text-brand-text mb-8 tracking-tight">
            Weekend <span className="text-brand-teal italic font-light">Sessions</span>
          </h2>
          <p className="text-brand-text/50 max-w-2xl mx-auto leading-relaxed font-light text-lg italic">
            Dedicated weekend sessions to help you unwind, reset and restore balance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {weekendSessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
              className="group relative h-[420px] rounded-[40px] overflow-hidden cursor-pointer shadow-premium border border-brand-teal/5"
            >
              {/* Background Image with Expansion Effect */}
              <div className="absolute inset-0 z-0">
                <Image 
                  src={session.image} 
                  alt={session.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                  className="object-cover transition-all duration-1000 group-hover:scale-110"
                  quality={95}
                />
                <div className="absolute inset-0 bg-brand-text/25 group-hover:bg-brand-text/10 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-text/85 via-brand-text/20 to-transparent"></div>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-8 z-10 flex flex-col justify-end h-full">
                  <motion.div 
                    className="transition-all duration-700 group-hover:translate-y-[-10px]"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <Badge className="bg-brand-gold text-white border-none py-1 px-4 rounded-full text-[10px] uppercase font-bold tracking-widest">
                        {session.duration}
                      </Badge>
                      <span className="text-white/60 text-xs font-bold uppercase tracking-widest">${session.price}</span>
                    </div>
                    <h3 className="font-serif text-2xl text-white mb-2 leading-tight">
                      {session.title}
                    </h3>
                    <p className="text-brand-gold/80 text-xs italic font-light mb-6 tracking-wide line-clamp-1 group-hover:opacity-0 transition-all duration-500">
                      {session.tagline}
                    </p>
                  </motion.div>

                {/* Slide-in Description */}
                <div className="max-h-0 opacity-0 group-hover:max-h-[200px] group-hover:opacity-100 transition-all duration-700 ease-in-out">
                  <p className="text-white/70 text-sm font-light leading-relaxed mb-6 line-clamp-3 italic">
                    {session.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link 
                      href={session.link}
                      className="text-white hover:text-brand-beige font-bold text-xs tracking-widest uppercase transition-colors"
                    >
                      Learn More
                    </Link>
                    <Link 
                      href={`/book?service=${session.id}`}
                      className="inline-flex items-center gap-3 text-primary-300 hover:text-white font-bold text-xs tracking-widest uppercase group/link transition-colors"
                    >
                      <span className="border-b border-primary-300/40 group-hover/link:border-white pb-0.5">Book Session</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-2" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Glowing Border on Hover */}
              <div className="absolute inset-0 border-2 border-brand-teal/0 group-hover:border-brand-teal/40 transition-all duration-700 rounded-[40px] z-20 pointer-events-none shadow-glow-gold opacity-0 group-hover:opacity-100"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
