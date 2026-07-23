"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useState } from "react";

const PHOTOS = [
    { src: "/photo-couple-2.jpg", alt: "Muhammad Rizky Akbar & Ika Rahim", aspect: "portrait" },
    { src: "/photo-ring.jpg", alt: "Cincin Pernikahan", aspect: "landscape" },
    { src: "/photo-couple-1.jpg", alt: "Momen Bahagia", aspect: "portrait" },
    { src: "/photo-ring.jpg", alt: "Janji Suci", aspect: "square" },
    { src: "/photo-couple-2.jpg", alt: "Bersama", aspect: "square" },
    { src: "/photo-couple-1.jpg", alt: "Cinta Suci", aspect: "landscape" },
];

export default function GallerySection() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

    return (
        <section id="gallery" ref={ref} className="section py-24 px-6 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="orb w-96 h-96 top-0 left-1/2 -translate-x-1/2 bg-amber-900/10" />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="text-center mb-16"
                >
                    <span className="font-cinzel text-[10px] tracking-[0.5em] uppercase" style={{ color: 'var(--gold)' }}>
                        Momen Berharga
                    </span>
                    <h2 className="font-playfair text-5xl sm:text-6xl font-bold text-gold-gradient mt-3 mb-4">
                        Galeri Kami
                    </h2>
                    <div className="divider-gold w-32 mx-auto" />
                </motion.div>

                {/* Masonry Grid */}
                <div className="masonry-grid">
                    {PHOTOS.map((photo, i) => (
                        <motion.div
                            key={i}
                            className="masonry-item"
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ scale: 1.02, y: -4 }}
                            onClick={() => setLightbox(photo)}
                        >
                            <div className="relative overflow-hidden rounded-2xl cursor-pointer group shadow-luxury"
                                style={{
                                    paddingBottom: photo.aspect === "portrait" ? "140%" : photo.aspect === "landscape" ? "70%" : "100%",
                                    border: '1px solid rgba(201,169,110,0.2)',
                                }}>
                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                />

                                {/* Overlay gradient */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ background: 'linear-gradient(to top, rgba(20,16,16,0.8) 0%, transparent 50%)' }}
                                />

                                {/* Inner gold border on hover */}
                                <div className="absolute inset-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100 pointer-events-none"
                                    style={{ border: '1px solid rgba(201,169,110,0.5)' }} />

                                {/* Icon on hover */}
                                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full glass-gold flex items-center justify-center text-white drop-shadow-md backdrop-blur-sm" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        className="lightbox-overlay cursor-zoom-out"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightbox(null)}
                    >
                        <motion.div
                            className="relative max-w-5xl max-h-[90vh] w-full mx-4 cursor-default"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-[85vh] rounded-3xl overflow-hidden shadow-2xl"
                                style={{ border: '2px solid rgba(201,169,110,0.3)' }}>
                                <Image
                                    src={lightbox.src}
                                    alt={lightbox.alt}
                                    fill
                                    className="object-contain"
                                    quality={100}
                                />
                                {/* Optional subtle vignette */}
                                <div className="absolute inset-0 pointer-events-none"
                                    style={{ background: 'radial-gradient(ellipse at center, transparent 80%, rgba(10,8,8,0.4) 100%)' }} />
                            </div>

                            <button
                                onClick={() => setLightbox(null)}
                                className="absolute -top-4 -right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-50 shadow-xl"
                                style={{ border: '1px solid rgba(201,169,110,0.4)', color: 'var(--champagne)' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
