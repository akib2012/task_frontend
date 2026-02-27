import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2, Target, BarChart3, Eye } from "lucide-react";

export const AnalyticsSection = () => {
  const [data, setData] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [viewMode, setViewMode] = useState("views");

  useEffect(() => {
    fetch("https://task-api-eight-flax.vercel.app/api/dashboard")
      .then((res) => res.json())
      .then((apiData) => {
        setData(apiData.analytics);
      })
      .catch((err) => console.error("Analytics fetch error:", err));
  }, []);

  const getFormattedData = () => {
    if (!data.length) return [];
    const maxVal = Math.max(...data.map((item) => item[viewMode]));
    return data.map((item) => ({
      ...item,
      dayName: new Date(item.date).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      displayHeight: `${(item[viewMode] / maxVal) * 100}%`,
    }));
  };

  const activeData = getFormattedData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.04)] h-full"
    >
      {/* Header remain same style */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-14">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#0F4C3A] rounded-2xl text-white shadow-lg shadow-[#0F4C3A]/20">
            <BarChart3 size={20} />
          </div>
          <div>
            <h3 className="font-bold text-xl text-slate-900 tracking-tight">
              Analytics Flow
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Live Activity
              </p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 relative">
          {["views", "clicks"].map((tab) => (
            <button
              key={tab}
              onClick={() => setViewMode(tab)}
              className={`relative z-10 px-6 py-2 text-[12px] font-bold rounded-xl transition-all duration-300 ${
                viewMode === tab
                  ? "text-white"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <span className="capitalize">{tab}</span>
              {viewMode === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#0F4C3A] rounded-xl shadow-lg -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* NEW MODERN COLUMN CHART */}
      <div className="flex items-end justify-between h-72 gap-4 sm:gap-8 px-4 border-b border-slate-100 pb-4 relative">
        {activeData.map((item, i) => {
          const isToday = i === activeData.length - 1;
          const isHovered = hoveredIndex === i;

          return (
            <div
              key={i}
              className="flex flex-col items-center flex-1 h-full relative group"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip logic same as before but deep theme */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: -20 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute -top-28 z-30 min-w-[120px] bg-slate-900 text-white p-3 rounded-2xl shadow-2xl"
                  >
                    <div className="flex flex-col gap-1 text-center">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                        {item.dayName}
                      </span>
                      <span className="text-sm font-bold text-emerald-400">
                        {item[viewMode].toLocaleString()}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* THE MODERN COLUMN */}
              <div className="relative flex items-end justify-center w-full h-full">
                {/* Column Base Shadow (For depth) */}
                {isToday && (
                  <div className="absolute bottom-0 w-full max-w-[40px] h-4 bg-emerald-500/20 blur-xl rounded-full" />
                )}

                <motion.div
                  layout
                  initial={{ height: 0 }}
                  animate={{ height: item.displayHeight }}
                  transition={{ type: "spring", damping: 15, stiffness: 100 }}
                  className={`w-full max-w-[44px] rounded-t-[2rem] rounded-b-xl relative cursor-pointer overflow-hidden shadow-inner transition-all duration-500 ${
                    isToday
                      ? "bg-gradient-to-t from-[#0F4C3A] via-[#14634d] to-[#1da37e] z-10"
                      : "bg-gradient-to-t from-slate-100 to-slate-50 border border-slate-200/50"
                  }`}
                >
                  {/* Gloss/Reflective Effect */}
                  <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

                  {/* Inner Highlight line for Premium Look */}
                  <div
                    className={`absolute top-4 left-1/2 -translate-x-1/2 w-[2px] h-[30%] rounded-full ${
                      isToday ? "bg-white/30" : "bg-slate-300/40"
                    }`}
                  />

                  {/* Hover Overlay */}
                  <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 bg-white/10"
                  />
                </motion.div>
              </div>

              {/* Label with dynamic weight */}
              <span
                className={`mt-6 text-[11px] font-black tracking-widest transition-all duration-300 ${
                  isHovered || isToday ? "text-[#0F4C3A]" : "text-slate-300"
                }`}
              >
                {item.dayName.toUpperCase()}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AnalyticsSection;
