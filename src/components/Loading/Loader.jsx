import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-transparent">
      <div className="relative flex items-center justify-center mb-6">
        {/* Outer Pulsing Rings */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-24 h-24 rounded-[2rem] border-2 border-[#0F4C3A]"
        />
        
        {/* The Core Logo Loader */}
        <motion.div
          className="w-16 h-16 bg-[#0F4C3A] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-green-900/20 z-10"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <span className="text-2xl font-black">D</span>
        </motion.div>

        {/* Floating Particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#4ADE80] rounded-full"
            animate={{
              y: [0, -40, 0],
              x: [0, (i % 2 === 0 ? 30 : -30), 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Loading Text with Staggered Letters */}
      <div className="flex gap-1 overflow-hidden">
        {["L", "O", "A", "D", "I", "N", "G"].map((letter, index) => (
          <motion.span
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.5
            }}
            className="text-xs font-black text-[#0F4C3A] uppercase tracking-tighter"
          >
            {letter}
          </motion.span>
        ))}
      </div>
      
      {/* Soft Progress Bar Background */}
      <div className="mt-4 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full bg-gradient-to-r from-transparent via-[#4ADE80] to-transparent"
        />
      </div>
    </div>
  );
};

export default Loader;