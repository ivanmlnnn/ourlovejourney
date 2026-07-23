"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

const MAP_QUERY = "Kp.+Pondok+Soga+RT+001/RW+012+Desa+Sukatenang+Kecamatan+Sukawangi+Kabupaten+Bekasi";
const GMAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;
const APPLE_MAPS_URL = `https://maps.apple.com/?q=${MAP_QUERY}`;
const WAZE_URL = `https://waze.com/ul?q=${MAP_QUERY}`;

const CALENDAR_URL = (() => {
    const start = "20260731T010000Z";
    const end = "20260731T080000Z";
    const title = "Pernikahan Muhammad Rizky Akbar & Ika Rahim";
    const details = "Akad & Resepsi Pernikahan";
    const location = "Kp. Pondok Soga RT 001/RW 012 Desa Sukatenang Kecamatan Sukawangi Kabupaten Bekasi";
    return `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
})();

const EventCard = ({
    icon,
    title,
    time,
    description,
    delay,
    inView,
}: {
    icon: string;
    title: string;
    time: string;
    description: string;
    delay: number;
    inView: boolean;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="glass-gold p-8 rounded-3xl relative overflow-hidden group shadow-luxury"
    >
        {/* Animated top border */}
        <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />

        {/* Icon */}
        <motion.div
            className="text-5xl mb-4"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay }}
        >
            {icon}
        </motion.div>

        {/* Title */}
        <h3 className="font-cinzel text-2xl text-gold-gradient mb-3">{title}</h3>

        {/* Time */}
        <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
            <p className="font-playfair text-3xl font-bold" style={{ color: 'var(--champagne)' }}>
                {time}
            </p>
            <p className="font-inter text-sm" style={{ color: 'var(--gold)' }}>WIB</p>
        </div>

        <p className="font-cormorant text-lg" style={{ color: 'rgba(232,213,163,0.7)' }}>
            {description}
        </p>

        {/* Shimmer on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'linear-gradient(135deg, transparent 0%, rgba(201,169,110,0.05) 50%, transparent 100%)' }} />
    </motion.div>
);

export default function EventSection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

    return (
        <section id="event" ref={ref} className="section py-24 px-6 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="orb w-96 h-96 top-0 right-0 bg-amber-900/10" />
                <div className="orb w-64 h-64 bottom-0 left-0 bg-yellow-900/10" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="text-center mb-16"
                >
                    <span className="font-cinzel text-[10px] tracking-[0.5em] uppercase" style={{ color: 'var(--gold)' }}>
                        Hari Istimewa
                    </span>
                    <h2 className="font-playfair text-5xl font-bold text-gold-gradient mt-3 mb-4">
                        Rangkaian Acara
                    </h2>
                    <div className="divider-gold w-32 mx-auto mb-4" />
                    <p className="font-cinzel text-lg" style={{ color: 'var(--champagne)' }}>
                        Jum&apos;at, 31 Juli 2026
                    </p>
                </motion.div>

                {/* Event cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                    <EventCard
                        icon="🕌"
                        title="Akad Nikah"
                        time="08.00"
                        description="Prosesi akad nikah yang sakral dan penuh berkah"
                        delay={0.1}
                        inView={inView}
                    />
                    <EventCard
                        icon="🎊"
                        title="Resepsi"
                        time="08.00"
                        description="Acara resepsi pernikahan bersama keluarga dan tamu undangan"
                        delay={0.3}
                        inView={inView}
                    />
                </div>

                {/* Venue card with Photo background */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="relative rounded-3xl mb-8 overflow-hidden group shadow-luxury"
                    style={{ border: '1px solid rgba(201,169,110,0.3)' }}
                >
                    {/* Ring Photo Background */}
                    <Image
                        src="/photo-ring.jpg"
                        alt="Rings"
                        fill
                        className="object-cover object-center opacity-40 group-hover:scale-105 transition-transform duration-1000"
                    />

                    {/* Dark gradient for text readability */}
                    <div className="absolute inset-0"
                        style={{ background: 'linear-gradient(to right, rgba(20,16,16,0.95) 0%, rgba(20,16,16,0.6) 50%, rgba(20,16,16,0.3) 100%)' }} />

                    <div className="relative z-10 p-8 sm:p-10 flex items-start gap-6">
                        <div className="text-4xl animate-float-slow flex-shrink-0 drop-shadow-md">📍</div>
                        <div>
                            <h3 className="font-cinzel text-xl text-gold-gradient mb-4">Lokasi</h3>
                            <p className="font-playfair text-3xl text-gold-gradient mb-2 drop-shadow-lg">Kp. Pondok Soga</p>
                            <p className="font-cormorant text-xl leading-relaxed" style={{ color: 'rgba(240,230,200,0.9)' }}>
                                RT 001 / RW 012<br />
                                Desa Sukatenang<br />
                                Kecamatan Sukawangi<br />
                                Kabupaten Bekasi
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Map & Calendar buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                >
                    {[
                        { label: "Google Maps", icon: "🗺️", url: GMAPS_URL, color: 'var(--gold)' },
                        { label: "Apple Maps", icon: "🍎", url: APPLE_MAPS_URL, color: 'var(--rose-gold)' },
                        { label: "Waze", icon: "🚗", url: WAZE_URL, color: 'var(--gold-light)' },
                        { label: "Calendar", icon: "📅", url: CALENDAR_URL, color: 'var(--gold)' },
                    ].map((btn) => (
                        <motion.a
                            key={btn.label}
                            href={btn.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-luxury p-4 rounded-2xl flex flex-col items-center gap-2 group"
                            style={{ border: `1px solid ${btn.color}40`, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                            whileHover={{ scale: 1.05, borderColor: btn.color }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <span className="text-2xl group-hover:scale-110 transition-transform">{btn.icon}</span>
                            <span className="font-inter text-[10px] tracking-widest text-center" style={{ color: btn.color }}>
                                {btn.label}
                            </span>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
