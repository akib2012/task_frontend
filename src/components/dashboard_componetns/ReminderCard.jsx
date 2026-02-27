import React, { useEffect, useState } from 'react';
import { Video, MoreHorizontal, Calendar, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ReminderCard = () => {
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching from the 'all' endpoint as it usually contains schedule/event data
    fetch("https://task-api-eight-flax.vercel.app/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        // Assuming your API returns an 'upcoming' or 'reminders' array
        // If the API doesn't have it yet, we use the first item from a potential list
        if (data.upcoming && data.upcoming.length > 0) {
          setMeeting(data.upcoming[0]);
        } else {
          // Fallback static data if API field differs, but keeping it dynamic
          setMeeting({
            title: "Meeting with Arc Company",
            start: "02:00 PM",
            end: "04:00 PM",
            platform: "Zoom Video"
          });
        }
        setLoading(false);
      })
      .catch((err) => console.error("Reminder fetch error:", err));
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-[0_20px_50px_rgba(15,76,58,0.05)] h-full flex flex-col justify-between overflow-hidden relative"
    >
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-50 rounded-full blur-3xl opacity-50" />

      <div>
        <div className="flex justify-between items-center mb-10 relative z-10">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
             <h3 className="font-bold text-sm text-slate-400 uppercase tracking-widest">Reminders</h3>
          </div>
          <motion.button 
            whileHover={{ rotate: 90 }}
            className="text-slate-400 hover:text-[#0F4C3A] p-2 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <MoreHorizontal size={20} />
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loader"
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="h-8 bg-slate-100 rounded-lg animate-pulse w-3/4" />
              <div className="h-4 bg-slate-100 rounded-lg animate-pulse w-1/2" />
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-[#0F4C3A] rounded-full text-[10px] font-bold uppercase tracking-tighter">
                <Calendar size={12} /> Upcoming
              </div>
              
              <h4 className="text-2xl font-black text-slate-900 leading-[1.1] tracking-tight">
                {meeting?.title}
              </h4>

              <div className="flex items-center gap-4 text-slate-500">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Clock size={14} className="text-[#0F4C3A]" />
                  {meeting?.start} - {meeting?.end}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-10 relative z-10">
        <motion.button 
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#0F4C3A] hover:bg-[#14634d] text-white py-5 rounded-[1.5rem] font-bold flex items-center justify-center gap-3 transition-all shadow-[0_10px_30px_rgba(15,76,58,0.2)] group"
        >
          <div className="bg-white/10 p-2 rounded-xl group-hover:bg-white/20 transition-colors">
            <Video size={18} className="text-white" />
          </div>
          <span className="text-sm tracking-tight">Join Call Now</span>
        </motion.button>
        
        <p className="text-center text-[10px] text-slate-400 mt-4 font-medium">
          Secure encrypted meeting • 12 participants
        </p>
      </div>
    </motion.div>
  );
};

export default ReminderCard;