"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingBackground() {
  const { scrollY } = useScroll();
  
  // 'absolute' use panradhala, ingredients page koodave nagarum. 
  // Parallax effect-kaga athoda speed-a konjam kooti/koraikkurom.
  const parallaxSlow = useTransform(scrollY, [0, 4000], [0, 400]);
  const parallaxFast = useTransform(scrollY, [0, 4000], [0, -400]);
  const parallaxMedium = useTransform(scrollY, [0, 4000], [0, 200]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  // 'fixed'-ku badhila 'absolute inset-0' kuduthirukkom. Ippo full page-kum (top to bottom) cover aagum.
  return (
    <div className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden">
      
      {/* Top Section */}
      <motion.img 
        src="/images/palmyra-sprout-float.png" 
        style={{ y: parallaxSlow }} 
        animate={{ rotate: [0, 5, 0], x: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-[3%] left-[2%] w-[250px] md:w-[400px] opacity-[0.8]"
        alt=""
      />
      
      <motion.img 
        src="/images/sprouted-ragi-float.png" 
        style={{ y: parallaxFast }}
        animate={{ rotate: [0, -10, 0], x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
        className="absolute top-[18%] right-[2%] w-[250px] md:w-[380px] opacity-[0.8]"
        alt=""
      />

      {/* Middle Section */}
      <motion.img 
        src="/images/palm-tree-float.png" 
        style={{ y: parallaxMedium }}
        animate={{ rotate: [0, -5, 0], x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute top-[35%] left-[2%] w-[350px] md:w-[500px] opacity-[0.5]"
        alt=""
      />

      <motion.img 
        src="/images/sweet-potato-float.png" 
        style={{ y: parallaxSlow }}
        animate={{ rotate: [0, -10, 0], x: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-[55%] right-[2%] w-[280px] md:w-[420px] opacity-[0.8]"
        alt=""
      />
      
      {/* Bottom Section */}
      <motion.img 
        src="/images/sprouted-green-gram-float.png" 
        style={{ y: parallaxFast }}
        animate={{ rotate: [0, 10, 0], x: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute top-[75%] left-[2%] w-[250px] md:w-[380px] opacity-[0.7]"
        alt=""
      />
      
      <motion.img 
        src="/images/dates-float.png" 
        style={{ y: parallaxMedium }}
        animate={{ rotate: [0, 15, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute top-[90%] right-[5%] w-[200px] md:w-[350px] opacity-[0.7]"
        alt=""
      />

    </div>
  );
}
