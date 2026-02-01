"use client";

import { useSidebarStore } from "@/stores/SidebarStore";
import AssaAbloyTitle from "@/svg/AssaAbloyTitle";
import { House, CircleEllipsis, Menu, LogOut, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const { expanded, toggleSidebar } = useSidebarStore();

  const pathname = usePathname();

  const linkClasses = (path: string) => {
    const isActive = pathname === path || pathname.startsWith(`${path}/`);

    return `${isActive ? "bg-[#d9f2f9] text-cyan-800" : "text-black hover:bg-neutral-200 transition-all duration-300"}`;
  };

  const links = [
    { href: "/home", title: "Home", Icon: House },
    { href: "/options", title: "Options", Icon: CircleEllipsis },
  ];

  return (
    <aside
      className={`flex flex-col transition-all duration-300 justify-between h-dvh border-r border-r-neutral-200 ${expanded ? "w-64" : "w-18"}`}
    >
      <div className="w-full h-fit flex flex-col p-4">
        <div
          className={`flex items-center mb-20 relative ${expanded ? "justify-end" : "justify-center"}`}
        >
          <div
            className={`transition-all duration-300 pointer-events-none absolute ${expanded ? "w-40 opacity-100 left-0" : "w-0 opacity-0 -left-64"}`}
          >
            <AssaAbloyTitle />
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1 hover:bg-neutral-300 rounded transition-all duration-300 cursor-pointer"
          >
            {expanded ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`p-2 rounded-full relative group ${linkClasses(link.href)}`}
            >
              <div
                className={`flex items-center transition-all duration-300 ${expanded ? "gap-6" : "gap-0"}`}
              >
                <div className="w-fit h-fit ml-1">
                  <link.Icon className="size-4" />
                </div>
                <span
                  className={`transition-all duration-300 ${expanded ? "w-fit opacity-100" : "w-0 opacity-0 pointer-events-none"}`}
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
        <div className="p-1 rounded w-10 h-10 flex justify-center items-center bg-linear-to-br from-[#00A0D0] via-[#64C8E6] to-[#00A0D0] bg-animated-gradient text-white shadow-md font-semibold">
          <span>PD</span>
        </div>
        <div
          className={`flex items-center transition-all duration-300 gap-8 absolute ${expanded ? "right-4 opacity-100" : "-right-64 opacity-0 pointer-events-none"}`}
        >
          <div className="flex flex-col">
            <span className="font-semibold">Pirita Dreemurr</span>
            <span className="text-sm">pirita@gmail.com</span>
          </div>
          <LogOut className="size-4" />
        </div>
      </div>
    </aside>
  );
}
