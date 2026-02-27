import React from "react";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Zap,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router";

export const Sidebar = ({ mobileOpen = false, onClose = () => {} }) => {
  const menuItems = [
    {
      icon: <LayoutDashboard size={18} />,
      label: "Overview",
      path: "/dashboard",
    },
    {
      icon: <Briefcase size={18} />,
      label: "Projects",
      badge: "API",
      path: "/dashboard/projects",
    },
    {
      icon: <Users size={18} />,
      label: "Team",
      badge: "8k",
      path: "/dashboard/team",
    },
    {
      icon: <BarChart3 size={18} />,
      label: "Analytics",
      path: "/dashboard/analytics",
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 bg-[#0F4C3A] rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
          <Zap size={20} className="text-white fill-current" />
        </div>
        <span className="text-xl font-black text-slate-900 tracking-tight">
          Donezo
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-2">
        <p className="text-[10px] font-black text-slate-400 mb-4 px-3 uppercase tracking-[0.2em]">
          Main Menu
        </p>

        {menuItems.map((item, idx) => (
          <NavItem key={idx} {...item} />
        ))}

        <p className="text-[10px] font-black text-slate-400 mt-10 mb-4 px-3 uppercase tracking-[0.2em]">
          Configuration
        </p>

       {/*  <NavItem
          icon={<Settings size={18} />}
          label="Settings"
          path="/dashboard/settings"
        /> */}

        <NavItem
          icon={<LogOut size={18} />}
          label="Logout"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        />
      </nav>

      {/* Premium Upgrade Card */}
      <div className="mt-auto relative group cursor-pointer">
        <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
        <div className="relative bg-[#0F4C3A] rounded-[2rem] p-6 text-white overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
          <p className="text-xs font-bold text-emerald-200 mb-1 uppercase tracking-widest">
            Pro Version
          </p>
          <div className="text-sm font-black mb-4 leading-snug">
            Unlock API Analytics
          </div>
          <button className="w-full bg-white text-[#0F4C3A] py-3 rounded-xl text-[11px] font-black hover:bg-emerald-50 transition-colors uppercase tracking-widest">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="w-72 border-r border-slate-100 flex flex-col p-8 h-screen sticky top-0 hidden lg:flex bg-white">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            className="absolute left-0 top-0 bottom-0 w-72 bg-white p-8 shadow-2xl"
          >
            <SidebarContent />
          </motion.div>
        </div>
      )}
    </>
  );
};

const NavItem = ({ icon, label, badge, path, onClick }) => {
  if (path) {
    return (
      <NavLink to={path}>
        {({ isActive }) => (
          <motion.div
            whileHover={{ x: 4 }}
            className={`group flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all duration-300 ${
              isActive
                ? "bg-[#0F4C3A] text-white shadow-lg shadow-emerald-900/10 my-5"
                : "text-slate-400 hover:bg-slate-50 hover:text-[#0F4C3A]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-[#0F4C3A]"}`}
              >
                {icon}
              </span>
              <span className="font-bold text-[13px] tracking-tight">
                {label}
              </span>
            </div>

            {badge ? (
              <span
                className={`text-[9px] font-black px-2 py-0.5 rounded-lg border ${
                  isActive
                    ? "bg-white/20 border-white/20 text-white"
                    : "bg-slate-100 border-slate-200 text-slate-500"
                }`}
              >
                {badge}
              </span>
            ) : (
              isActive && <ChevronRight size={14} className="opacity-50" />
            )}
          </motion.div>
        )}
      </NavLink>
    );
  }

  return (
    <motion.div
      whileHover={{ x: 4 }}
      onClick={onClick}
      className="group flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all duration-300 text-slate-400 hover:bg-slate-50 hover:text-[#0F4C3A]"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-bold text-[13px] tracking-tight">{label}</span>
      </div>
    </motion.div>
  );
};
