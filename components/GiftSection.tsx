"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const GiftCard = ({
    icon,
    title,
    subtitle,
    content,
    copyValue,
    delay,
    inView,
}: {
    icon: string;
    title: string;
    subtitle: string;
    content: React.ReactNode;
    copyValue?: string;
    delay: number;
    inView: boolean;
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (copyValue) {
            navigator.clipboard.writeText(copyValue);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="glass-gold p-8 rounded-3xl relative overflow-hidden group shadow-luxury max-w-sm mx-auto"
        >
            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="text-4xl animate-float-slow">{icon}</div>
                    <div className="text-left">
                        <h3 className="font-cinzel text-lg text-gold-gradient">{title}</h3>
                        <p className="font-inter text-xs" style={{ color: 'rgba(201,169,110,0.6)' }}>{subtitle}</p>
                    </div>
                </div>

                <div className="divider-gold mb-6" />

                {/* Content */}
                <div className="mb-6 text-center">{content}</div>

                {/* Copy button */}
                {copyValue && (
                    <motion.button
                        onClick={handleCopy}
                        className="w-full py-4 rounded-xl font-cinzel text-sm tracking-widest uppercase relative overflow-hidden"
                        style={{
                            background: copied ? 'rgba(201,169,110,0.3)' : 'rgba(201,169,110,0.1)',
                            border: '1px solid rgba(201,169,110,0.3)',
                            color: 'var(--gold)',
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.span
                            key={copied ? "copied" : "copy"}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center justify-center gap-2"
                        >
                            {copied ? "✓ Disalin!" : "📋 Salin Nomor"}
                        </motion.span>
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
};

export default function GiftSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="gift" ref={ref} className="section py-24 px-6 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="orb w-96 h-96 top-0 left-1/2 -translate-x-1/2 bg-amber-900/10" />
            </div>

            <div className="max-w-2xl mx-auto relative z-10 text-center">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="mb-10"
                >
                    <span className="font-cinzel text-[10px] tracking-[0.5em] uppercase" style={{ color: 'var(--gold)' }}>
                        Tanda Kasih
                    </span>
                    <h2 className="font-playfair text-5xl font-bold text-gold-gradient mt-3 mb-4">
                        Wedding Gift
                    </h2>
                    <div className="divider-gold w-32 mx-auto mb-6" />
                    <p className="font-cormorant text-lg" style={{ color: 'rgba(232,213,163,0.7)' }}>
                        Doa restu Anda merupakan karunia yang sangat berarti bagi kami. <br className="hidden sm:block" />
                        Namun, apabila Bapak/Ibu/Saudara/i bermaksud memberikan tanda kasih, <br className="hidden sm:block" />
                        dapat melalui dompet digital (E-Wallet) di bawah ini:
                    </p>
                </motion.div>

                {/* E-Wallet Card */}
                <GiftCard
                    icon="💳"
                    title="E-Wallet"
                    subtitle="OVO / DANA / GOPAY"
                    content={
                        <div>
                            <p className="font-inter text-sm mb-2" style={{ color: 'rgba(232,213,163,0.6)' }}>Nomor Handphone</p>
                            <p className="font-playfair text-4xl text-gold-gradient drop-shadow-md tracking-wider">0859 6714 1418</p>
                            <p className="font-cormorant text-lg mt-3" style={{ color: 'rgba(232,213,163,0.8)' }}>
                                a.n Muhammad Rizky Akbar
                            </p>
                        </div>
                    }
                    copyValue="085967141418"
                    delay={0.2}
                    inView={inView}
                />
            </div>
        </section>
    );
}
