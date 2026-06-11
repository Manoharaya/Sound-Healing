import React from 'react';
import { WorkshopsPreview } from '@/components/sections/WorkshopsPreview';
import { Leaf, Moon, Sun, Wind } from 'lucide-react';
import { getWorkshops } from '@/actions/workshops/getWorkshops';
import { CallToAction } from '@/components/sections/CallToAction';

export const metadata = {
  title: "Workshops | Lemuria",
  description: "Join us for educational and restorative workshops designed to support personal growth and wellbeing.",
};

export default async function WorkshopsPage() {
  const workshops = await getWorkshops();

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg pb-32">
      {/* Luxury Page Header */}
      <section className="relative pt-40 pb-20 overflow-hidden text-center bg-[#1A362B]">
        <div className="absolute inset-0 opacity-[0.2] pointer-events-none mix-blend-screen" 
             style={{ backgroundImage: "url('/lemuria-assets/backgrounds/teal-texture.jpg')", backgroundSize: 'cover' }}></div>
        
        <div className="container relative z-10 px-6 mx-auto">
          <div className="inline-flex items-center gap-3 px-6 py-2 mb-8 rounded-full bg-brand-beige/10 border border-brand-beige/30 backdrop-blur-md text-brand-beige">
            <Leaf className="w-4 h-4" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Community & Wellness</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif text-white tracking-tight leading-[1.1] mb-8 drop-shadow-premium">
            Educational <span className="text-brand-beige italic font-light">Workshops</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-white/70 font-light leading-relaxed mb-10 italic">
            &ldquo;Gather with others in our structured wellness workshops. Blend evidence-based practices with mindful presence.&rdquo;
          </p>
        </div>
      </section>

      {/* Information Section - What to Expect */}
      <section className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-4xl md:text-5xl font-serif text-brand-text mb-6">Structured <span className="italic font-light text-brand-teal">Programs</span></h2>
             <p className="text-lg text-brand-text/60 max-w-2xl mx-auto font-light leading-relaxed">
               Our workshops are designed to support your wellness journey, offering restorative practices and a supportive community environment.
             </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-8">
              <div className="w-16 h-16 rounded-full bg-brand-bg flex items-center justify-center mx-auto mb-6 shadow-premium">
                 <Moon className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="font-serif text-2xl text-brand-text mb-4">Mindfulness Practices</h3>
              <p className="text-brand-text/60 font-light leading-relaxed">Interactive sessions focusing on stress management, self-care routines, and setting clear personal growth milestones.</p>
            </div>
            <div className="p-8">
              <div className="w-16 h-16 rounded-full bg-brand-bg flex items-center justify-center mx-auto mb-6 shadow-premium">
                 <Sun className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="font-serif text-2xl text-brand-text mb-4">Somatic Wellness</h3>
              <p className="text-brand-text/60 font-light leading-relaxed">Integrative bodywork workshops combining kinesiologic tracking with specialized breathwork to support physical relaxation.</p>
            </div>
            <div className="p-8">
              <div className="w-16 h-16 rounded-full bg-brand-bg flex items-center justify-center mx-auto mb-6 shadow-premium">
                 <Wind className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="font-serif text-2xl text-brand-text mb-4">Sound Therapy Sessions</h3>
              <p className="text-brand-text/60 font-light leading-relaxed">Extended immersive acoustic sessions designed to guide the mind into a state of relaxation and support parasympathetic restoration.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="pt-16 pb-12">
        <WorkshopsPreview workshops={workshops} />
      </div>
      
      {/* Waitlist Section */}
      <section className="py-20 bg-brand-bg text-center border-t border-brand-teal/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: "url('/lemuria-assets/backgrounds/beige-texture.jpg')", backgroundSize: 'cover' }}></div>
             
        <div className="container px-6 mx-auto relative z-10 max-w-4xl">
          <div className="p-16 md:p-20 bg-white rounded-t-full rounded-b-[40px] border border-brand-teal/5 shadow-[0_20px_60px_rgba(45,90,71,0.08)] relative overflow-hidden text-center group">
              <div className="absolute inset-2 border border-brand-gold/10 rounded-t-full rounded-b-[32px] pointer-events-none group-hover:border-brand-gold/30 transition-colors duration-1000"></div>
              
              <h3 className="text-4xl md:text-5xl font-serif text-brand-text mb-8 italic mt-8 leading-[1.1]">Past & Future <br/><span className="text-brand-teal">Workshop Calendar</span></h3>
              <p className="text-brand-text/60 font-light max-w-xl mx-auto text-xl leading-relaxed">
                Our upcoming wellness workshops and sound retreats are currently being finalized. Join our mailing list to receive updates and invitations to these wellness events.
              </p>
              <div className="mt-12 pt-10 border-t border-brand-teal/10">
                <a href="/contact" className="inline-flex items-center gap-4 bg-brand-bg text-brand-teal border border-brand-teal/20 px-12 py-5 rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:bg-brand-teal hover:text-white transition-all shadow-premium hover:shadow-premiumHover relative z-10">
                  Join the Mailing List
                </a>
              </div>
          </div>
        </div>
      </section>

      {/* 10. Call to Action */}
      <CallToAction />
    </div>
  );
}

