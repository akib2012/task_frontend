import React from 'react';
import { useNavigate } from 'react-router';
import { Home, AlertCircle, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-12 text-center">
        {/* Animated Icon Container */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          <div className="absolute inset-0 bg-[#0F4C3A]/5 rounded-full animate-ping"></div>
          <div className="relative flex items-center justify-center w-24 h-24 bg-[#0F4C3A] rounded-[2rem] text-white shadow-xl shadow-green-900/20">
            <AlertCircle size={48} />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-6xl font-black text-[#0F4C3A] mb-2 tracking-tighter">404</h1>
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Page Not Found</h2>
        <p className="text-gray-400 text-sm mb-10 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-[#0F4C3A] hover:bg-[#0a3a2c] text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-900/10 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            <Home size={18} />
            Back to Dashboard
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-transparent hover:bg-gray-50 text-gray-500 font-semibold py-3 rounded-2xl transition-all flex items-center justify-center gap-2 border border-transparent hover:border-gray-200"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;