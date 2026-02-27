import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { Search, Bell, Mail, Command, Menu, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Header = ({ onOpenSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Fetch dashboard data
  useEffect(() => {
    fetch("https://task-api-eight-flax.vercel.app/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
      })
      .catch((err) => console.error("Dashboard fetch error:", err));
  }, []);

  // Filter users by name
  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers([]);
      return;
    }

    const results = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredUsers(results);
    console.log("Search Result:", results);
  }, [searchTerm, users]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-4 z-40 flex items-center justify-between bg-white/80 backdrop-blur-md p-3 px-6 rounded-[2rem] border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mx-4"
    >
      <div className="flex items-center gap-4 w-full">
        {/* Mobile Menu Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onOpenSidebar}
          className="lg:hidden p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} />
        </motion.button>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md group">
          <motion.div
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0F4C3A]"
            initial={false}
          >
            <Search size={18} />
          </motion.div>
          <input
            type="text"
            placeholder="Search by user name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50/50 pl-12 pr-12 py-2.5 rounded-2xl outline-none border border-transparent focus:border-[#0F4C3A]/20 focus:bg-white focus:shadow-sm text-sm transition-all duration-300"
          />

          {/* Search Result Dropdown */}
          {searchTerm && filteredUsers.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 max-h-60 overflow-y-auto z-50">
              {filteredUsers.map((u) => (
                <div
                  key={u.id}
                  className="px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                >
                  <p className="font-medium">{u.name}</p>
                  <p className="text-xs text-gray-400">{u.email}</p>
                </div>
              ))}
            </div>
          )}

          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5 px-2 py-1 bg-white border border-gray-100 rounded-lg shadow-sm text-[10px] text-gray-400 font-medium">
            <Command size={10} /> <span>K</span>
          </div>
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Notifications & Messages */}
          <div className="hidden md:flex items-center gap-2 pr-4 border-r border-gray-100">
            {[
              { icon: Mail, dot: true },
              { icon: Bell, dot: false },
            ].map((item, idx) => (
              <motion.button
                key={idx}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-[#0F4C3A] transition-all relative"
              >
                <item.icon size={20} />
                {item.dot && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#0F4C3A] rounded-full border-2 border-white" />
                )}
              </motion.button>
            ))}
          </div>

          {/* User Profile Section */}
          <motion.div layout className="flex items-center gap-3 pl-2">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-semibold text-gray-900 truncate max-w-[120px]">
                {user?.email?.split("@")[0] || "User"}
              </p>
              <p className="text-[10px] text-[#0F4C3A] font-medium bg-[#0F4C3A]/5 px-2 py-0.5 rounded-full inline-block">
                Pro Plan
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative cursor-pointer group"
            >
              <img
                src={`https://i.pravatar.cc/150?u=${user?.email}`}
                alt="profile"
                className="w-10 h-10 rounded-2xl object-cover border-2 border-white shadow-md group-hover:shadow-[#0F4C3A]/10 transition-shadow"
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              title="Logout"
            >
              <LogOut size={18} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
