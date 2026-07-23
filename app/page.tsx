"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Dynamic imports for heavy components
const CoverPage = dynamic(() => import("@/components/CoverPage"), { ssr: false });
const CinematicTransition = dynamic(() => import("@/components/CinematicTransition"), { ssr: false });
const StickyNav = dynamic(() => import("@/components/StickyNav"), { ssr: false });
const HeroSection = dynamic(() => import("@/components/HeroSection"), { ssr: false });
const OpeningSection = dynamic(() => import("@/components/OpeningSection"), { ssr: false });
const CoupleSection = dynamic(() => import("@/components/CoupleSection"), { ssr: false });
const CountdownSection = dynamic(() => import("@/components/CountdownSection"), { ssr: false });
const EventSection = dynamic(() => import("@/components/EventSection"), { ssr: false });
const LoveStorySection = dynamic(() => import("@/components/LoveStorySection"), { ssr: false });
const GallerySection = dynamic(() => import("@/components/GallerySection"), { ssr: false });

const WishesSection = dynamic(() => import("@/components/WishesSection"), { ssr: false });
const GiftSection = dynamic(() => import("@/components/GiftSection"), { ssr: false });
const ClosingSection = dynamic(() => import("@/components/ClosingSection"), { ssr: false });
const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"), { ssr: false });
const FloatingParticles = dynamic(() => import("@/components/FloatingParticles"), { ssr: false });

export default function WeddingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [transitionDone, setTransitionDone] = useState(false);
  const [guestName, setGuestName] = useState("Tamu Undangan");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const name = params.get("to") || params.get("name") || "";
      if (name) setGuestName(decodeURIComponent(name));
    }
  }, []);

  const handleOpen = useCallback(() => {
    setShowTransition(true);
    setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => {
        setShowTransition(false);
        setTransitionDone(true);
      }, 3200);
    }, 400);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!isOpen && !showTransition && (
          <CoverPage key="cover" guestName={guestName} onOpen={handleOpen} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTransition && (
          <CinematicTransition key="transition" />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <FloatingParticles />
            <StickyNav />
            <HeroSection />
            <OpeningSection />
            <CoupleSection />
            <CountdownSection />
            <EventSection />
            <LoveStorySection />
            <GallerySection />

            <WishesSection />
            <GiftSection />
            <ClosingSection />
            <MusicPlayer autoPlay={transitionDone} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
