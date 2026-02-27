import React from "react";
import { AnalyticsSection } from "../components/dashboard_componetns/AnalyticsSection";
import ProjectList from "../components/dashboard_componetns/ProjectList";
import { ProjectProgress } from "../components/dashboard_componetns/ProjectProgress";
import ReminderCard from "../components/dashboard_componetns/ReminderCard";
import { StatsGrid } from "../components/dashboard_componetns/StatsGrid";
import { TeamSection } from "../components/dashboard_componetns/TeamSection";
import { TimeTracker } from "../components/dashboard_componetns/TimeTracker";

export default function Dashboard() {
  return (
    <>
      <StatsGrid />

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
    </>
  );
}
