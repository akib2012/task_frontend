import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  MousePointer2,
  RefreshCcw,
  ArrowUpRight,
  BarChart,
  Calendar,
} from "lucide-react";

const AnalyticsPage = () => {
  const [stats, setStats] = useState([]);
  const [timeRange, setTimeRange] = useState("Monthly"); // Functional State
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://task-api-eight-flax.vercel.app/api/analytics")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => console.error("Analytics fetch error:", err));
  }, []);

  // Filter data based on selection (Logic example)
  const filteredStats = useMemo(() => {
    return timeRange === "Monthly" ? stats.slice(0, 4) : stats;
  }, [stats, timeRange]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 space-y-8 h-full"
    >
      {/* Header */}
      <header className="flex justify-between items-center px-2">
        <div>
          <h2 className="text-2xl font-black text-[#1A1A1A] tracking-tight">
            Data Insights
          </h2>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
            Live Conversion Flow
          </div>
        </div>

        {/* Functional Range Switcher */}
        <div className="flex bg-slate-50 border border-slate-100 p-1.5 rounded-[1.2rem] shadow-inner">
          {["Monthly", "Yearly"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`relative px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                timeRange === range
                  ? "text-white"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {timeRange === range && (
                <motion.div
                  layoutId="activeRange"
                  className="absolute inset-0 bg-[#0F4C3A] rounded-xl shadow-lg shadow-green-900/20"
                />
              )}
              <span className="relative z-10">{range}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {!loading &&
            filteredStats.map((day, idx) => (
              <motion.div
                key={day.date}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: idx * 0.08,
                }}
                whileHover={{ y: -5, shadow: "0 20px 40px rgba(0,0,0,0.08)" }}
                className="group bg-slate-50/50 p-6 rounded-[2.5rem] border border-slate-100 relative overflow-hidden transition-all"
              >
                {/* Decorative Background Glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/5 rounded-full blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />

                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-[#0F4C3A] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-green-900/20 group-hover:rotate-6 transition-transform">
                      <Calendar size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                      <p className="font-black text-sm text-[#1A1A1A] leading-none">
                        {day.date}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">
                        Report generated
                      </p>
                    </div>
                  </div>
                  <div className="p-2 bg-white rounded-full border border-slate-100 text-emerald-500 shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <ArrowUpRight size={16} strokeWidth={3} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-[1.8rem] border border-white">
                  <StatItem
                    icon={<Eye />}
                    label="Views"
                    value={day.views}
                    color="text-blue-500"
                    bgColor="bg-blue-50"
                  />
                  <StatItem
                    icon={<MousePointer2 />}
                    label="Clicks"
                    value={day.clicks}
                    color="text-amber-500"
                    bgColor="bg-amber-50"
                  />
                  <StatItem
                    icon={<RefreshCcw />}
                    label="Conv."
                    value={day.conversions}
                    color="text-emerald-500"
                    bgColor="bg-emerald-50"
                  />
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const StatItem = ({ icon, label, value, color, bgColor }) => (
  <div className="space-y-1.5 text-center px-1">
    <div
      className={`mx-auto w-9 h-9 flex items-center justify-center rounded-xl ${bgColor} ${color} transition-transform hover:scale-110`}
    >
      {React.cloneElement(icon, { size: 16, strokeWidth: 2.5 })}
    </div>
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
      {label}
    </p>
    <p className="text-base font-black text-[#1A1A1A] tracking-tighter">
      {value?.toLocaleString()}
    </p>
  </div>
);

export default AnalyticsPage;
