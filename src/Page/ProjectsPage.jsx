import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Tag, DollarSign, TrendingUp, ChevronRight } from 'lucide-react';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://task-api-eight-flax.vercel.app/api/products")
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Active Projects</h1>
        <p className="text-slate-500 font-medium mt-1">Manage and track your product subscriptions.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-emerald-50 text-[#0F4C3A] rounded-2xl group-hover:bg-[#0F4C3A] group-hover:text-white transition-colors">
                <Briefcase size={24} />
              </div>
              <span className="bg-slate-50 text-slate-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                ID: {item.id}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">{item.name}</h3>
            
            <div className="flex items-center gap-2 mb-6">
              <Tag size={14} className="text-emerald-500" />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{item.category}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-6">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Revenue</p>
                <p className="text-lg font-black text-slate-900">${item.price}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Total Sales</p>
                <p className="text-lg font-black text-emerald-600">{item.sales}</p>
              </div>
            </div>
            
            <button className="w-full mt-6 py-3 bg-slate-50 group-hover:bg-[#0F4C3A] group-hover:text-white rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2">
              View Analytics <ChevronRight size={14} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};


export default ProjectsPage;
