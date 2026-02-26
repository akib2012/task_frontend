export const AnalyticsSection = () => {
  const data = [
    { d: 'S', h: '40%' }, { d: 'M', h: '65%' }, { d: 'T', h: '50%', active: true },
    { d: 'W', h: '85%' }, { d: 'T', h: '55%' }, { d: 'F', h: '45%' }, { d: 'S', h: '35%' }
  ];
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 h-full">
      <h3 className="font-bold text-lg mb-8">Project Analytics</h3>
      <div className="flex items-end justify-between h-40 px-2 relative">
        {data.map((item, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div className={`w-10 rounded-full relative ${item.active ? 'bg-[#4ADE80]' : 'bg-[#0F4C3A]'}`} style={{ height: item.h }}>
              {item.active && <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] bg-white shadow-sm px-1.5 rounded border border-gray-100">74%</span>}
            </div>
            <span className="mt-4 text-[10px] font-bold text-gray-400 uppercase">{item.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
};