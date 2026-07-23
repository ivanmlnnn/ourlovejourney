"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CoverPageProps {
    guestName: string;
    onOpen: () => void;
}

export default function CoverPage({ guestName, onOpen }: CoverPageProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "radial-gradient(ellipse at 40% 30%, #1e1508 0%, #141010 50%, #0A0808 100%)" }}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.5 } }}
        >
            {/* Subtle ambient orbs */}
            <div className="absolute top-1/4 left-1/4 w-80 h-80 orb bg-amber-900/12" />
            <div className="absolute bottom-1/3 right-1/4 w-56 h-56 orb bg-yellow-900/8" />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-sm w-full">

                {/* Couple Photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                    className="mb-8 relative"
                >
                    <div className="w-36 h-36 mx-auto rounded-full overflow-hidden relative"
                        style={{
                            border: '2px solid rgba(184,150,46,0.5)',
                            boxShadow: '0 0 24px rgba(184,150,46,0.25), 0 8px 32px rgba(0,0,0,0.5)'
                        }}>
                        <Image
                            src="/photo-couple-2.jpg"
                            alt="Rizky & Ika"
                            fill
                            className="object-cover"
                            style={{ objectPosition: 'center 20%' }}
                            priority
                        />
                    </div>
                </motion.div>

                {/* Wedding Invitation */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mb-3"
                >
                    <div className="flex items-center gap-3 mb-1">
                        <div className="divider-gold flex-1" />
                        <span className="font-cinzel text-[9px] tracking-[0.45em] uppercase" style={{ color: 'var(--gold)' }}>
                            Wedding Invitation
                        </span>
                        <div className="divider-gold flex-1" />
                    </div>
                </motion.div>

                {/* Couple Names */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.9 }}
                    className="font-vibes leading-tight mb-1 text-gold-gradient"
                    style={{ fontSize: 'clamp(2.2rem, 8vw, 3rem)' }}
                >
                    Muhammad Rizky Akbar
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="font-vibes text-2xl my-1"
                    style={{ color: 'var(--gold-light)' }}
                >
                    &amp;
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.9 }}
                    className="font-vibes leading-tight mb-5 text-gold-gradient"
                    style={{ fontSize: 'clamp(2.2rem, 8vw, 3rem)' }}
                >
                    Ika Rahim
                </motion.h1>

                {/* Date */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.05, duration: 0.7 }}
                    className="font-cinzel text-[10px] tracking-[0.3em] uppercase mb-5"
                    style={{ color: 'var(--gold-light)' }}
                >
                    Jum&apos;at ✦ 31 Juli 2026
                </motion.p>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.1, duration: 0.7 }}
                    className="divider-gold w-44 mb-5"
                />

                {/* Guest */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.7 }}
                    className="mb-7 glass-luxury px-7 py-3 rounded-2xl"
                >
                    <p className="font-inter text-[9px] tracking-widest uppercase mb-1" style={{ color: 'var(--gold)', opacity: 0.7 }}>
                        Kepada Yth.
                    </p>
                    <p className="font-cormorant text-xl italic" style={{ color: 'var(--champagne)' }}>
                        {guestName}
                    </p>
                </motion.div>

                {/* Open Button — with elegant pulse animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                >
                    <motion.button
                        onClick={onOpen}
                        className="btn-luxury px-10 py-4 rounded-2xl font-cinzel text-xs tracking-widest uppercase relative overflow-hidden"
                        style={{ color: '#1A1208' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            boxShadow: [
                                '0 0 20px rgba(184,150,46,0.3)',
                                '0 0 40px rgba(184,150,46,0.5)',
                                '0 0 20px rgba(184,150,46,0.3)',
                            ],
                        }}
                        transition={{
                            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                        }}
                    >
                        <span className="flex items-center gap-3 relative z-10">
                            <motion.span
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            >✦</motion.span>
                            <span>Buka Undangan</span>
                            <motion.span
                                animate={{ rotate: [360, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            >✦</motion.span>
                        </span>
                    </motion.button>
                </motion.div>

                {/* Hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ delay: 2.2, duration: 2.5, repeat: Infinity }}
                    className="mt-6 font-inter text-[9px] tracking-widest uppercase"
                    style={{ color: 'var(--gold)' }}
                >
                    Ketuk untuk membuka
                </motion.p>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(10,8,8,0.7), transparent)' }} />
        </motion.div>
    );
}
