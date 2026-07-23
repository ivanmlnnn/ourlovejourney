"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
    { label: "Pasangan", href: "#couple" },
    { label: "Acara", href: "#event" },
    { label: "Galeri", href: "#gallery" },
    { label: "Ucapan", href: "#wishes" },
    { label: "Gift", href: "#gift" },
];

export default function StickyNav() {
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState("");

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 100);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (href: string) => {
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            setActive(href);
        }
    };

    return (
        <motion.nav
            className="nav-sticky safe-area-top"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
                <motion.div
                    className="font-vibes text-xl"
                    style={{ color: 'var(--gold)' }}
                    whileHover={{ scale: 1.05 }}
                >
                    R &amp; I
                </motion.div>

                <div className="hidden sm:flex items-center gap-1">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.href}
                            onClick={() => scrollTo(item.href)}
                            className="px-3 py-1.5 rounded-lg font-cinzel text-[10px] tracking-widest uppercase transition-all duration-200"
                            style={{
                                color: active === item.href ? 'var(--gold)' : 'rgba(232,213,163,0.7)',
                                background: active === item.href ? 'rgba(201,169,110,0.15)' : 'transparent',
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Mobile: scrollable */}
                <div className="sm:hidden flex items-center gap-1 overflow-x-auto scrollbar-none">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.href}
                            onClick={() => scrollTo(item.href)}
                            className="px-2 py-1 rounded-lg font-cinzel text-[8px] tracking-widest uppercase whitespace-nowrap"
                            style={{ color: 'rgba(232,213,163,0.7)' }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </motion.nav>
    );
}
