import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MoreVertical,
  ShieldCheck,
  UserPlus,
  Mail,
} from "lucide-react";
import Loader from "../components/Loading/Loader";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://task-api-eight-flax.vercel.app/api/users",
        );
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("User fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    // Max-w-7xl ensures it doesn't get too wide on huge monitors
    // px-4 on mobile, p-8 on desktop
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 min-h-screen">
      {/* Header Section: Stack on mobile, side-by-side on desktop */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Team Members
          </h1>
          <p className="text-slate-500 font-medium mt-1 text-sm md:text-base">
            Manage your workspace collaborators and their roles.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto bg-[#0F4C3A] text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-green-900/20 flex items-center justify-center gap-2 hover:bg-[#0a3a2c] transition-all"
        >
          <UserPlus size={18} />
          Invite Member
        </motion.button>
      </div>

      {/* Main Content Area: Responsive container */}
      <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-10"
            >
              <Loader />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full"
            >
              {/* TABLE VIEW: Hidden on mobile, block on md+ */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="p-6 lg:p-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">
                        Member
                      </th>
                      <th className="p-6 lg:p-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">
                        Status
                      </th>
                      <th className="p-6 lg:p-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">
                        Joined Date
                      </th>
                      <th className="p-6 lg:p-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.15em] text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {users.map((user, idx) => (
                      <TableRow key={user.id} user={user} idx={idx} />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* CARD VIEW: Block on mobile, hidden on md+ */}
              <div className="md:hidden grid grid-cols-1 divide-y divide-slate-100">
                {users.map((user, idx) => (
                  <UserCard key={user.id} user={user} idx={idx} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Sub-component for Desktop Table Row
const TableRow = ({ user, idx }) => (
  <motion.tr
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: idx * 0.04 }}
    className="group hover:bg-slate-50/50 transition-all duration-300"
  >
    <td className="p-6 lg:p-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-emerald-50 text-[#0F4C3A] rounded-2xl flex items-center justify-center font-black text-base shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform">
          {user.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-slate-900 truncate">{user.name}</p>
          <p className="text-xs text-slate-400 font-medium truncate">
            {user.email}
          </p>
        </div>
      </div>
    </td>
    <td className="p-6 lg:p-8">
      <StatusBadge status={user.status} />
    </td>
    <td className="p-6 lg:p-8">
      <div className="flex items-center gap-2 text-sm text-slate-500 font-bold whitespace-nowrap">
        <Calendar size={14} className="text-slate-300" />
        {formatDate(user.joinDate)}
      </div>
    </td>
    <td className="p-6 lg:p-8 text-center">
      <button className="p-2.5 text-slate-300 hover:text-[#0F4C3A] hover:bg-white border border-transparent hover:border-slate-100 rounded-xl transition-all">
        <MoreVertical size={18} />
      </button>
    </td>
  </motion.tr>
);

// Sub-component for Mobile Cards
const UserCard = ({ user, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: idx * 0.04 }}
    className="p-5 flex flex-col gap-4"
  >
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-50 text-[#0F4C3A] rounded-xl flex items-center justify-center font-black">
          {user.name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-slate-900 text-sm">{user.name}</p>
          <p className="text-[11px] text-slate-400 font-medium">{user.email}</p>
        </div>
      </div>
      <button className="p-2 text-slate-300">
        <MoreVertical size={18} />
      </button>
    </div>

    <div className="flex justify-between items-center bg-slate-50/50 p-3 rounded-xl">
      <StatusBadge status={user.status} />
      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-bold">
        <Calendar size={12} className="text-slate-300" />
        {formatDate(user.joinDate)}
      </div>
    </div>
  </motion.div>
);

// Helper Components
const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
      status?.toLowerCase() === "active"
        ? "bg-emerald-50 text-emerald-600"
        : "bg-amber-50 text-amber-600"
    }`}
  >
    <ShieldCheck size={12} strokeWidth={3} /> {status}
  </span>
);

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

export default UsersPage;
