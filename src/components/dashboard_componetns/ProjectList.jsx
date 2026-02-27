import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MoreVertical, Calendar } from "lucide-react";

export const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://task-api-eight-flax.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.slice(0, 5)); // Taking top 5 for design symmetry
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
        setIsLoading(false);
      });
  }, []);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full overflow-hidden"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8 px-2">
        <div>
          <h3 className="font-bold text-xl text-[#1A1A1A]">Plans</h3>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
            Active plan
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-[#0F4C3A] text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg shadow-green-900/20 transition-all hover:bg-[#0a3a2c]"
        >
          <Plus size={14} strokeWidth={3} /> New
        </motion.button>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-6 h-6 border-2 border-[#0F4C3A] border-t-transparent rounded-full"
          />
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <AnimatePresence>
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ x: 8 }}
                className="flex items-center gap-4 p-3 rounded-[1.5rem] hover:bg-gray-50 transition-colors group relative"
              >
                {/* Modern Icon/Indicator */}
                <div
                  className={`relative w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:rotate-6
                  ${
                    project.category === "addon"
                      ? "bg-blue-50 text-blue-500"
                      : project.category === "service"
                        ? "bg-teal-50 text-teal-500"
                        : "bg-purple-50 text-purple-500"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full absolute top-2 right-2 animate-pulse 
                    ${project.category === "addon" ? "bg-blue-500" : "bg-teal-500"}`}
                  />
                  <Calendar size={18} />
                </div>

                <div className="flex-1 overflow-hidden">
                  <h4 className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#0F4C3A] transition-colors truncate">
                    {project.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md font-bold uppercase">
                      ${project.price}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {project.sales} sales
                    </span>
                  </div>
                </div>

                <button className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-gray-600 transition-all">
                  <MoreVertical size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectList;
