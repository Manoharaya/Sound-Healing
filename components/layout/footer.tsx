import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import { NewsletterForm } from '@/components/forms/NewsletterForm';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer 
            className="relative overflow-hidden pt-24 pb-12"
            style={{ backgroundColor: '#253A27' }}
        >
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
                 style={{ backgroundImage: "url('/lemuria-assets/backgrounds/teal-texture.jpg')", backgroundSize: 'cover' }}></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="block mb-12 group transition-all duration-500 w-[240px]">
                            <div className="flex items-center gap-3">
                                {/* Heart/Pulse SVG Icon */}
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-premium group-hover:scale-105 transition-all duration-500">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2.5" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        className="w-6 h-6 text-brand-gold"
                                    >
                                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                    </svg>
                                </div>
                                <div className="flex flex-col text-left font-sans">
                                    <span className="text-base font-bold tracking-[0.25em] text-white uppercase">Lemuria</span>
                                </div>
                            </div>
                        </Link>
                        <p className="text-white/40 text-sm leading-relaxed mb-8 font-light italic">
                            &ldquo;Helping you reduce stress, find clarity and feel more like yourself again.&rdquo;
                        </p>
                        <div className="flex gap-10">
                            <a href="https://instagram.com/lemuriahealing" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-brand-gold transition-colors">
                                <Instagram className="w-5 h-5" />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="https://facebook.com/lemuriahealing" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-brand-gold transition-colors">
                                <Facebook className="w-5 h-5" />
                                <span className="sr-only">Facebook</span>
                            </a>
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h4 className="text-white font-bold mb-8 text-[10px] uppercase tracking-[0.2em]">The Path</h4>
                        <ul className="space-y-4">
                            <li><Link href="/services" className="text-white/40 hover:text-white text-sm transition-colors font-light">Services</Link></li>
                            <li><Link href="/coaching" className="text-white/40 hover:text-white text-sm transition-colors font-light">Corporate Wellbeing</Link></li>
                            <li><Link href="/sound-healing" className="text-white/40 hover:text-white text-sm transition-colors font-light">Sound Therapy</Link></li>
                            <li><Link href="/friday-unwind" className="text-white/40 hover:text-white text-sm transition-colors font-light">Friday Sound Session</Link></li>
                            <li><Link href="/saturday-reset" className="text-white/40 hover:text-white text-sm transition-colors font-light">Saturday Sound Session</Link></li>
                            <li><Link href="/sunday-restoration" className="text-white/40 hover:text-white text-sm transition-colors font-light">Sunday Sound Session</Link></li>
                            <li><Link href="/workshops" className="text-white/40 hover:text-white text-sm transition-colors font-light">Workshops & Events</Link></li>
                        </ul>
                    </div>

                    {/* Sanctuary */}
                    <div>
                        <h4 className="text-white font-bold mb-8 text-[10px] uppercase tracking-[0.2em]">Sanctuary</h4>
                        <ul className="space-y-4">
                            <li><Link href="/testimonials" className="text-white/40 hover:text-white text-sm transition-colors font-light">Testimonials</Link></li>
                            <li><Link href="/contact" className="text-white/40 hover:text-white text-sm transition-colors font-light">Connect</Link></li>
                            <li><Link href="/privacy" className="text-white/40 hover:text-white text-sm transition-colors font-light">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-bold mb-8 text-[10px] uppercase tracking-[0.2em]">Stay Connected</h4>
                        <p className="text-white/40 text-sm mb-6 leading-relaxed font-light">Join our community for wellbeing tips and upcoming events.</p>
                        <NewsletterForm variant="footer" />
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.25em] font-bold text-white/20 gap-6 pt-12 border-t border-white/5">
                    <p>© {currentYear} Lemuria. All Rights Reserved.</p>
                    <div className="flex items-center gap-2">
                        <span>Designed for</span>
                        <span className="text-brand-gold">Jenny Gillson</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
