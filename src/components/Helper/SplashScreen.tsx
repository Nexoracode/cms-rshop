"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Particle = {
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
};

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    // ساخت ذرات فقط روی کلاینت
    const arr: Particle[] = [...Array(25)].map(() => ({
      size: Math.random() * 8 + 6, // بزرگ‌تر (6 تا 14 px)
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 3, // کندتر (3 تا 6 ثانیه)
      delay: Math.random() * 2,
    }));
    setParticles(arr);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center 
          bg-gradient-to-br from-indigo-950 via-violet-900 to-sky-950 
          overflow-hidden z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Aurora Layers */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute -top-1/3 -left-1/3 w-[85%] h-[85%] 
              bg-gradient-to-br from-pink-500/25 to-red-500/20 
              rounded-full blur-[160px]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-1/3 -right-1/3 w-[75%] h-[75%] 
              bg-gradient-to-tl from-green-400/20 to-blue-500/30 
              rounded-full blur-[180px]"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
            />
          </div>

          {/* ذرات بزرگ‌تر و کندتر */}
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/50 shadow-lg"
              style={{
                width: p.size,
                height: p.size,
                top: p.top,
                left: p.left,
              }}
              animate={{
                y: [0, -60, 0], // حرکت عمودی بلندتر ولی نرم
                x: [0, Math.random() * 30 - 15, 0], // حرکت افقی کمی
                scale: [1, 1.3, 1], // پالس نرم
                opacity: [0.2, 0.9, 0.3], // محو/نمایان ملایم
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* محتوای مرکزی */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex flex-col items-center gap-7"
          >
            {/* لوگو */}
            <motion.img
              src="/images/logo.png"
              alt="logo"
              className="w-64 mb-4 drop-shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            />

            {/* متن برند */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-4xl font-extrabold tracking-wide 
              bg-gradient-to-r from-white via-sky-100 to-violet-200 
              bg-clip-text text-transparent animate-shine drop-shadow-md"
            >
              ARShop CMS
            </motion.h1>

            {/* Progress Bar */}
            <motion.div
              className="relative mt-8 w-64 h-2 bg-white/20 rounded-full overflow-hidden shadow-inner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <motion.div
                className="absolute left-1/2 top-0 h-full w-1/2 
                bg-gradient-to-r from-violet-400 via-white to-sky-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                style={{ originX: 0 }}
              />
              <motion.div
                className="absolute right-1/2 top-0 h-full w-1/2 
                bg-gradient-to-l from-violet-400 via-white to-sky-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0, 1, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                style={{ originX: 1 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
