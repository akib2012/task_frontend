import React from 'react';
import { Video, MoreHorizontal } from 'lucide-react';

export const ReminderCard = () => {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm h-full flex flex-col justify-between">
      {/* Top Section: Header and Icon */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-[#1A1A1A]">Reminders</h3>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {/* Meeting Details */}
        <div className="space-y-2">
          <h4 className="text-xl font-bold text-[#0F4C3A] leading-tight tracking-tight">
            Meeting with Arc Company
          </h4>
          <p className="text-xs text-gray-400 font-medium flex items-center gap-1">
            Time: 02.00 pm - 04.00 pm
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-8">
        <button className="w-full bg-[#0F4C3A] hover:bg-[#0a3a2c] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-green-900/10 group">
          <div className="bg-white/20 p-1.5 rounded-lg group-hover:bg-white/30 transition-colors">
            <Video size={18} fill="currentColor" />
          </div>
          <span className="text-sm">Start Meeting</span>
        </button>
      </div>
    </div>
  );
};

export default ReminderCard;