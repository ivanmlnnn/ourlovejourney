"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const STORY = [
    { year: "2020", title: "Pertemuan Pertama", description: "Kisah indah dimulai ketika takdir mempertemukan dua jiwa yang ditakdirkan bersama. Sebuah pertemuan sederhana yang menjadi awal dari segalanya.", icon: "🌸" },
    { year: "2021", title: "Mengenal Lebih Dekat", description: "Waktu demi waktu mengalir indah, saling mengenal dan memahami satu sama lain. Setiap percakapan menjadi jembatan menuju hati.", icon: "💌" },
    { year: "2023", title: "Ta'aruf", description: "Dengan niat yang tulus dan restu orang tua, kami menjalani proses ta'aruf yang penuh berkah, mempererat tali silaturahmi dua keluarga.", icon: "🤝" },
    { year: "2024", title: "Khitbah", description: "Momen sakral khitbah menjadi bukti kesungguhan hati. Dengan doa dan restu kedua keluarga, kami melangkah lebih jauh.", icon: "💍" },
    { year: "2026", title: "Menuju Pelaminan", description: "Alhamdulillah, setelah perjalanan yang indah, kami akhirnya siap untuk melangkah ke jenjang pernikahan yang suci dan penuh berkah.", icon: "🌹" },
];

const TimelineItem = ({ item, index }: { item: (typeof STORY)[0]; index: number }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
        >
            {/* Icon */}
            <div className="w-14 h-14 rounded-full glass-gold flex items-center justify-center text-2xl mb-4"
                style={{ border: '1px solid rgba(201,169,110,0.4)' }}>
                {item.icon}
            </div>
            {/* Year */}
            <span className="font-cinzel text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--gold)' }}>{item.year}</span>
            {/* Title */}
            <h3 className="font-playfair text-2xl text-gold-gradient mb-2">{item.title}</h3>
            {/* Description */}
            <p className="font-cormorant text-lg leading-relaxed max-w-sm" style={{ color: 'rgba(232,213,163,0.8)' }}>
                {item.description}
            </p>
            {/* Connector line */}
            {index < STORY.length - 1 && (
                <div className="w-px h-10 mt-6" style={{ background: 'linear-gradient(to bottom, rgba(184,150,46,0.5), transparent)' }} />
            )}
        </motion.div>
    );
};

export default function LoveStorySection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    return (
        <section ref={ref} className="section py-24 px-6 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="orb w-96 h-96 top-1/4 left-0 bg-rose-900/10" />
                <div className="orb w-64 h-64 bottom-1/4 right-0 bg-amber-900/10" />
            </div>
            <div className="max-w-xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="text-center mb-16"
                >
                    <span className="font-cinzel text-[10px] tracking-[0.5em] uppercase" style={{ color: 'var(--gold)' }}>Kisah Kami</span>
                    <h2 className="font-playfair text-5xl font-bold text-gold-gradient mt-3 mb-4">Love Story</h2>
                    <div className="divider-gold w-32 mx-auto" />
                </motion.div>
                <div className="flex flex-col gap-8">
                    {STORY.map((item, i) => <TimelineItem key={i} item={item} index={i} />)}
                </div>
            </div>
        </section>
    );
}
