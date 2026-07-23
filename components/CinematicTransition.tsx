"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface Petal {
    id: number;
    x: number;
    rotation: number;
    scale: number;
    duration: number;
    delay: number;
    color: string;
    emoji: string;
}

interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
}

const PETAL_EMOJIS = ["🌸", "🌺", "🌼", "🌹", "✿", "❀", "🌷"];
const PETAL_COLORS = ["#FFB7C5", "#FFD700", "#FFC0CB", "#FF69B4", "#E8D5A3", "#C9A96E"];

export default function CinematicTransition() {
    const [phase, setPhase] = useState<"ripple" | "flash" | "bloom" | "petals" | "done">("ripple");
    const [petals, setPetals] = useState<Petal[]>([]);
    const [sparks, setSparks] = useState<{ id: number; x: number; y: number; angle: number }[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animFrameRef = useRef<number | null>(null);
    const particlesRef = useRef<Particle[]>([]);

    useEffect(() => {
        // Phase sequence
        const t1 = setTimeout(() => setPhase("flash"), 400);
        const t2 = setTimeout(() => setPhase("bloom"), 900);
        const t3 = setTimeout(() => {
            setPhase("petals");
            // Create petals
            setPetals(
                Array.from({ length: 80 }, (_, i) => ({
                    id: i,
                    x: Math.random() * 100,
                    rotation: Math.random() * 360,
                    scale: 0.5 + Math.random() * 1.5,
                    duration: 2.5 + Math.random() * 2,
                    delay: Math.random() * 1.5,
                    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
                    emoji: PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)],
                }))
            );
            // Sparks
            setSparks(
                Array.from({ length: 40 }, (_, i) => ({
                    id: i,
                    x: 20 + Math.random() * 60,
                    y: 20 + Math.random() * 60,
                    angle: Math.random() * 360,
                }))
            );
        }, 1200);
        const t4 = setTimeout(() => setPhase("done"), 3500);

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    }, []);

    // Canvas confetti
    useEffect(() => {
        if (phase !== "petals") return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext("2d")!;

        const colors = ["#C9A96E", "#E8D5A3", "#FFD700", "#FFC0CB", "#FF69B4", "#FF8C00", "#FFFFFF"];
        particlesRef.current = Array.from({ length: 200 }, () => ({
            id: Math.random(),
            x: Math.random() * canvas.width,
            y: -20,
            vx: (Math.random() - 0.5) * 8,
            vy: 2 + Math.random() * 6,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 4 + Math.random() * 8,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesRef.current.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.15;
                p.vx *= 0.99;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.x / canvas.width) * Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(0, 1 - p.y / canvas.height);

                // Draw star or rectangle
                if (Math.random() > 0.5) {
                    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
                } else {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            });
            animFrameRef.current = requestAnimationFrame(draw);
        };
        draw();

        return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
    }, [phase]);

    if (phase === "done") return null;

    return (
        <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Base dark layer */}
            <motion.div
                className="absolute inset-0"
                style={{ background: "#0D0A0B" }}
                animate={{
                    opacity: phase === "flash" ? [1, 0] : phase === "bloom" ? 0 : phase === "petals" ? 0 : 1,
                }}
                transition={{ duration: 0.5 }}
            />

            {/* Flash layer */}
            <AnimatePresence>
                {phase === "flash" && (
                    <motion.div
                        className="absolute inset-0"
                        style={{ background: "radial-gradient(circle at center, #FFFDF5 0%, #F5E6C8 30%, #C9A96E 60%, #0D0A0B 100%)" }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: [0, 1, 1, 0], scale: [0.5, 1, 1.2, 2] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                )}
            </AnimatePresence>

            {/* Bloom layer */}
            <AnimatePresence>
                {(phase === "bloom" || phase === "petals") && (
                    <motion.div
                        className="absolute inset-0"
                        style={{ background: "radial-gradient(circle at center, rgba(201,169,110,0.2) 0%, transparent 70%)" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0.3] }}
                        transition={{ duration: 1 }}
                    />
                )}
            </AnimatePresence>

            {/* Ripple rings */}
            {phase === "ripple" && (
                <div className="absolute inset-0 flex items-center justify-center">
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full border-2"
                            style={{ borderColor: 'var(--gold)' }}
                            initial={{ width: 0, height: 0, opacity: 0.8 }}
                            animate={{ width: "200vw", height: "200vw", opacity: 0 }}
                            transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                        />
                    ))}
                </div>
            )}

            {/* Golden sparkle burst */}
            {(phase === "bloom" || phase === "petals") && sparks.map((spark) => (
                <motion.div
                    key={spark.id}
                    className="absolute text-2xl pointer-events-none"
                    style={{ left: `${spark.x}%`, top: `${spark.y}%` }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        rotate: [0, spark.angle],
                        x: [0, (Math.random() - 0.5) * 200],
                        y: [0, (Math.random() - 0.5) * 200],
                    }}
                    transition={{ duration: 1.5, delay: spark.id * 0.03, ease: "easeOut" }}
                >
                    {["✨", "⭐", "💫", "🌟", "✦"][spark.id % 5]}
                </motion.div>
            ))}

            {/* Falling petals */}
            {phase === "petals" && petals.map((petal) => (
                <motion.div
                    key={petal.id}
                    className="fixed pointer-events-none text-3xl"
                    style={{ left: `${petal.x}%`, top: "-5vh" }}
                    animate={{
                        y: ["0vh", "110vh"],
                        rotate: [petal.rotation, petal.rotation + 720],
                        x: [0, (Math.random() - 0.5) * 200],
                    }}
                    transition={{
                        duration: petal.duration,
                        delay: petal.delay,
                        ease: "easeIn",
                    }}
                >
                    {petal.emoji}
                </motion.div>
            ))}

            {/* Butterflies */}
            {phase === "petals" && [0, 1, 2, 3].map((i) => (
                <motion.div
                    key={`butterfly-${i}`}
                    className="fixed pointer-events-none text-4xl"
                    style={{ left: `${10 + i * 20}%`, top: `${30 + i * 10}%` }}
                    animate={{
                        x: [0, 300 + i * 100, 600 + i * 50],
                        y: [0, -100 - i * 30, -200],
                        opacity: [0, 1, 1, 0],
                        rotate: [0, 15, -10, 20, 0],
                    }}
                    transition={{ duration: 2 + i * 0.5, delay: 0.5 + i * 0.3 }}
                >
                    🦋
                </motion.div>
            ))}

            {/* Floating hearts */}
            {phase === "petals" && [0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                    key={`heart-${i}`}
                    className="fixed pointer-events-none text-2xl"
                    style={{
                        left: `${10 + i * 15}%`,
                        bottom: `${10 + (i % 3) * 10}%`,
                    }}
                    animate={{
                        y: [0, -300, -600],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                        x: [(Math.random() - 0.5) * 50],
                    }}
                    transition={{ duration: 2.5, delay: 0.3 + i * 0.2 }}
                >
                    💖
                </motion.div>
            ))}

            {/* Lens flare */}
            {phase === "flash" && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse 60% 40% at 70% 30%, rgba(255,255,200,0.8) 0%, transparent 60%)",
                    }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.6 }}
                />
            )}

            {/* Golden confetti canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: phase === "petals" ? 1 : 0 }}
            />

            {/* Center glow */}
            {(phase === "bloom" || phase === "petals") && (
                <motion.div
                    className="absolute w-64 h-64 rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(201,169,110,0.6) 0%, transparent 70%)" }}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: [0, 3, 5], opacity: [1, 0.3, 0] }}
                    transition={{ duration: 2 }}
                />
            )}
        </motion.div>
    );
}
