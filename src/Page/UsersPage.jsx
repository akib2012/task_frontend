import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Mail, Calendar, MoreVertical, ShieldCheck } from "lucide-react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://task-api-eight-flax.vercel.app/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Team Members
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Manage your workspace collaborators.
          </p>
        </div>
        <button className="bg-[#0F4C3A] text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-900/20 hover:scale-105 transition-transform">
          Invite Member
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="p-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                Member
              </th>
              <th className="p-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                Status
              </th>
              <th className="p-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                Joined Date
              </th>
              <th className="p-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <motion.tr
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={user.id}
                className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors"
              >
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-100 text-[#0F4C3A] rounded-full flex items-center justify-center font-black text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-tighter">
                    <ShieldCheck size={12} /> {user.status}
                  </span>
                </td>
                <td className="p-6 text-sm text-slate-500 font-medium">
                  {new Date(user.joinDate).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="p-6">
                  <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-white rounded-xl transition-all">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default UsersPage;