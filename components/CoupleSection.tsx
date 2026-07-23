"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

export default function CoupleSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

    return (
        <section id="couple" ref={ref} className="section py-24 px-6 relative overflow-hidden">
            <div className="max-w-4xl mx-auto relative z-10 text-center">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="mb-12"
                >
                    <span className="font-cinzel text-[10px] tracking-[0.5em] uppercase" style={{ color: 'var(--gold)' }}>
                        Mempelai
                    </span>
                    <h2 className="font-playfair text-5xl sm:text-6xl font-bold text-gold-gradient mt-3 mb-4">
                        Pengantin Kami
                    </h2>
                    <div className="divider-gold w-40 mx-auto" />
                </motion.div>

                {/* Combined Photo Frame */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative mx-auto mb-14"
                    style={{ width: '280px', height: '380px' }}
                    whileHover={{ scale: 1.02 }}
                >
                    {/* Photo */}
                    <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-luxury"
                        style={{ border: '2px solid rgba(184,150,46,0.35)', boxShadow: '0 0 50px rgba(184,150,46,0.12)' }}>
                        <Image
                            src="/photo-couple-2.jpg"
                            alt="Muhammad Rizky Akbar & Ika Rahim"
                            fill
                            className="object-cover"
                            style={{ objectPosition: 'center 20%' }}
                        />
                        {/* subtle vignette */}
                        <div className="absolute inset-0 pointer-events-none"
                            style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(20,16,16,0.55) 100%)' }}
                        />
                        {/* Gold line at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5"
                            style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
                    </div>
                </motion.div>

                {/* Couple Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4 items-center">

                    {/* Boy */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="text-center"
                    >
                        <h2 className="font-vibes text-4xl sm:text-5xl mb-2 text-gold-gradient leading-tight">
                            Muhammad Rizky Akbar
                        </h2>
                        <p className="font-cormorant text-xl italic mb-3" style={{ color: 'var(--rose-gold-light)' }}>(Boy)</p>
                        <div className="divider-gold w-24 mx-auto mb-3" />
                        <p className="font-cormorant text-base" style={{ color: 'rgba(232,213,163,0.7)' }}>Putra pertama dari</p>
                        <p className="font-playfair text-lg font-medium mt-1" style={{ color: 'var(--champagne)' }}>Bpk. Sanusi (Acang)</p>
                        <p className="font-inter text-sm" style={{ color: 'rgba(232,213,163,0.6)' }}>&amp;</p>
                        <p className="font-playfair text-lg font-medium" style={{ color: 'var(--champagne)' }}>Ibu Wani</p>
                    </motion.div>

                    {/* Ampersand for Mobile */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="md:hidden flex justify-center py-4"
                    >
                        <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center pulse-gold border-gold-pulse">
                            <span className="font-vibes text-4xl text-gold-gradient">&amp;</span>
                        </div>
                    </motion.div>

                    {/* Ampersand for Desktop (Absolute Center) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="hidden md:flex absolute left-1/2 bottom-[15%] -translate-x-1/2 translate-y-1/2 z-20 items-center justify-center"
                    >
                        <div className="w-20 h-20 rounded-full glass-gold flex items-center justify-center pulse-gold border-gold-pulse">
                            <span className="font-vibes text-5xl text-gold-gradient">&amp;</span>
                        </div>
                    </motion.div>

                    {/* Girl */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 1.0, duration: 1 }}
                        className="text-center"
                    >
                        <h2 className="font-vibes text-4xl sm:text-5xl mb-2 text-gold-gradient leading-tight">
                            Ika Rahim
                        </h2>
                        <p className="font-cormorant text-xl italic mb-3" style={{ color: 'var(--rose-gold-light)' }}>(Ika)</p>
                        <div className="divider-gold w-24 mx-auto mb-3" />
                        <p className="font-cormorant text-base" style={{ color: 'rgba(232,213,163,0.7)' }}>Putri kedua dari</p>
                        <p className="font-playfair text-lg font-medium mt-1" style={{ color: 'var(--champagne)' }}>Bpk. Masim (Alm)</p>
                        <p className="font-inter text-sm" style={{ color: 'rgba(232,213,163,0.6)' }}>&amp;</p>
                        <p className="font-playfair text-lg font-medium" style={{ color: 'var(--champagne)' }}>Ibu Ernih</p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
