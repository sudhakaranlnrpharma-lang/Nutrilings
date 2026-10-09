"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingBackground() {
  const { scrollY } = useScroll();
  
  const yUpFast = useTransform(scrollY, [0, 3000], [0, -800]);
  const yUpSlow = useTransform(scrollY, [0, 3000], [0, -300]);
  const yDown = useTransform(scrollY, [0, 3000], [0, 400]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      
      {/* Palmyra Sprout - Website-oda Top-la irukkum */}
      <motion.img 
        src="/images/palmyra-sprout-float.png" 
        style={{ y: yUpSlow }} 
        animate={{ rotate: 10, x: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-[3%] left-[10%] w-36 md:w-48 opacity-[0.25] blur-[1px]"
        alt=""
      />
      
      {/* Sprouted Ragi */}
      <motion.img 
        src="/images/sprouted-ragi-float.png" 
        style={{ y: yDown }}
        animate={{ rotate: -20, x: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        className="absolute top-[25%] right-[8%] w-24 md:w-32 opacity-[0.15] blur-[2px]"
        alt=""
      />

      {/* Sprouted Green Gram */}
      <motion.img 
        src="/images/sprouted-green-gram-float.png" 
        style={{ y: yUpFast }}
        animate={{ rotate: 15, x: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute top-[50%] left-[5%] w-20 md:w-28 opacity-[0.18] blur-[1px]"
        alt=""
      />
      
      {/* Sweet Potato */}
      <motion.img 
        src="/images/sweet-potato-float.png" 
        style={{ y: yUpSlow }}
        animate={{ rotate: -15, x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-[65%] right-[12%] w-24 md:w-36 opacity-[0.15] blur-[2px]"
        alt=""
      />
      
      {/* Dates */}
      <motion.img 
        src="/images/dates-float.png" 
        style={{ y: yDown }}
        animate={{ rotate: 25, x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute top-[80%] left-[15%] w-16 md:w-24 opacity-[0.12] blur-[3px]"
        alt=""
      />

      {/* Palm Tree */}
      <motion.img 
        src="/images/palm-tree-float.png" 
        style={{ y: yUpFast }}
        animate={{ rotate: -5, x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute top-[40%] right-[2%] w-40 md:w-56 opacity-[0.1] blur-[3px]"
        alt=""
      />

    </div>
  );
}
