import React, { useState } from "react";
import { Outlet } from "react-router";
import Header from "../components/dashboard_componetns/Header";
import { Sidebar } from "../components/dashboard_componetns/Sidebar";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans">
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <Header onOpenSidebar={() => setMobileOpen(true)} />

        <div className="mt-6 md:mt-8 space-y-6">
          {/* This will change by route */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}
