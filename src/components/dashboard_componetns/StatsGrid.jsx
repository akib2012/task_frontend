import { ArrowUpRight } from 'lucide-react';

export const StatsGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
    <div className="bg-[#0F4C3A] p-6 rounded-[2rem] text-white">
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm opacity-80">Total Projects</p>
        <div className="bg-white/20 p-2 rounded-full cursor-pointer"><ArrowUpRight size={16}/></div>
      </div>
      <h3 className="text-4xl font-bold">24</h3>
      <p className="text-[10px] mt-4 opacity-70"><span className="bg-white/20 px-1 rounded mr-1">6+</span> Increased from last month</p>
    </div>
    {['Ended Projects', 'Running Projects', 'Pending Project'].map((label, i) => (
      <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm text-gray-500">{label}</p>
          <div className="border border-gray-100 p-2 rounded-full cursor-pointer"><ArrowUpRight size={16}/></div>
        </div>
        <h3 className="text-4xl font-bold text-[#0F4C3A]">{i === 0 ? '10' : i === 1 ? '12' : '2'}</h3>
        <p className="text-[10px] mt-4 text-gray-400">
          {i === 2 ? 'On Discuss' : <><span className="border border-gray-100 px-1 rounded text-green-600 font-bold mr-1">{i === 0 ? '6+' : '2+'}</span> Increased from last month</>}
        </p>
      </div>
    ))}
  </div>
);