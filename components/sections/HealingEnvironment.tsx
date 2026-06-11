"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const environmentImages = [
  {
    src: "/lemuria-assets/services/sound-bowls.jpg",
    title: "Sound Therapy",
    description: "Experience the calming effects of therapeutic sound and vibration."
  },
  {
    src: "/lemuria-assets/services/healing-session.jpg",
    title: "Private Healing Space",
    description: "A comfortable and supportive setting for your session."
  },
  {
    src: "/lemuria-assets/services/singing-bowls.jpg",
    title: "Professional Tools & Techniques",
    description: "A combination of sound therapy, kinesiology and holistic wellbeing practices."
  }
];

export function HealingEnvironment() {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-[10px] font-bold text-brand-gold tracking-[0.4em] uppercase mb-4 block">A Calm and Supportive Environment</span>
          <h2 className="font-serif text-5xl md:text-6xl text-brand-text mb-8 tracking-tight">
            Our Perth <span className="text-brand-teal italic font-light">Studio</span>
          </h2>
          <p className="text-brand-text/50 max-w-2xl mx-auto leading-relaxed font-light text-lg italic">
            Our Perth Studio has been created to help you slow down, relax and focus on your wellbeing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {environmentImages.map((image, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group relative h-[450px] rounded-[40px] overflow-hidden shadow-premium"
            >
              <Image 
                src={image.src} 
                alt={image.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-all duration-1000 group-hover:scale-110"
                quality={95}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-text/80 via-transparent to-transparent opacity-100 transition-opacity duration-700"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-12 z-10 translate-y-0 opacity-100 transition-all duration-700">
                <h3 className="font-serif text-3xl text-white mb-4">{image.title}</h3>
                <p className="text-white/70 text-sm font-light italic">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
