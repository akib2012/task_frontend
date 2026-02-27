import React, { useState, useEffect } from "react";
import {
  Play,
  Square,
  Pause,
  RotateCcw,
  Zap,
  Timer as TimerIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const TimeTracker = () => {
  const [seconds, setSeconds] = useState(5048);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return [hrs, mins, secs].map((v) => (v < 10 ? "0" + v : v));
  };

  const [h, m, s] = formatTime(seconds);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative p-10 rounded-[3rem] text-white flex flex-col justify-between h-full overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.15)] group"
      style={{
        background: `linear-gradient(145deg, #0F4C3A 0%, #082d22 100%)`,
      }}
    >
      {/* Dynamic Aura Glow */}
      <motion.div
        animate={{
          opacity: isActive ? [0.4, 0.7, 0.4] : 0.2,
          scale: isActive ? [1, 1.1, 1] : 1,
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-emerald-400/20 blur-[100px] rounded-full pointer-events-none"
      />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center justify-center shadow-inner">
            <TimerIcon size={22} className="text-emerald-400" />
          </div>
          <div>
            <h3 className="font-bold text-xl tracking-tight leading-none">
              Track Time
            </h3>
            <p className="text-[10px] font-bold text-emerald-500/60 uppercase tracking-[0.2em] mt-1.5">
              Project: Arc Dev
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ rotate: 180, scale: 1.1 }}
          className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/30 hover:text-white transition-all"
        >
          <RotateCcw size={16} />
        </motion.button>
      </div>

      {/* Timer Display */}
      <div className="relative z-10 flex flex-col items-center justify-center py-6">
        <div className="flex items-center gap-1">
          {[h, m, s].map((unit, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center">
                <motion.span
                  key={unit}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-6xl font-black tracking-tighter tabular-nums drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]"
                >
                  {unit}
                </motion.span>
                <span className="text-[9px] font-black text-emerald-500/40 uppercase tracking-widest mt-1">
                  {idx === 0 ? "Hrs" : idx === 1 ? "Min" : "Sec"}
                </span>
              </div>
              {idx < 2 && (
                <span className="text-4xl font-light text-white/20 mb-5 mx-1">
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Action Area */}
      <div className="relative z-10 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsActive(!isActive)}
          className={`flex-[3] flex items-center justify-center gap-3 py-4 rounded-[2rem] font-black text-xs transition-all shadow-xl ${
            isActive
              ? "bg-emerald-50 text-[#0F4C3A]"
              : "bg-white text-[#0F4C3A]"
          }`}
        >
          <AnimatePresence mode="wait">
            {isActive ? (
              <motion.div
                key="pause"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex gap-1.5"
              >
                <div className="w-1.5 h-3 bg-current rounded-full" />
                <div className="w-1.5 h-3 bg-current rounded-full" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <Play size={14} fill="currentColor" />
              </motion.div>
            )}
          </AnimatePresence>
          {isActive ? "PAUSE SESSION" : "RESUME WORK"}
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.02,
            backgroundColor: "rgba(239, 68, 68, 0.8)",
          }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 py-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] flex items-center justify-center text-white transition-all"
        >
          <Square size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};
