import React from 'react';
import { Sparkles, Target, TrendingUp, Users, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CallToAction } from '@/components/sections/CallToAction';

export const metadata = {
  title: "Workplace Wellbeing & Team Development | Lemuria",
  description: "Support your employees with practical wellbeing programs designed to reduce workplace stress, improve team connection, and help individuals perform at their best.",
};

const programs = [
  {
    title: "Team Building & Connection",
    description: "Create stronger workplace relationships through guided group experiences that encourage communication, trust and collaboration.",
    icon: Users,
    benefits: [
      "Improved team connection",
      "Increased workplace morale",
      "Better communication",
      "Stronger collaboration"
    ]
  },
  {
    title: "Goal Setting & Performance Coaching",
    description: "Using kinesiology-based techniques and coaching tools, employees identify personal and professional goals while creating practical action plans for success.",
    icon: Target,
    benefits: [
      "Increased motivation",
      "Greater clarity and focus",
      "Improved confidence",
      "Better accountability"
    ]
  },
  {
    title: "Stress & Resilience Programs",
    description: "Help employees manage workplace pressure and develop healthy strategies for maintaining wellbeing.",
    icon: TrendingUp,
    benefits: [
      "Reduced stress and overwhelm",
      "Improved emotional resilience",
      "Better work-life balance",
      "Increased energy and focus"
    ]
  }
];

const highlights = [
  "Experienced Facilitator",
  "Customised Programs",
  "Small or Large Teams",
  "Onsite or Offsite Delivery",
  "Practical & Engaging Sessions",
  "Wellness-Focused Approach"
];

const availableFor = [
  "Corporate Teams",
  "Leadership Groups",
  "Small Businesses",
  "Health & Wellness Days",
  "Staff Retreats",
  "Professional Development Programs"
];

export default function CoachingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg pb-32">
      {/* Luxury Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-brand-teal">
        <div className="absolute inset-0 opacity-[0.2] pointer-events-none mix-blend-screen" 
             style={{ backgroundImage: "url('/lemuria-assets/backgrounds/teal-texture.jpg')", backgroundSize: 'cover' }}></div>
        
        <div className="container relative z-10 px-6 mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2 mb-8 rounded-full bg-brand-beige/10 border border-brand-beige/30 backdrop-blur-md text-brand-beige">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Workplace Wellness</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-white tracking-tight leading-[1.1] mb-10 drop-shadow-premium">
            Workplace Wellbeing & <br /> <span className="text-brand-beige italic font-light">Team Development</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-white/70 font-light leading-relaxed mb-6 italic">
            &ldquo;At Lemuria, we provide tailored workplace wellbeing experiences that combine Sound Therapy, Kinesiology and Personal Development Coaching.&rdquo;
          </p>
        </div>
      </section>

      {/* Main Philosophy Section */}
      <section className="pt-20 pb-16 relative bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-brand-text mb-6">Helping Teams Thrive</h2>
            <p className="text-lg text-brand-text/60 leading-relaxed font-light">
              Support your employees with practical wellbeing programs designed to reduce workplace stress, improve team connection, and help individuals perform at their best.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {programs.map((program, idx) => {
              const Icon = program.icon;
              return (
                <div key={idx} className="bg-brand-bg/40 p-8 rounded-[40px] border border-brand-teal/5 shadow-premium flex flex-col justify-between h-full group hover:shadow-premiumHover hover:-translate-y-1 transition-all duration-300">
                  <div>
                    <div className="w-12 h-12 rounded-[20px] bg-white shadow-premium flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-brand-teal" />
                    </div>
                    <h3 className="font-serif text-xl tracking-tight text-brand-text mb-4">{program.title}</h3>
                    <p className="text-brand-text/60 font-light text-sm leading-relaxed mb-6">{program.description}</p>
                  </div>
                  
                  <div className="border-t border-brand-teal/10 pt-4 space-y-2.5">
                    <p className="text-[9px] font-bold text-brand-gold uppercase tracking-widest mb-1">Benefits include:</p>
                    {program.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-xs text-brand-text/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pt-12 border-t border-brand-teal/5">
            {/* Why Choose Us */}
            <div className="space-y-8">
              <h3 className="font-serif text-3xl text-brand-text">Why Businesses Choose Us</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-brand-bg/20 p-4 rounded-2xl border border-brand-teal/5">
                    <Award className="w-5 h-5 text-brand-gold shrink-0" />
                    <span className="text-sm font-light text-brand-text/80">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available For */}
            <div className="space-y-8">
              <h3 className="font-serif text-3xl text-brand-text">Available For</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableFor.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-brand-bg/20 p-4 rounded-2xl border border-brand-teal/5">
                    <ShieldCheck className="w-5 h-5 text-brand-teal shrink-0" />
                    <span className="text-sm font-light text-brand-text/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 p-12 md:p-16 lg:p-20 bg-brand-bg rounded-[50px] border border-brand-teal/5 shadow-[0_20px_60px_rgba(45,90,71,0.08)] text-center max-w-4xl mx-auto">
            <h3 className="text-4xl font-serif text-brand-text mb-6 italic">Ready to create a healthier, happier and more productive workplace?</h3>
            <p className="text-brand-text/60 font-light leading-relaxed mb-10 text-lg">
              {"Whether you're planning a team-building day, leadership retreat, wellness initiative or staff appreciation event, our programs can be customised to suit your organisation."}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href="/contact?subject=Workplace Wellbeing Package" className="inline-flex items-center justify-center px-8 py-5 bg-brand-teal text-white rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:bg-brand-text transition-colors shadow-premium">Request a Workplace Package</a>
              <a href="/contact?subject=Workplace Wellbeing Discovery Call" className="inline-flex items-center justify-center px-8 py-5 bg-white text-brand-text border border-brand-teal/10 rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:bg-brand-teal/5 transition-colors shadow-premium">Book a Discovery Call</a>
            </div>
          </div>

        </div>
      </section>
      
      {/* Footer Call to Action */}
      <CallToAction />
    </div>
  );
}
