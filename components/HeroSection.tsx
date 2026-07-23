"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function HeroSection() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

    return (
        <section ref={ref} id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">


            {/* Subtle floating particles */}
            <div className="absolute inset-0 z-[1] pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-sm select-none"
                        style={{
                            left: `${6 + (i * 8) % 88}%`,
                            top: `${8 + (i * 11) % 72}%`,
                            color: i % 2 === 0 ? 'var(--gold)' : 'var(--gold-light)',
                            opacity: 0.25,
                        }}
                        animate={{ y: [0, -14, 0], opacity: [0.15, 0.4, 0.15] }}
                        transition={{ duration: 5 + (i % 3), repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                    >
                        {["✦", "❋", "✿", "❀"][i % 4]}
                    </motion.div>
                ))}
            </div>

            {/* Content */}
            <motion.div
                className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl w-full"
                style={{ opacity }}
            >
                {/* Small ornament */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
                    className="mb-7"
                >
                    <div className="w-20 h-20 mx-auto relative animate-float">
                        <Image src="/ornament.png" alt="" fill className="object-contain" />
                    </div>
                </motion.div>

                {/* Bismillah */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.9 }}
                    className="mb-7 glass-luxury px-7 py-4 rounded-2xl"
                >
                    <p className="font-arabic text-2xl sm:text-3xl leading-relaxed text-gold-gradient">
                        بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </p>
                </motion.div>

                {/* Separator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                    className="flex items-center gap-4 w-full mb-5"
                >
                    <div className="divider-gold flex-1" />
                    <span className="font-cinzel text-[9px] tracking-[0.5em] uppercase" style={{ color: 'var(--gold)' }}>
                        The Wedding Of
                    </span>
                    <div className="divider-gold flex-1" />
                </motion.div>

                {/* Names — the hero centerpiece */}
                <motion.h1
                    initial={{ opacity: 0, y: 36 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-vibes leading-tight text-gold-gradient glow-gold-text mb-1"
                    style={{ fontSize: 'clamp(2.8rem, 9vw, 5rem)' }}
                >
                    Muhammad Rizky Akbar
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                    className="font-vibes text-3xl my-2"
                    style={{ color: 'var(--gold-light)' }}
                >
                    &amp;
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 36 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-vibes leading-tight text-gold-gradient glow-gold-text mb-7"
                    style={{ fontSize: 'clamp(2.8rem, 9vw, 5rem)' }}
                >
                    Ika Rahim
                </motion.h1>

                {/* Date badge */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                    className="glass-gold px-9 py-4 rounded-3xl border-gold-pulse"
                >
                    <p className="font-cinzel text-[9px] tracking-[0.35em] uppercase mb-1" style={{ color: 'var(--gold-light)' }}>
                        Jum&apos;at
                    </p>
                    <p className="font-playfair font-bold text-gold-gradient" style={{ fontSize: 'clamp(2rem, 7vw, 3rem)' }}>
                        31 Juli 2026
                    </p>
                    <p className="font-cinzel text-[9px] tracking-[0.25em] uppercase mt-1" style={{ color: 'var(--gold-light)' }}>
                        Kp. Pondok Soga ✦ Bekasi
                    </p>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="mt-12 flex flex-col items-center gap-2"
                >
                    <p className="font-cinzel text-[9px] tracking-widest uppercase" style={{ color: 'var(--gold)', opacity: 0.5 }}>
                        Scroll
                    </p>
                    <div className="w-px h-10 relative overflow-hidden" style={{ background: 'rgba(184,150,46,0.15)' }}>
                        <motion.div
                            className="absolute top-0 w-full h-1/2"
                            style={{ background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)' }}
                            animate={{ y: ["-100%", "200%"] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
