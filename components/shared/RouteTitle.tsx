"use client";

import { usePathname } from "next/navigation";
import { links } from "@/data/links";
import { ChevronRight, Menu } from "lucide-react";
import { useSidebarStore } from "@/stores/SidebarStore";
import Link from "next/link";

export function RouteTitle() {
  const { toggleSidebar } = useSidebarStore();

  const pathname = usePathname();

  const segments = pathname !== null ? pathname.split("/").filter(Boolean) : [];

  const mainRoute = links.find((link) => link.href === `/${segments[0]}`);

  const subRoute =
    mainRoute && segments.length > 1
      ? mainRoute.subLinks.find((sub) => sub.href === `/${segments[1]}`)
      : null;

  return (
    <header className="w-full py-6 px-4 border-b border-b-neutral-200">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className={`p-1 hover:bg-[#d9f2f9] hover:text-cyan-800 rounded transition-all duration-300 lg:hidden cursor-pointer`}
        >
          <Menu className="size-4" />
        </button>

        <Link className="text-lg" href={`${mainRoute?.href}`}>
          {mainRoute?.title}
        </Link>

        {subRoute && (
          <>
            <ChevronRight className="size-4 text-cyan-800" />
            <span className="text-lg">{subRoute.title}</span>
          </>
        )}
      </div>
    </header>
  );
}
