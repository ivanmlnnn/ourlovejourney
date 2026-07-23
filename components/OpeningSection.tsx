"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { Variants } from "framer-motion";

const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

export default function OpeningSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <section ref={ref} className="section py-24 px-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="orb w-96 h-96 top-0 left-0 bg-amber-900/10" />
                <div className="orb w-64 h-64 bottom-0 right-0 bg-yellow-900/10" />
            </div>

            <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="max-w-3xl mx-auto text-center relative z-10"
            >
                {/* Islamic ornament top */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                    className="text-5xl mb-8"
                    style={{ color: 'var(--gold)' }}
                >
                    ✦ ❋ ✦
                </motion.div>

                {/* Assalamualaikum */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="mb-8"
                >
                    <div className="divider-gold mb-4" />
                    <h2 className="font-cinzel text-sm tracking-[0.5em] uppercase text-gold-gradient mb-6">
                        ASSALAMUALAIKUM WR. WB.
                    </h2>
                    <div className="divider-gold" />
                </motion.div>

                {/* Arabic quote */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="glass-luxury p-8 rounded-3xl mb-10"
                >
                    <p className="font-arabic text-2xl sm:text-3xl text-right leading-relaxed mb-6" style={{ color: 'var(--gold-light)' }}>
                        سُبْحَانَ الَّذِي خَلَقَ الْأَزْوَاجَ
                    </p>
                    <div className="divider-gold mb-6" />
                    <p className="font-cormorant text-xl sm:text-2xl italic leading-relaxed" style={{ color: 'var(--champagne)' }}>
                        &ldquo;Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan putra-putri kami.&rdquo;
                    </p>
                </motion.div>

                {/* Greeting text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="mb-8"
                >
                    <p className="font-cormorant text-lg sm:text-xl leading-relaxed" style={{ color: 'rgba(232,213,163,0.85)' }}>
                        Dengan rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara untuk menghadiri acara pernikahan kami.
                    </p>
                </motion.div>

                {/* Bottom ornament */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-4xl"
                    style={{ color: 'var(--gold)' }}
                >
                    ✦ ❋ ✦
                </motion.div>
            </motion.div>
        </section>
    );
}
