export const ProjectProgress = () => (
  <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center">
    <h3 className="font-bold text-lg self-start mb-6">Project Progress</h3>
    <div className="relative w-44 h-24 mb-6">
      <svg viewBox="0 0 100 50" className="w-full h-full">
        <path d="M 10,50 A 40,40 0 0,1 90,50" fill="none" stroke="#F1F5F9" strokeWidth="12" strokeLinecap="round" />
        <path d="M 10,50 A 40,40 0 0,1 70,18" fill="none" stroke="#0F4C3A" strokeWidth="12" strokeLinecap="round" />
      </svg>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
        <p className="text-3xl font-black text-[#0F4C3A]">41%</p>
        <p className="text-[10px] text-gray-400 font-bold uppercase">Project Ended</p>
      </div>
    </div>
    <div className="flex gap-4 text-[10px] font-bold">
      <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#0F4C3A]"></div> Completed</div>
      <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#4ADE80]"></div> In Progress</div>
    </div>
  </div>
);