import React from "react";
import { Plus } from "lucide-react";

export const ProjectList = ({ projects = [] }) => {
  // Fallback mock data if API is loading or empty
  const displayProjects =
    projects.length > 0
      ? projects
      : [
          {
            id: 1,
            title: "Develop API Endpoints",
            date: "Nov 26, 2024",
            color: "bg-blue-500",
          },
          {
            id: 2,
            title: "Onboarding Flow",
            date: "Nov 28, 2024",
            color: "bg-teal-500",
          },
          {
            id: 3,
            title: "Build Dashboard",
            date: "Nov 30, 2024",
            color: "bg-yellow-400",
          },
          {
            id: 4,
            title: "Optimize Page Load",
            date: "Dec 05, 2024",
            color: "bg-orange-500",
          },
          {
            id: 5,
            title: "Cross-Browser Testing",
            date: "Dec 06, 2024",
            color: "bg-purple-500",
          },
        ];

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm h-full overflow-hidden">
      {/* Header with Add New Button */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-bold text-lg text-[#1A1A1A]">Project</h3>
        <button className="flex items-center gap-1 text-[10px] font-bold border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors uppercase tracking-wider text-gray-600">
          <Plus size={12} strokeWidth={3} /> New
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-6">
        {displayProjects.map((project) => (
          <div
            key={project.id}
            className="flex items-start gap-4 group cursor-pointer"
          >
            {/* Color Indicator Pillar */}
            <div
              className={`w-1.5 h-10 rounded-full ${project.color || "bg-gray-200"} shrink-0 opacity-80 group-hover:opacity-100 transition-opacity`}
            ></div>

            <div className="flex-1 border-b border-gray-50 pb-4 group-last:border-0">
              <h4 className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#0F4C3A] transition-colors leading-tight">
                {project.title}
              </h4>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-1">
                Due date: <span className="text-gray-500">{project.date}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
