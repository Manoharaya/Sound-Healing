import React from 'react';
import Image from 'next/image';
import { AboutPreview } from '@/components/sections/AboutPreview';
import { Sparkles } from 'lucide-react';
import { CallToAction } from '@/components/sections/CallToAction';

export const metadata = {
  title: "Origin & Vision | Heart Strong",
  description: "Learn about Jenny, our kinesiologist and sound therapist, and the vision behind Heart Strong.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg pb-32">
      {/* Luxury Page Header */}
      <section className="relative pt-40 pb-24 overflow-hidden text-center bg-[#1A362B]">
        <div className="absolute inset-0 opacity-[0.2] pointer-events-none mix-blend-screen" 
             style={{ backgroundImage: "url('/lemuria-assets/backgrounds/teal-texture.jpg')", backgroundSize: 'cover' }}></div>
        
        <div className="container relative z-10 px-6 mx-auto">
          <div className="inline-flex items-center gap-3 px-6 py-2 mb-8 rounded-full bg-brand-gold/10 border border-brand-gold/30 backdrop-blur-md text-brand-gold">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Grounded Beginnings</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tight leading-[1.1] mb-8 drop-shadow-premium">
            Origin & <span className="text-brand-gold italic font-light">Vision</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-white/70 font-light leading-relaxed italic">
            &ldquo;Guided by evidence-based wellness modalities, discover the journey behind the Mornington Peninsula&rsquo;s most grounded wellness studio.&rdquo;
          </p>
        </div>
      </section>

      <AboutPreview />

      <section className="pt-12 pb-16 max-w-5xl mx-auto px-6">
        <div className="p-16 md:p-24 rounded-t-[100px] rounded-b-[40px] bg-white border border-brand-teal/5 shadow-[0_20px_60px_rgba(45,90,71,0.06)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          <div className="absolute inset-2 border border-brand-gold/10 rounded-t-[92px] rounded-b-[32px] pointer-events-none group-hover:border-brand-gold/30 transition-colors duration-1000"></div>
          
          <h2 className="text-5xl font-serif text-brand-text mb-12 relative z-10 leading-[1.1]">The Philosophy of <br/><span className="text-brand-teal italic font-light">Wellness</span></h2>
          <div className="space-y-8 text-brand-text/60 font-light text-xl leading-relaxed relative z-10 italic">
            <p>
              At Heart Strong, we believe every human system operates best in a state of balance. High stress, physical fatigue, or emotional blockages alter these natural wellness states, resulting in tension within the mind and body.
            </p>
            <p>
              Through expert sound therapy and kinesiology - using clinical sound tools, specialized tuning forks, and muscle monitoring - we support client realignment. This allows the nervous system to naturally transition back into its optimal state of calm.
            </p>
            <p>
              Our studio was designed intentionally with natural tones, soothing purple accents, and calming forest green environments to promote a sense of security and presence immediately upon entry.
            </p>
          </div>
          
          <div className="mt-16 pt-12 border-t border-brand-teal/5 flex items-center gap-6 relative z-10">
            <div className="w-20 h-20 rounded-full overflow-hidden border border-brand-gold shadow-premium relative group-hover:scale-110 transition-transform duration-700">
              <Image src="/lemuria-assets/hero/jenny-hero.jpg" alt="Jenny Gillson" fill sizes="80px" className="object-cover" quality={95} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] mb-2">Founder & Lead Kinesiologist</p>
              <h4 className="text-2xl font-serif text-brand-text">Jenny Gillson</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Call to Action */}
      <CallToAction />
    </div>
  );
}
