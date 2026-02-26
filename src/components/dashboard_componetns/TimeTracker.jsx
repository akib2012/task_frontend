import { Play, Square } from "lucide-react";

export const TimeTracker = () => (
  <div className="bg-[#0F4C3A] p-6 rounded-[2rem] text-white flex flex-col justify-between h-full relative overflow-hidden">
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
    <h3 className="font-bold text-lg relative z-10">Time Tracker</h3>
    <div className="text-center py-4 relative z-10">
      <span className="text-4xl font-mono tracking-widest font-medium">
        01:24:08
      </span>
    </div>
    <div className="flex justify-center gap-4 relative z-10">
      <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0F4C3A] hover:bg-gray-100 transition shadow-lg">
        <div className="flex gap-1">
          <div className="w-1 h-4 bg-current rounded-full"></div>
          <div className="w-1 h-4 bg-current rounded-full"></div>
        </div>
      </button>
      <button className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition shadow-lg">
        <Square size={20} fill="currentColor" />
      </button>
    </div>
  </div>
);
