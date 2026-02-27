import {
  ArrowUpRight,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const StatsGrid = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await fetch(
          "https://task-api-eight-flax.vercel.app/api/overview",
        );
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Failed to load overview data", err);
      }
    };
    fetchOverview();
  }, []);

  // Skeleton Loader for a premium feel
  if (!data) return <StatsSkeleton />;

  const statsConfig = [
    {
      label: "Total Users",
      value: data.totalUsers,
      icon: Users,
      trend: data.growth,
      color: "bg-[#0F4C3A] text-white",
      isPrimary: true,
    },
    {
      label: "Active Users",
      value: data.activeUsers,
      icon: Activity,
      trend: data.growth,
      color: "bg-white text-gray-900",
    },
    {
      label: "Total Revenue",
      value: `$${data.revenue.toLocaleString()}`,
      icon: DollarSign,
      trend: data.growth,
      color: "bg-white text-gray-900",
    },
    {
      label: "Market Growth",
      value: `${data.growth}%`,
      icon: TrendingUp,
      trend: null,
      color: "bg-white text-gray-900",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-1">
      {statsConfig.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          className={`${stat.color} p-7 rounded-[2.5rem] relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100/50 group cursor-default`}
        >
          {/* Subtle Background Glow for White Cards */}
          {!stat.isPrimary && (
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-gray-50 rounded-full blur-3xl group-hover:bg-[#0F4C3A]/5 transition-colors" />
          )}

          <div className="flex justify-between items-start mb-6 relative z-10">
            <div
              className={`p-3 rounded-2xl ${stat.isPrimary ? "bg-white/10" : "bg-gray-50 group-hover:bg-[#0F4C3A]/5 transition-colors"}`}
            >
              <stat.icon
                size={22}
                className={stat.isPrimary ? "text-white" : "text-[#0F4C3A]"}
              />
            </div>
            <motion.div
              whileHover={{ rotate: 45 }}
              className={`p-2 rounded-full cursor-pointer ${stat.isPrimary ? "bg-white/20" : "border border-gray-100"}`}
            >
              <ArrowUpRight size={16} />
            </motion.div>
          </div>

          <div className="relative z-10">
            <p
              className={`text-xs font-medium uppercase tracking-wider mb-1 opacity-60`}
            >
              {stat.label}
            </p>
            <motion.h3
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold tracking-tight"
            >
              {stat.value}
            </motion.h3>
          </div>

          <div className="mt-6 flex items-center gap-2 relative z-10">
            {stat.trend ? (
              <>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${stat.isPrimary ? "bg-white/20" : "bg-emerald-50 text-emerald-600"}`}
                >
                  +{stat.trend}%
                </span>
                <p className="text-[10px] opacity-50 font-medium">
                  vs last month
                </p>
              </>
            ) : (
              <p className="text-[10px] opacity-50 font-medium italic">
                Live performance
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Shimmer Effect for Loading
const StatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="h-48 bg-gray-100 rounded-[2.5rem] animate-pulse"
      />
    ))}
  </div>
);
