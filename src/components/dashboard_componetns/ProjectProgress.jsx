import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export const ProjectProgress = () => {
  const [data, setData] = useState({ growth: 0 });

  useEffect(() => {
    fetch("https://task-api-eight-flax.vercel.app/api/overview")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error fetching progress:", err));
  }, []);

  // Use a Spring for the percentage to make the number "count up" smoothly
  const springValue = useSpring(0, { stiffness: 40, damping: 20 });
  
  useEffect(() => {
    springValue.set(data.growth);
  }, [data.growth, springValue]);

  // SVG Math
  const radius = 42;
  const strokeWidth = 10;
  const circumference = Math.PI * radius; // Half-circle
  const dashOffset = useTransform(springValue, [0, 100], [circumference, 0]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-[0_30px_60px_rgba(15,76,58,0.08)] flex flex-col items-center h-full relative overflow-hidden group"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#0F4C3A]/5 blur-[60px] group-hover:bg-[#0F4C3A]/10 transition-colors duration-700" />

      <div className="w-full flex justify-between items-center mb-10 relative z-10">
        <div>
          <h3 className="font-bold text-xl text-slate-900 tracking-tight">Growth Velocity</h3>
          <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.2em] mt-0.5">Real-time Metrics</p>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
           <div className="w-2 h-2 rounded-full bg-[#0F4C3A] shadow-[0_0_8px_#0F4C3A]" />
        </div>
      </div>

      <div className="relative w-64 h-36 flex items-center justify-center">
        <svg viewBox="0 0 100 60" className="w-full h-full overflow-visible">
          {/* Subtle Outer Shadow Path */}
          <path
            d="M 10,50 A 40,40 0 0,1 90,50"
            fill="none"
            stroke="#F8FAFC"
            strokeWidth={strokeWidth + 2}
            strokeLinecap="round"
          />
          
          {/* Main Track (Empty) */}
          <path
            d="M 10,50 A 40,40 0 0,1 90,50"
            fill="none"
            stroke="#F1F5F9"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          
          {/* Active Progress Path */}
          <motion.path
            d="M 10,50 A 40,40 0 0,1 90,50"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: dashOffset,
            }}
          />

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0F4C3A" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Display */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
          <div className="flex items-baseline justify-center">
             <motion.span className="text-5xl font-black text-slate-900 tracking-tighter">
               {data.growth}
             </motion.span>
             <span className="text-xl font-bold text-emerald-500 ml-1">%</span>
          </div>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-2">
            Target Performance
          </p>
        </div>
      </div>

      {/* Modern Status Chips */}
      <div className="flex gap-3 mt-8 w-full">
        <div className="flex-1 bg-slate-50/50 p-4 rounded-3xl border border-slate-100 flex flex-col items-center gap-1 group/chip hover:bg-white hover:shadow-md transition-all">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Status</span>
          <span className="text-xs font-bold text-[#0F4C3A]">Stable</span>
        </div>
        <div className="flex-1 bg-slate-50/50 p-4 rounded-3xl border border-slate-100 flex flex-col items-center gap-1 group/chip hover:bg-white hover:shadow-md transition-all">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Active</span>
          <span className="text-xs font-bold text-emerald-500">Live</span>
        </div>
      </div>
    </motion.div>
  );
};