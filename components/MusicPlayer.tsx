"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";

const PLAYLIST = [
    {
        title: "Sholawat Nabi",
        artist: "Instrumen",
        src: "", // placeholder
    },
    {
        title: "Taqabbalallahu",
        artist: "Nasheed",
        src: "",
    },
];

export default function MusicPlayer({ autoPlay }: { autoPlay: boolean }) {
    const [expanded, setExpanded] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // We'll just simulate since we don't have actual audio files
    const togglePlay = useCallback(() => {
        setPlaying((p) => !p);
    }, []);

    const nextTrack = useCallback(() => {
        setCurrentTrack((t) => (t + 1) % PLAYLIST.length);
    }, []);

    const prevTrack = useCallback(() => {
        setCurrentTrack((t) => (t - 1 + PLAYLIST.length) % PLAYLIST.length);
    }, []);

    if (!mounted) return null;

    return (
        <motion.div
            className="music-player"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4 overflow-hidden"
                    >
                        {/* Playlist */}
                        <div className="space-y-2 mb-4">
                            {PLAYLIST.map((track, i) => (
                                <button
                                    key={i}
                                    onClick={() => { setCurrentTrack(i); setPlaying(true); }}
                                    className="w-full text-left px-3 py-2 rounded-lg transition-all"
                                    style={{
                                        background: currentTrack === i ? 'rgba(201,169,110,0.2)' : 'transparent',
                                        color: currentTrack === i ? 'var(--gold)' : 'rgba(232,213,163,0.6)',
                                    }}
                                >
                                    <p className="font-cinzel text-[10px] tracking-wider">{track.title}</p>
                                    <p className="font-inter text-[9px]" style={{ opacity: 0.6 }}>{track.artist}</p>
                                </button>
                            ))}
                        </div>

                        {/* Volume */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm">🔉</span>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.1}
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
                                style={{ accentColor: 'var(--gold)' }}
                            />
                            <span className="text-sm">🔊</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main controls */}
            <div className="flex items-center gap-3">
                {/* Track info */}
                <button onClick={() => setExpanded((e) => !e)} className="flex-1 text-left">
                    <div className="flex items-center gap-3">
                        {/* Animated vinyl */}
                        <motion.div
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative"
                            style={{ background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))' }}
                            animate={playing ? { rotate: 360 } : { rotate: 0 }}
                            transition={playing ? { duration: 3, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
                        >
                            <div className="w-3 h-3 rounded-full bg-black" />
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                style={{ background: 'radial-gradient(circle, transparent 30%, rgba(201,169,110,0.3) 70%)' }}
                                animate={playing ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.5 }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                        </motion.div>

                        <div className="min-w-0">
                            <p className="font-cinzel text-[10px] tracking-wider truncate" style={{ color: 'var(--gold)' }}>
                                {PLAYLIST[currentTrack].title}
                            </p>
                            <p className="font-inter text-[9px] truncate" style={{ color: 'rgba(232,213,163,0.6)' }}>
                                {PLAYLIST[currentTrack].artist}
                            </p>
                        </div>
                    </div>
                </button>

                {/* Prev */}
                <button onClick={prevTrack} className="text-lg transition-transform hover:scale-110">
                    ⏮
                </button>

                {/* Play/Pause */}
                <motion.button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    style={{ background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))', color: '#1A1410' }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {playing ? "⏸" : "▶"}
                </motion.button>

                {/* Next */}
                <button onClick={nextTrack} className="text-lg transition-transform hover:scale-110">
                    ⏭
                </button>
            </div>

            {/* Playing indicator */}
            {playing && (
                <div className="flex items-center gap-1 mt-2 justify-center">
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="w-0.5 rounded-full"
                            style={{ background: 'var(--gold)' }}
                            animate={{ height: ["4px", "16px", "4px"] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                        />
                    ))}
                    <span className="font-inter text-[9px] ml-2" style={{ color: 'rgba(201,169,110,0.6)' }}>
                        Memutar...
                    </span>
                </div>
            )}
        </motion.div>
    );
}
