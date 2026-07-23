"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Image from "next/image";

const Firework = ({ x, y, color }: { x: number; y: number; color: string }) => (
    <div className="fixed pointer-events-none" style={{ left: `${x}%`, top: `${y}%`, zIndex: 50 }}>
        {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            const rad = (angle * Math.PI) / 180;
            return (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{ background: color }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                        x: Math.cos(rad) * (60 + Math.random() * 40),
                        y: Math.sin(rad) * (60 + Math.random() * 40),
                        opacity: 0,
                        scale: 0,
                    }}
                    transition={{ duration: 1.5 + Math.random() * 0.5, ease: "easeOut" }}
                />
            );
        })}
        <motion.div
            className="absolute w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ background: color }}
            initial={{ scale: 3, opacity: 1 }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
        />
    </div>
);

export default function ClosingSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [fireworks, setFireworks] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

    useEffect(() => {
        if (inView) {
            const colors = ["#C9A96E", "#FFD700", "#FFC0CB", "#FFFFFF", "#E8D5A3"];
            const newFW = Array.from({ length: 4 }, (_, i) => ({
                id: i,
                x: 10 + Math.random() * 80,
                y: 10 + Math.random() * 70,
                color: colors[Math.floor(Math.random() * colors.length)],
            }));
            setFireworks(newFW);
            const t = setTimeout(() => setFireworks([]), 3500);
            return () => clearTimeout(t);
        }
    }, [inView]);

    return (
        <section ref={ref} className="section py-24 px-6 relative overflow-hidden min-h-screen flex flex-col items-center justify-center">

            {/* Soft bottom vignette to merge with fixed background */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(20,16,16,0.85) 100%)' }} />

            {/* Glowing orb behind photo */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="orb w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-900/15" />
            </div>

            {/* Fireworks */}
            {fireworks.map((fw) => (
                <Firework key={fw.id} x={fw.x} y={fw.y} color={fw.color} />
            ))}

            {/* Floating elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {["🦋", "🌸", "✨", "💫", "🌟", "💖"].map((e, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-2xl sm:text-3xl opacity-20"
                        style={{
                            left: `${5 + (i * 15) % 90}%`,
                            top: `${80}%`,
                        }}
                        animate={inView ? {
                            y: [0, -300, -600],
                            opacity: [0, 0.4, 0],
                            x: [(Math.random() - 0.5) * 100],
                            rotate: [0, Math.random() > 0.5 ? 360 : -360],
                        } : {}}
                        transition={{ duration: 5 + i * 0.5, delay: i * 0.3, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
                    >
                        {e}
                    </motion.div>
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl w-full">

                {/* Photo Thank You / Couple */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
                    className="mb-10 relative"
                >
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full overflow-hidden shadow-luxury animate-float"
                        style={{ border: '3px solid rgba(184, 150, 46, 0.5)', boxShadow: '0 0 30px rgba(184, 150, 46, 0.25)' }}>
                        <Image src="/photo-couple-2.jpg" alt="Rizky & Ika" fill className="object-cover" style={{ objectPosition: 'center 20%' }} />
                    </div>
                </motion.div>

                {/* Thank you */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="mb-8"
                >
                    <h2 className="font-vibes text-7xl sm:text-8xl text-gold-gradient mb-5 glow-gold-text">
                        Terima Kasih
                    </h2>
                    <p className="font-cormorant text-xl sm:text-2xl italic px-4" style={{ color: 'rgba(232,213,163,0.9)' }}>
                        Merupakan suatu kehormatan dan kebahagiaan bagi kami <br className="hidden sm:block" />
                        apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan <br className="hidden sm:block" />
                        do&apos;a restu kepada kami.
                    </p>
                </motion.div>

                {/* Wassalamualaikum */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="glass-gold px-12 py-5 rounded-3xl mb-12 border-gold-pulse shadow-luxury"
                >
                    <h3 className="font-cinzel text-lg sm:text-xl tracking-[0.2em] text-gold-gradient">
                        WASSALAMUALAIKUM WR. WB.
                    </h3>
                </motion.div>

                {/* Names */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7, duration: 1 }}
                    className="mb-8 flex flex-col items-center"
                >
                    <p className="font-cormorant text-xl mb-4" style={{ color: 'rgba(232,213,163,0.7)' }}>
                        Kami yang berbahagia,
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
                        <p className="font-vibes text-4xl text-gold-gradient drop-shadow-md">Muhammad Rizky Akbar</p>
                        <span className="font-vibes text-3xl" style={{ color: 'var(--gold)' }}>&amp;</span>
                        <p className="font-vibes text-4xl text-gold-gradient drop-shadow-md">Ika Rahim</p>
                    </div>
                </motion.div>

                {/* Credit */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.5 }}
                    className="mt-16 flex flex-col items-center gap-2"
                >
                    <div className="w-10 h-px bg-gold-dark opacity-30 mb-2"></div>
                    <p className="font-inter text-[10px] tracking-widest uppercase" style={{ color: 'var(--gold)', opacity: 0.5 }}>
                        Made with 🤍 for Rizky & Ika
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
