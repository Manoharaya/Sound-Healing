import React from 'react';
import { Music, Sparkles, Calendar, Clock, MapPin, Users, HelpCircle } from 'lucide-react';
import { CallToAction } from '@/components/sections/CallToAction';
import Link from 'next/link';

export const metadata = {
  title: "The Sunday Restoration | Heart Strong",
  description: "Arrive restored. Rebuild your inner resource to meet the week ahead with steadiness.",
};

const outcomes = [
  "Inner steadiness that carries into the week",
  "Genuinely recharged — not just rested",
  "Mental clarity and calm decision-making",
  "Grounded and ready — not braced and depleted",
  "The Sunday dread replaced by quiet confidence",
  "Sleep that night is deeper",
  "Monday morning feels different",
  "You meet the week — it doesn't take you"
];

const details = [
  { icon: Calendar, label: "When", value: "Every Sunday afternoon" },
  { icon: Clock, label: "Duration", value: "90 mins" },
  { icon: Users, label: "Format", value: "Group session" },
  { icon: MapPin, label: "Location", value: "Heart Strong Studio, Sanctuary Room" }
];

const faqs = [
  {
    q: "Why 90 minutes when the others are shorter?",
    a: "Sunday restoration needs to go deeper. The patterns we carry into a new week are older and more ingrained. The extra time allows a full release and rebuild — not just a surface reset."
  },
  {
    q: "I feel anxious on Sundays. Is this still for me?",
    a: "Especially for you. The session is specifically designed to address that anticipatory tension in the nervous system. Many clients say this is the one that changes their relationship to Mondays entirely."
  },
  {
    q: "Can I do all three — Friday, Saturday, and Sunday?",
    a: "Yes, and many people do. Each session targets a different state and they work beautifully together as a full weekend of restoration."
  }
];

export default function SundayRestorationPage() {
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
                The Sunday <span className="text-brand-beige italic font-light">Restoration</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-4 font-serif italic">
                &ldquo;Arrive restored. Not just rested.&rdquo;
            </p>
            <p className="max-w-2xl mx-auto text-sm md:text-base text-white/50 font-sans font-bold uppercase tracking-widest leading-relaxed">
                For anyone who feels Sunday slipping away before Monday has even begun.
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
                  {"Sunday isn't the end of the week. It's the foundation of the one ahead."}
                </p>
                <p>
                  {"The low-grade dread that settles on Sunday afternoon isn't laziness. It's not weakness. It's your nervous system sensing what's coming and quietly beginning to brace."}
                </p>
                <p>
                  Most people push through it — or numb it. They arrive at Monday already depleted, already behind, already running on reserve.
                </p>
                <p className="font-medium text-brand-teal">
                  This session interrupts that pattern.
                </p>
                <p>
                  The Sunday Restoration uses deep sound therapy, breathwork, and guided stillness to gently clear the residue of the week, rebuild your inner resource, and send you into the week ahead from a place of steadiness — not survival.
                </p>
                <p>
                  Monday will come regardless. The question is how you meet it.
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
                    href="/book?service=sunday-restoration" 
                    className="w-full inline-flex items-center justify-center gap-4 bg-brand-teal text-white py-5 rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:bg-brand-text hover:-translate-y-1 transition-all shadow-premium"
                  >
                    Reserve Your Spot
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
