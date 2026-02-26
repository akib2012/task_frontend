export const TeamSection = () => {
  const team = [
    { name: 'Alexandra Deff', task: 'Github Project Repository', status: 'Completed', sColor: 'text-green-600 bg-green-50' },
    { name: 'Edwin Adenike', task: 'Integrate User Authentication', status: 'In Progress', sColor: 'text-orange-600 bg-orange-50' },
    { name: 'Isaac Oluwatemilorun', task: 'Develop Search Functionality', status: 'Pending', sColor: 'text-red-600 bg-red-50' },
    { name: 'David Oshodi', task: 'Responsive Layout Homepage', status: 'In Progress', sColor: 'text-orange-600 bg-orange-50' },
  ];
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg">Team Collaboration</h3>
        <button className="text-[10px] font-bold border border-gray-100 px-4 py-1.5 rounded-full hover:bg-gray-50">+ Add Member</button>
      </div>
      <div className="space-y-5">
        {team.map((m, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={`https://i.pravatar.cc/150?u=${i}`} alt="avatar" className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-sm font-bold leading-tight">{m.name}</p>
                <p className="text-[10px] text-gray-400">Working on <span className="text-gray-600 font-medium">{m.task}</span></p>
              </div>
            </div>
            <span className={`text-[10px] px-2.5 py-1 rounded-lg font-bold ${m.sColor}`}>{m.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};