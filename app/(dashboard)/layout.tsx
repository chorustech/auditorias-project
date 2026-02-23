"use client";

import { Announcement } from "@/components/shared/announcement/Announcement";
import { RouteTitle } from "@/components/shared/routeTitle/RouteTitle";
import { Sidebar } from "@/components/shared/sidebar/Sidebar";
import { useSidebarStore } from "@/stores/sidebar/SidebarStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { expanded } = useSidebarStore();

  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <Announcement />
      <div
        className={`flex flex-col h-dvh w-full transition-all duration-300 ${
          expanded
            ? "lg:left-64 lg:w-[calc(100%-16rem)]"
            : "lg:left-16 lg:w-[calc(100%-4rem)] z-40"
        }`}
      >
        <RouteTitle />
        <main className={`overflow-y-auto flex-1`}>{children}</main>
      </div>
    </div>
  );
}
