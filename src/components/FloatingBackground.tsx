"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingBackground() {
  const { scrollY } = useScroll();
  
  const yUpFast = useTransform(scrollY, [0, 3000], [0, -600]);
  const yUpSlow = useTransform(scrollY, [0, 3000], [0, -200]);
  const yDown = useTransform(scrollY, [0, 3000], [0, 300]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
      
      {/* Palmyra Sprout */}
      <motion.img 
        src="/images/palmyra-sprout-float.png" 
        style={{ y: yUpSlow }} 
        animate={{ rotate: 5, x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-[5%] left-[5%] w-48 md:w-64 opacity-60"
        alt=""
      />
      
      {/* Sprouted Ragi */}
      <motion.img 
        src="/images/sprouted-ragi-float.png" 
        style={{ y: yDown }}
        animate={{ rotate: -10, x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        className="absolute top-[20%] right-[2%] w-36 md:w-48 opacity-60"
        alt=""
      />

      {/* Sprouted Green Gram */}
      <motion.img 
        src="/images/sprouted-green-gram-float.png" 
        style={{ y: yUpFast }}
        animate={{ rotate: 10, x: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute top-[45%] left-[2%] w-32 md:w-40 opacity-50"
        alt=""
      />
      
      {/* Sweet Potato */}
      <motion.img 
        src="/images/sweet-potato-float.png" 
        style={{ y: yUpSlow }}
        animate={{ rotate: -10, x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-[60%] right-[5%] w-36 md:w-48 opacity-60"
        alt=""
      />
      
      {/* Dates */}
      <motion.img 
        src="/images/dates-float.png" 
        style={{ y: yDown }}
        animate={{ rotate: 15, x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute top-[75%] left-[5%] w-24 md:w-32 opacity-50"
        alt=""
      />

      {/* Palm Tree */}
      <motion.img 
        src="/images/palm-tree-float.png" 
        style={{ y: yUpFast }}
        animate={{ rotate: -5, x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute top-[35%] right-[5%] w-56 md:w-72 opacity-40"
        alt=""
      />

    </div>
  );
}
