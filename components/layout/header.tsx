"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Sparkles, ArrowRight } from "lucide-react";

const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Coaching", href: "/coaching" },
    { name: "Sound Healing", href: "/sound-healing" },
    { name: "Workshops", href: "/workshops" },
    { name: "Testimonials", href: "/testimonials" },
];

export function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Hide on scroll down, show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <motion.header 
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-brand-teal/5 shadow-[0_8px_40px_rgba(45,90,71,0.08)]"
            style={{ backgroundColor: '#F2EEE8' }}
        >
            <div className="max-w-[1600px] mx-auto w-full px-6 xl:px-12">
                {/* Desktop Version (3-Column Grid) */}
                <div className="hidden xl:grid grid-cols-3 items-center h-28 relative">
                    {/* Logo - Column 1 */}
                    <div className="flex justify-start">
                        <Link href="/" className="z-10 group transition-all duration-500 shrink-0 flex items-center gap-3">
                            <div className="flex items-center gap-3">
                                {/* Heart/Pulse SVG Icon */}
                                <div className="w-12 h-12 rounded-2xl bg-brand-teal/5 flex items-center justify-center border border-brand-teal/10 shadow-premium group-hover:scale-105 transition-all duration-500">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2.5" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        className="w-6 h-6 text-brand-teal"
                                    >
                                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                    </svg>
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-base font-bold tracking-[0.25em] text-brand-teal uppercase font-sans">Heart</span>
                                    <span className="text-[10px] font-bold tracking-[0.4em] text-brand-gold uppercase font-sans">Strong</span>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation - Column 2 (Centered) */}
                    <nav className="flex justify-center items-center">
                        <div className="flex items-center gap-6 xl:gap-8 bg-white/40 backdrop-blur-xl px-10 py-5 rounded-full border border-brand-teal/10 shadow-[0_15px_40px_rgba(45,90,71,0.08)] ring-1 ring-black/5 hover:bg-white/60 transition-all duration-500 group/pill">
                            {navigationLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`relative text-[11px] font-bold transition-all uppercase tracking-[0.25em] text-center font-sans whitespace-nowrap pb-1
                                            ${isActive ? "text-brand-teal font-extrabold" : "text-brand-text/50 hover:text-brand-teal"}`}
                                    >
                                        {link.name}
                                        {isActive && (
                                            <motion.div 
                                                layoutId="activeIndicator"
                                                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-gold"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </nav>

                    {/* Action Button - Column 3 */}
                    <div className="flex justify-end pr-2">
                        <Link 
                            href="/book" 
                            className="bg-brand-teal text-white px-8 py-5 rounded-full text-[11px] font-bold tracking-[0.25em] uppercase shadow-premium hover:shadow-premiumHover transition-all hover:scale-105 z-10"
                        >
                            Book Session
                        </Link>
                    </div>
                </div>

                {/* Mobile Version (Simplified Flex) */}
                <div className="xl:hidden flex items-center justify-between h-24">
                    <Link href="/" className="z-10 group transition-all duration-500 shrink-0 flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-brand-teal/5 flex items-center justify-center border border-brand-teal/10 shadow-premium">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="w-5 h-5 text-brand-teal"
                            >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-sm font-bold tracking-[0.2em] text-brand-teal uppercase font-sans">Heart</span>
                            <span className="text-[8px] font-bold tracking-[0.3em] text-brand-gold uppercase font-sans">Strong</span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link 
                            href="/book" 
                            className="bg-brand-teal text-white px-5 py-2.5 rounded-full text-[9px] font-bold tracking-widest uppercase shadow-premium"
                        >
                            Book
                        </Link>
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger className="p-2 text-brand-text hover:text-brand-teal transition-colors">
                                <Menu className="w-6 h-6" />
                                <span className="sr-only">Toggle Menu</span>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:w-[400px] bg-brand-bg border-brand-teal/10">
                                <SheetHeader className="text-left mb-12 mt-4">
                                        <SheetTitle className="font-serif text-3xl tracking-tight flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-brand-teal flex items-center justify-center shadow-premium">
                                                <Sparkles className="w-5 h-5 text-white" />
                                            </div>
                                            <span>Heart <span className="text-brand-teal italic font-light">Strong Menu</span></span>
                                        </SheetTitle>
                                </SheetHeader>
                                
                                <div className="flex flex-col gap-6 mt-12">
                                     {navigationLinks.map((link) => {
                                         const isActive = pathname === link.href;
                                         return (
                                             <Link
                                                 key={link.name}
                                                 href={link.href}
                                                 onClick={() => setIsOpen(false)}
                                                 className={`text-2xl font-serif transition-all flex items-center justify-between group pl-2
                                                     ${isActive ? "text-brand-teal font-medium border-l-2 border-brand-gold" : "text-brand-text/70 hover:text-brand-teal border-l-2 border-transparent"}`}
                                             >
                                                 {link.name}
                                                 <ArrowRight className={`w-6 h-6 transition-all ${isActive ? "opacity-100 translate-x-0 text-brand-gold" : "opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 text-brand-teal"}`} />
                                             </Link>
                                         );
                                     })}
                                    <div className="h-px bg-brand-teal/10 my-8" />
                                    <Link 
                                        href="/book" 
                                        onClick={() => setIsOpen(false)}
                                        className="px-8 py-5 bg-brand-teal text-white rounded-full text-xs font-bold tracking-widest uppercase text-center shadow-premium hover:shadow-premiumHover transition-all"
                                    >
                                        Reserve Your Session
                                    </Link>
                                    <Link 
                                        href="/admin/dashboard" 
                                        onClick={() => setIsOpen(false)}
                                        className="px-8 py-5 bg-white text-brand-text rounded-full text-xs font-bold tracking-widest uppercase text-center border border-brand-teal/10 hover:bg-brand-teal/5 transition-all mt-4"
                                    >
                                        Admin Sanctuary
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
