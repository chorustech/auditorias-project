"use client";

import { Announcement } from "@/components/shared/announcement/Announcement";
import { Modal } from "@/components/shared/modal/Modal";
import { RouteTitle } from "@/components/shared/routeTitle/RouteTitle";
import { Sidebar } from "@/components/shared/sidebar/Sidebar";
import { useSidebarStore } from "@/stores/sidebar/SidebarStore";
import { motion } from "framer-motion";
import DownloadProgress from "@/components/shared/download/ExcelDownloadProgress";
import { User, UserPrimitive } from "@/src/users";

export function DashboardClientLayout({
    children,
    user
}: {
    children: React.ReactNode;
    user: UserPrimitive | null;
}) {
    const { expanded } = useSidebarStore();

    return (
        <motion.div
            className="flex min-h-dvh overflow-y-hidden overflow-x-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <Sidebar user={user} />
            <Announcement />
            <Modal />
            <DownloadProgress />
            <div
                className={`flex flex-col h-dvh w-full transition-all duration-300 ${expanded
                        ? "lg:left-64 lg:w-[calc(100%-16rem)]"
                        : "lg:left-16 lg:w-[calc(100%-4rem)] z-40"
                    }`}
            >
                <RouteTitle />
                <main className={`overflow-y-auto flex-1`}>{children}</main>
            </div>
        </motion.div>
    );
}
