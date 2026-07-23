"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { getTimeUntilWedding, formatNumber } from "@/lib/utils";

const CountUnit = ({ value, label }: { value: number; label: string }) => {
    const prevValue = useRef(value);
    const [flip, setFlip] = useState(false);

    useEffect(() => {
        if (prevValue.current !== value) {
            setFlip(true);
            const t = setTimeout(() => setFlip(false), 600);
            prevValue.current = value;
            return () => clearTimeout(t);
        }
    }, [value]);

    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                {/* Ring decoration */}
                <div className="absolute -inset-4 rounded-full opacity-30 ring-rotate"
                    style={{ border: '1px solid var(--gold)' }} />

                <div
                    className="glass-gold w-20 h-20 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center relative overflow-hidden"
                    style={{ boxShadow: '0 0 30px rgba(201,169,110,0.2)' }}
                >
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={value}
                            className="font-cinzel text-3xl sm:text-4xl font-bold text-gold-gradient"
                            initial={{ rotateX: -90, opacity: 0 }}
                            animate={{ rotateX: 0, opacity: 1 }}
                            exit={{ rotateX: 90, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                        >
                            {formatNumber(value)}
                        </motion.span>
                    </AnimatePresence>

                    {/* Shimmer on change */}
                    {flip && (
                        <motion.div
                            className="absolute inset-0"
                            style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)' }}
                            initial={{ x: "-100%" }}
                            animate={{ x: "200%" }}
                            transition={{ duration: 0.6 }}
                        />
                    )}

                    {/* Bottom glow */}
                    <div className="absolute bottom-0 left-0 right-0 h-1"
                        style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
                </div>
            </div>

            <p className="font-cinzel text-[10px] tracking-widest uppercase mt-4"
                style={{ color: 'var(--gold)', opacity: 0.8 }}>
                {label}
            </p>
        </div>
    );
};

export default function CountdownSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [time, setTime] = useState(getTimeUntilWedding());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(getTimeUntilWedding());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const weddingDate = new Date("2026-07-31T08:00:00+07:00");
    const isPast = new Date() >= weddingDate;

    return (
        <section ref={ref} className="section py-24 px-6 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="orb w-[600px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-900/10" />
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="mb-14"
                >
                    <span className="font-cinzel text-[10px] tracking-[0.5em] uppercase" style={{ color: 'var(--gold)' }}>
                        Menuju Hari Bahagia
                    </span>
                    <h2 className="font-playfair text-5xl font-bold text-gold-gradient mt-3 mb-4">
                        Hitung Mundur
                    </h2>
                    <div className="divider-gold w-32 mx-auto" />
                </motion.div>

                {isPast ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        className="glass-gold p-10 rounded-3xl"
                    >
                        <p className="font-vibes text-5xl text-gold-gradient">Alhamdulillah</p>
                        <p className="font-cormorant text-xl mt-4" style={{ color: 'var(--champagne)' }}>
                            Kami telah menikah! Terima kasih atas doa dan kehadiran kalian.
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="flex justify-center gap-6 sm:gap-12"
                    >
                        <CountUnit value={time.days} label="Hari" />
                        <CountUnit value={time.hours} label="Jam" />
                        <CountUnit value={time.minutes} label="Menit" />
                        <CountUnit value={time.seconds} label="Detik" />
                    </motion.div>
                )}

                {/* Wedding date info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-12 glass-luxury p-6 rounded-2xl"
                >
                    <div className="flex items-center justify-center gap-4">
                        <div className="text-3xl animate-float">💍</div>
                        <div>
                            <p className="font-cinzel text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--gold)' }}>
                                Hari Pernikahan
                            </p>
                            <p className="font-playfair text-2xl text-gold-gradient">
                                Jum&apos;at, 31 Juli 2026
                            </p>
                        </div>
                        <div className="text-3xl animate-float" style={{ animationDelay: '1s' }}>💍</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
