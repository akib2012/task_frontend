import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { Search, Bell, Mail, Command, Menu, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Header = ({ onOpenSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetch("https://task-api-eight-flax.vercel.app/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
      })
      .catch((err) => console.error("Dashboard fetch error:", err));
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers([]);
      return;
    }
    const results = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-4 z-40 flex items-center justify-between bg-white/80 backdrop-blur-md p-2.5 md:p-3 px-4 md:px-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mx-4"
    >
      <div className="flex items-center gap-2 md:gap-4 w-full">
        {/* Mobile Menu Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} />
        </motion.button>

        {/* Search Bar - Responsive width */}
        <div className="relative flex-1 max-w-[40px] sm:max-w-md group transition-all duration-500 sm:focus-within:max-w-md">
          <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0F4C3A] pointer-events-none">
            <Search size={18} />
          </div>
          <input
            type="text"
            // MODIFIED TEXT HERE
            placeholder="Search for anything..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50/50 pl-10 md:pl-12 pr-4 md:pr-12 py-2 md:py-2.5 rounded-2xl outline-none border border-transparent focus:border-[#0F4C3A]/20 focus:bg-white focus:shadow-sm text-sm transition-all duration-300 placeholder:text-transparent sm:placeholder:text-gray-400 focus:placeholder:text-gray-300"
          />

          {/* Search Result Dropdown */}
          <AnimatePresence>
            {searchTerm && filteredUsers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 mt-3 w-[280px] sm:w-full bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-60 overflow-y-auto z-50 p-2"
              >
                {filteredUsers.map((u) => (
                  <div
                    key={u.id}
                    className="px-4 py-3 text-sm hover:bg-gray-50 rounded-xl cursor-pointer transition-colors flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#0F4C3A]/10 text-[#0F4C3A] flex items-center justify-center font-bold">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 leading-tight">
                        {u.name}
                      </p>
                      <p className="text-[11px] text-gray-400">{u.email}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Shortcut hint - hidden on small mobile */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 px-2 py-1 bg-white border border-gray-100 rounded-lg shadow-sm text-[10px] text-gray-400 font-bold">
            <Command size={10} /> <span>K</span>
          </div>
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-1 md:gap-3 ml-auto shrink-0">
          {/* Notifications - Hidden on small phones */}
          <div className="hidden sm:flex items-center gap-1 pr-2 md:pr-4 md:border-r border-gray-100">
            {[
              { icon: Mail, dot: true },
              { icon: Bell, dot: false },
            ].map((item, idx) => (
              <motion.button
                key={idx}
                whileHover={{ y: -2 }}
                className="p-2 md:p-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-[#0F4C3A] transition-all relative"
              >
                <item.icon size={18} className="md:w-[20px] md:h-[20px]" />
                {item.dot && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[#0F4C3A] rounded-full border-2 border-white" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-2 md:gap-3 pl-1 md:pl-2">
            <div className="hidden lg:block text-right">
              <p className="text-xs font-bold text-gray-900 truncate max-w-[100px]">
                {user?.email?.split("@")[0] || "User"}
              </p>
              <p className="text-[9px] text-[#0F4C3A] font-black uppercase tracking-tighter bg-[#0F4C3A]/5 px-2 py-0.5 rounded-md">
                Pro
              </p>
            </div>

            <motion.img
              whileHover={{ scale: 1.05 }}
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
              alt="profile"
              className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl object-cover bg-gray-100 border-2 border-white shadow-sm"
            />

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              className="p-2 md:p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            >
              <LogOut size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
