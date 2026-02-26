import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BarChart2,
  Users,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

export const Sidebar = () => (
  <aside className="w-64 bg-white border-r border-gray-100 flex flex-col p-6 h-screen sticky top-0 hidden lg:flex">
    <div className="flex items-center gap-2 mb-10 px-2 text-[#0F4C3A]">
      <div className="w-8 h-8 bg-[#0F4C3A] rounded-lg flex items-center justify-center text-white font-bold">
        D
      </div>
      <span className="text-xl font-bold text-black">Donezo</span>
    </div>
    <nav className="flex-1 space-y-1">
      <p className="text-[10px] font-bold text-gray-400 mb-4 px-2 uppercase tracking-widest">
        Menu
      </p>
      <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
      <NavItem icon={<CheckSquare size={20} />} label="Tasks" badge="12+" />
      <NavItem icon={<Calendar size={20} />} label="Calendar" />
      <NavItem icon={<BarChart2 size={20} />} label="Analytics" />
      <NavItem icon={<Users size={20} />} label="Team" />
      <p className="text-[10px] font-bold text-gray-400 mt-8 mb-4 px-2 uppercase tracking-widest">
        General
      </p>
      <NavItem icon={<Settings size={20} />} label="Settings" />
      <NavItem icon={<HelpCircle size={20} />} label="Help" />
      <NavItem icon={<LogOut size={20} />} label="Logout" />
    </nav>
    <div className="mt-auto bg-[#0F4C3A] rounded-[1.5rem] p-5 text-white relative overflow-hidden">
      <div className="relative z-10 text-sm font-medium mb-3">
        Download our Mobile App
      </div>
      <button className="relative z-10 bg-[#1D8A61] w-full py-2.5 rounded-xl text-xs font-bold hover:bg-opacity-90 transition">
        Download
      </button>
    </div>
  </aside>
);

const NavItem = ({ icon, label, active, badge }) => (
  <div
    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition ${active ? "bg-[#0F4C3A] text-white" : "text-gray-400 hover:bg-gray-50 hover:text-[#0F4C3A]"}`}
  >
    <div className="flex items-center gap-3">
      {" "}
      {icon} <span className="font-semibold text-sm">{label}</span>{" "}
    </div>
    {badge && (
      <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded-md border border-white/20">
        {badge}
      </span>
    )}
  </div>
);
