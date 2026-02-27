import React, { useState } from "react";
import { AnalyticsSection } from "../components/dashboard_componetns/AnalyticsSection";
import Header from "../components/dashboard_componetns/Header";
import ProjectList from "../components/dashboard_componetns/ProjectList";
import { ProjectProgress } from "../components/dashboard_componetns/ProjectProgress";
import ReminderCard from "../components/dashboard_componetns/ReminderCard";
import { Sidebar } from "../components/dashboard_componetns/Sidebar";
import { StatsGrid } from "../components/dashboard_componetns/StatsGrid";
import { TeamSection } from "../components/dashboard_componetns/TeamSection";
import { TimeTracker } from "../components/dashboard_componetns/TimeTracker";

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans">
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <Header onOpenSidebar={() => setMobileOpen(true)} />

        <div className="mt-6 md:mt-8 space-y-6">
          {/* ===== Top Stats Row ===== */}
          <StatsGrid />

          {/* ===== Middle Row ===== */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-5">
              <AnalyticsSection />
            </div>

            <div className="col-span-12 lg:col-span-3">
              <ReminderCard />
            </div>

            <div className="col-span-12 lg:col-span-4">
              <ProjectList />
            </div>
          </div>

          {/* ===== Bottom Row ===== */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <TeamSection />
            </div>

            <div className="col-span-12 lg:col-span-3">
              <ProjectProgress />
            </div>

            <div className="col-span-12 lg:col-span-3">
              <TimeTracker />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
