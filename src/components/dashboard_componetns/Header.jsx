import { Search, Bell, Mail, Command } from 'lucide-react';

const Header = () => (
  <header className="flex items-center justify-between bg-white p-4 rounded-[1.5rem] border border-gray-100 shadow-sm">
    <div className="relative w-96 group">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0F4C3A] transition-colors" size={18} />
      <input 
        type="text" 
        placeholder="Search task" 
        className="w-full bg-[#F8F9FA] pl-12 pr-12 py-3 rounded-2xl outline-none border border-transparent focus:border-gray-200 text-sm transition-all"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-white px-1.5 py-0.5 border border-gray-200 rounded-md text-[10px] text-gray-400 font-bold">
        <Command size={10} /> F
      </div>
    </div>

    <div className="flex items-center gap-6">
      <div className="flex items-center gap-4 text-gray-500">
        <button className="hover:text-[#0F4C3A] transition-colors relative">
          <Mail size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="hover:text-[#0F4C3A] transition-colors"><Bell size={20} /></button>
      </div>
      
      <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
        <div className="text-right">
          <p className="text-sm font-bold text-[#1A1A1A]">Totok Michael</p>
          <p className="text-[10px] text-gray-400">tmichael20@gmail.com</p>
        </div>
        <img src="https://i.pravatar.cc/150?u=totok" alt="profile" className="w-10 h-10 rounded-full border border-gray-100 shadow-sm" />
      </div>
    </div>
  </header>
);

export default Header;