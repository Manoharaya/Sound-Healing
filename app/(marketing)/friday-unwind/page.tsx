import React from 'react';
import { Music, Sparkles, Calendar, Clock, MapPin, Users, HelpCircle } from 'lucide-react';
import { CallToAction } from '@/components/sections/CallToAction';
import Link from 'next/link';

export const metadata = {
  title: "Friday Sound Session | Lemuria",
  description: "A relaxing end-of-week session designed to help you release stress, calm your mind, and transition into a restful weekend.",
};

const outcomes = [
  "Life feels easier",
  "Breathing is deeper",
  "Living calmer",
  "Emotional relief",
  "Deeper rest and better sleep",
  "Safer in your own body",
  "Simplicity and stillness",
  "Presence",
  "Like yourself again"
];

const details = [
  { icon: Calendar, label: "When", value: "Every Friday evening" },
  { icon: Clock, label: "Duration", value: "60 mins" },
  { icon: Users, label: "Format", value: "Group session" },
  { icon: MapPin, label: "Location", value: "Lemuria Studio, Perth" }
];

const faqs = [
  {
    q: "Do I need any experience with sound therapy?",
    a: "None at all. Come exactly as you are — tired, wired, or somewhere in between."
  },
  {
    q: "What should I bring?",
    a: "Just yourself. We provide everything — mat, blanket, and eye pillow."
  },
  {
    q: "What time does it start?",
    a: "Doors open 10 minutes before. Please arrive on time so the space stays held for everyone."
  }
];

export default function FridayUnwindPage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg pb-32">
      {/* Luxury Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-brand-text">
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none" 
             style={{ backgroundImage: "url('/lemuria-assets/backgrounds/beige-texture.jpg')", backgroundSize: 'cover' }}></div>
        
        <div className="container relative z-10 px-6 mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-2 mb-8 rounded-full bg-brand-beige/10 border border-brand-beige/30 backdrop-blur-md text-brand-beige">
                <Music className="w-4 h-4" />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Weekend Circle</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tight leading-[1.1] mb-8 drop-shadow-premium">
                Friday Sound <span className="text-brand-beige italic font-light">Session</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-4 font-serif italic">
                &ldquo;Because you have a trip switch too.&rdquo;
            </p>
            <p className="max-w-2xl mx-auto text-sm md:text-base text-white/50 font-sans font-bold uppercase tracking-widest leading-relaxed">
                {"A relaxing end-of-week session designed to help you release stress, calm your mind, and transition into a restful weekend."}
            </p>
        </div>
      </section>

      {/* Main Content & Details */}
      <section className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Opening Copy & Outcomes (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-16">
              <div className="space-y-8 text-lg md:text-xl text-brand-text/70 leading-relaxed font-light">
                <p className="font-serif italic text-brand-text text-2xl leading-relaxed">
                  Your nervous system works the same way a power grid does — when the load becomes too much, the system is designed to trip before it burns out.
                </p>
                <p>
                  Most people never truly switch off. They keep pushing through stress, pressure, stimulation, and mental overload long after the body has reached its limit.
                </p>
                <p>
                  This guided sound session is designed to help your system reset — calming the nervous system, releasing physical tension held in the jaw, neck, and spine, and helping the mind shift out of constant alert mode and back into rest and restore.
                </p>
              </div>

              {/* Outcomes */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3">
                  <div className="w-12 h-[1px] bg-brand-gold/50"></div>
                  <span className="text-[10px] font-bold text-brand-gold tracking-[0.3em] uppercase">The Shift</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl text-brand-text">Expected Outcomes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {outcomes.map((outcome, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-brand-teal/5 flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 text-brand-gold" />
                      </div>
                      <span className="text-brand-text/85 text-base font-light">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Details & CTA (Right 5 Cols) */}
            <div className="lg:col-span-5 lg:sticky lg:top-40 space-y-12">
              <div className="p-8 md:p-10 bg-brand-bg/40 rounded-[40px] border border-brand-teal/5 shadow-premium space-y-8">
                <h3 className="font-serif text-2xl text-brand-text border-b border-brand-teal/10 pb-4">Session Details</h3>
                <div className="space-y-6">
                  {details.map((detail, i) => {
                    const Icon = detail.icon;
                    return (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                          <Icon className="w-4 h-4 text-brand-teal" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">{detail.label}</p>
                          <p className="text-brand-text font-serif text-lg mt-1">{detail.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="pt-4">
                  <Link 
                     href="/book?service=friday-unwind" 
                    className="w-full inline-flex items-center justify-center gap-4 bg-brand-teal text-white py-5 rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:bg-brand-text hover:-translate-y-1 transition-all shadow-premium"
                  >
                    Book a Session
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-brand-bg/30 border-t border-brand-teal/5 relative">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-brand-gold/50"></div>
              <span className="text-[10px] font-bold text-brand-gold tracking-[0.3em] uppercase">Session FAQ</span>
              <div className="w-12 h-[1px] bg-brand-gold/50"></div>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-text">Common Questions</h2>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-8 md:p-10 rounded-[30px] shadow-sm border border-brand-teal/5 space-y-4">
                <div className="flex gap-4 items-start">
                  <HelpCircle className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
                  <h4 className="font-serif text-xl text-brand-text leading-snug">{faq.q}</h4>
                </div>
                <p className="text-brand-text/60 font-light leading-relaxed pl-10 text-base">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <CallToAction />
    </div>
  );
}
