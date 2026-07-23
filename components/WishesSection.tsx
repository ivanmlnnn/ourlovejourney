"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const SAMPLE_WISHES = [
    {
        name: "Keluarga Besar",
        message: "Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fi khair. 🤲",
        time: "2 minggu lalu",
        attendance: "hadir",
    },
    {
        name: "Sahabat Setia",
        message: "Alhamdulillah akhirnya sah juga! Semoga langgeng sampai kakek nenek ya bestie! 💕✨",
        time: "1 minggu lalu",
        attendance: "hadir",
    },
    {
        name: "Teman Sekolah",
        message: "Selamat menempuh hidup baru! Semoga kalian selalu bahagia dan saling melengkapi satu sama lain 🌸",
        time: "5 hari lalu",
        attendance: "mungkin",
    },
];

type Wish = {
    name: string;
    message: string;
    time: string;
    attendance: string;
};

const WishCard = ({ wish, index }: { wish: Wish; index: number }) => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="wish-card glass-gold p-6 rounded-2xl relative overflow-hidden"
            style={{ animationDelay: `${index}s` }}
        >
            <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />

            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-lg font-bold"
                    style={{ background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))' }}>
                    {wish.name[0]}
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                        <h4 className="font-playfair text-lg text-gold-gradient">{wish.name}</h4>
                        <div className="flex items-center gap-2">
                            {wish.attendance === "hadir" && (
                                <span className="font-inter text-[10px] tracking-widest px-2 py-0.5 rounded-full"
                                    style={{ background: 'rgba(201,169,110,0.2)', color: 'var(--gold)' }}>
                                    ✓ Hadir
                                </span>
                            )}
                        </div>
                    </div>
                    <p className="font-cormorant text-base leading-relaxed mb-2" style={{ color: 'rgba(232,213,163,0.85)' }}>
                        &ldquo;{wish.message}&rdquo;
                    </p>
                    <p className="font-inter text-xs" style={{ color: 'rgba(201,169,110,0.5)' }}>
                        {wish.time}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default function WishesSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [wishes, setWishes] = useState<Wish[]>(SAMPLE_WISHES);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    const handleSend = async () => {
        if (!name.trim() || !message.trim()) return;
        setSending(true);
        await new Promise((r) => setTimeout(r, 800));
        const newWish: Wish = {
            name: name.trim(),
            message: message.trim(),
            time: "baru saja",
            attendance: "hadir",
        };
        setWishes((prev) => [newWish, ...prev]);
        setName("");
        setMessage("");
        setSending(false);
    };

    return (
        <section id="wishes" ref={ref} className="section py-24 px-6 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="orb w-96 h-96 top-1/2 left-0 -translate-y-1/2 bg-rose-900/10" />
                <div className="orb w-64 h-64 top-0 right-0 bg-amber-900/10" />
            </div>

            <div className="max-w-2xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="text-center mb-12"
                >
                    <span className="font-cinzel text-[10px] tracking-[0.5em] uppercase" style={{ color: 'var(--gold)' }}>
                        Buku Tamu Digital
                    </span>
                    <h2 className="font-playfair text-5xl font-bold text-gold-gradient mt-3 mb-4">
                        Ucapan & Doa
                    </h2>
                    <div className="divider-gold w-32 mx-auto" />
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="glass-luxury p-6 rounded-2xl mb-8"
                >
                    <div className="space-y-4">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-input"
                            placeholder="Nama Anda..."
                        />
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="form-input resize-none"
                            rows={3}
                            placeholder="Tuliskan ucapan dan doa untuk pengantin..."
                        />
                        <motion.button
                            onClick={handleSend}
                            disabled={sending || !name.trim() || !message.trim()}
                            className="btn-luxury w-full py-3 rounded-xl font-cinzel text-sm tracking-widest uppercase disabled:opacity-50"
                            style={{ color: '#1A1410' }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {sending ? "💛 Mengirim..." : "✦ Kirim Ucapan ✦"}
                        </motion.button>
                    </div>
                </motion.div>

                {/* Wishes list */}
                <div className="space-y-4">
                    <AnimatePresence>
                        {wishes.map((wish, i) => (
                            <WishCard key={`${wish.name}-${i}`} wish={wish} index={i} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
