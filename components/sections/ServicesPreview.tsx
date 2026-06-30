"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

import { usePathname } from "next/navigation";

interface ServicesPreviewProps {
  services: Service[];
}

function getServiceImage(service: Service, index: number): string {
  const name = (service.title || service.name || "").toLowerCase();
  if (name.includes("kinesiology")) {
    return "/lemuria-assets/services/kinesiology.jpg";
  }
  if (name.includes("private sound") || (name.includes("sound") && name.includes("therapy") && !name.includes("unwind") && !name.includes("reset") && !name.includes("restoration"))) {
    return "/lemuria-assets/services/private-sound.jpg";
  }
  if (name.includes("aromatherapy")) {
    return "/lemuria-assets/services/aromatherapy.jpg";
  }
  if (name.includes("mind-body") || name.includes("balance")) {
    return "/lemuria-assets/services/mind-body.jpg";
  }
  
  const serviceImages = [
    "/lemuria-assets/services/sound-bowls.jpg",
    "/lemuria-assets/services/gong.png",
    "/lemuria-assets/services/singing-bowls.jpg",
    "/lemuria-assets/services/healing.jpg",
    "/lemuria-assets/services/healing-session.jpg",
  ];
  return serviceImages[index % serviceImages.length];
}

export function ServicesPreview({ services }: ServicesPreviewProps) {
    const pathname = usePathname();
    const isServicesPage = pathname === '/services';

    return (
        <section id="services" className="pt-24 pb-12 bg-white relative overflow-hidden">
            {/* Ambient Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                 style={{ backgroundImage: "url('/lemuria-assets/backgrounds/beige-texture.jpg')", backgroundSize: 'cover' }}></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {!isServicesPage && (
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-24"
                    >
                        <div className="inline-flex items-center gap-3 mb-8">
                            <div className="w-12 h-[1px] bg-brand-gold/50"></div>
                            <span className="text-[10px] font-bold text-brand-gold tracking-[0.4em] uppercase">Our Services</span>
                        </div>
                        <h2 className="font-serif text-5xl md:text-6xl font-medium text-brand-text mb-8 tracking-tight">
                            Choose the Service <br />
                            <span className="text-brand-teal italic font-light">{"That's Right for You"}</span>
                        </h2>
                        <p className="text-brand-text/50 max-w-2xl mx-auto leading-relaxed font-light text-lg italic">
                            {"Whether you're seeking stress relief, emotional support or personal growth, we offer a range of personalised sessions tailored to your needs."}
                        </p>
                    </motion.div>
                )}
 
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.length === 0 ? (
                        <div className="col-span-full text-center py-20 bg-brand-bg/50 rounded-[40px] border border-brand-teal/5">
                            <p className="text-brand-text/40 font-light text-xl italic tracking-wide">Our sacred offerings are currently being refined.</p>
                        </div>
                    ) : (
                        (isServicesPage ? services : services.slice(0, 6)).map((service, index) => (
                            <motion.div
                                key={service.id || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.19, 1, 0.22, 1] }}
                                className="group relative h-[420px] rounded-[40px] overflow-hidden cursor-pointer shadow-premium border border-brand-teal/5"
                            >
                                {/* Background Image with Expansion Effect */}
                                <div className="absolute inset-0 z-0">
                                    <Image 
                                        src={getServiceImage(service, index)} 
                                        alt={service.title || 'Service Image'}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                                        className={`object-cover transition-all duration-1000 group-hover:scale-110 ${(service.title || service.name || "").toLowerCase().includes("kinesiology") ? "group-hover:opacity-0" : ""}`}
                                        quality={95}
                                    />
                                    {(service.title || service.name || "").toLowerCase().includes("kinesiology") && (
                                        <Image 
                                            src="/lemuria-assets/services/kinesiology-hover.jpg" 
                                            alt={`${service.title || service.name || 'Service Image'} - Alternate`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                                            className="object-cover absolute inset-0 transition-all duration-1000 opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-110"
                                            quality={95}
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-brand-text/25 group-hover:bg-brand-text/10 transition-all duration-700"></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-text/75 via-brand-text/15 to-transparent"></div>
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-8 z-10 flex flex-col justify-end h-full">
                                    <motion.div 
                                        className="transition-all duration-700 group-hover:translate-y-[-10px]"
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            <Badge className="bg-brand-gold text-white border-none py-1 px-4 rounded-full text-[10px] uppercase font-bold tracking-widest">
                                                60 MINS
                                            </Badge>
                                            <span className="text-white/60 text-xs font-bold uppercase tracking-widest">${service.price}</span>
                                        </div>
                                        <h3 className="font-serif text-2xl text-white mb-6 leading-tight">
                                            {(service as Record<string, unknown>).title as string || (service as Record<string, unknown>).name as string}
                                        </h3>
                                    </motion.div>

                                    {/* Slide-in Description */}
                                    <div className="max-h-0 opacity-0 group-hover:max-h-[200px] group-hover:opacity-100 transition-all duration-700 ease-in-out">
                                        <p className="text-white/70 text-sm font-light leading-relaxed mb-8 line-clamp-3 italic">
                                            {service.description}
                                        </p>
                                        <Link 
                                            href={`/book?service=${service.id}`}
                                            className="inline-flex items-center gap-4 text-primary-300 hover:text-white font-bold text-xs tracking-widest uppercase group/link transition-colors"
                                        >
                                            <span className="border-b border-primary-300/40 group-hover/link:border-white pb-0.5">Book Session</span>
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-2" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Glowing Border on Hover */}
                                <div className="absolute inset-0 border-2 border-brand-teal/0 group-hover:border-brand-teal/40 transition-all duration-700 rounded-[40px] z-20 pointer-events-none shadow-glow-gold opacity-0 group-hover:opacity-100"></div>
                            </motion.div>
                        ))
                    )}
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    {isServicesPage ? (
                        <Link href="/book" className="inline-flex items-center gap-6 text-brand-teal font-bold text-sm tracking-[0.3em] uppercase group">
                            Book Your Session
                            <div className="w-12 h-[1px] bg-brand-teal/30 group-hover:w-24 transition-all duration-700"></div>
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                        </Link>
                    ) : (
                        <Link href="/services" className="inline-flex items-center gap-6 text-brand-teal font-bold text-sm tracking-[0.3em] uppercase group">
                            View All Services
                            <div className="w-12 h-[1px] bg-brand-teal/30 group-hover:w-24 transition-all duration-700"></div>
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                        </Link>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
