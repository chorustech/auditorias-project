"use client";

import { useSidebarStore } from "@/stores/SidebarStore";
import AssaAbloyTitle from "@/svg/AssaAbloyTitle";
import { Menu, LogOut, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/data/links";

export function Sidebar() {
  const { expanded, toggleSidebar } = useSidebarStore();

  const pathname = usePathname();

  const linkClasses = (path: string) => {
    const isActive = pathname === path || pathname?.startsWith(`${path}/`);

    return `${isActive ? "bg-linear-to-br from-[#d9f2f9] via-[#F0FDFF] to-[#d9f2f9] bg-animated-gradient text-cyan-800" : "text-black hover:bg-neutral-100 transition-all duration-300"}`;
  };

  return (
    <aside
      className={`flex flex-col z-50 transition-all bg-white duration-300 justify-between h-dvh border-r border-r-neutral-200 absolute lg:static ${expanded ? "w-64 left-0" : "lg:w-18 w-64 -left-64"}`}
    >
      <div className="w-full h-fit flex flex-col p-4">
        <div
          className={`flex items-center mb-20 relative ${expanded ? "justify-end" : "lg:justify-center justify-end"}`}
        >
          <div
            className={`transition-all duration-300 pointer-events-none absolute ${expanded ? "w-40 lg:opacity-100 left-0" : "left-0 w-40 lg:w-0 lg:opacity-0 lg:-left-64"}`}
          >
            <AssaAbloyTitle />
          </div>
          <button
            onClick={toggleSidebar}
            className={`p-1 hover:bg-[#d9f2f9] hover:text-cyan-800 rounded transition-all duration-300 cursor-pointer`}
          >
            {expanded ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`p-2 rounded-xl relative group ${linkClasses(link.href)}`}
            >
              <div
                className={`flex items-center transition-all duration-300 ${expanded ? "gap-6" : "lg:gap-0 gap-6"}`}
              >
                <div className="w-fit h-fit ml-1">
                  <link.Icon className="size-4" />
                </div>
                <span
                  className={`transition-all duration-300 ${expanded ? "w-fit opacity-100" : "lg:w-0 w-fit lg:opacity-0 opacity-100 pointer-events-none"}`}
                >
                  {link.title}
                </span>
                {!expanded && (
                  <div className="absolute z-20 invisible p-2 ml-6 text-sm font-medium text-cyan-800 transition-all translate-x-3 bg-white shadow-md opacity-0 rounded-full left-full group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                    {link.title}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-0 p-4 overflow-hidden relative border-t border-t-neutral-200">
        <div className="rounded w-9 h-9 flex justify-center items-center ml-0.5 bg-linear-to-br from-[#00A0D0] via-[#64C8E6] to-[#00A0D0] bg-animated-gradient text-white shadow-md font-semibold">
          <span>PD</span>
        </div>
        <div
          className={`flex items-center transition-all duration-300 gap-6 absolute ${expanded ? "right-4 opacity-100" : "lg:-right-64 right-4 lg:opacity-0 opacity-100 pointer-events-none"}`}
        >
          <div className="flex flex-col">
            <span className="font-semibold">Pirita Dreemurr</span>
            <span className="text-xs text-neutral-400">pirita@gmail.com</span>
          </div>
          <Link
            href={"/"}
            className="hover:bg-[#d9f2f9] hover:text-cyan-800 p-1 transition-all duration-300 rounded"
          >
            <LogOut className="size-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
