"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { can, type Permission } from "@/config/permissions";
import type { Role } from "@/config/roles";

const LINKS: { href: string; label: string; perm: Permission }[] = [
  { href: "/admin", label: "Registrations", perm: "registration:read" },
  { href: "/admin/settings", label: "Settings", perm: "settings:business" },
  { href: "/admin/audit", label: "Audit", perm: "audit:read" },
  { href: "/admin/system", label: "System", perm: "system:health" },
];

export default function AdminNav({ role, name }: { role: Role; name: string }) {
  const pathname = usePathname();
  const links = LINKS.filter((l) => can(role, l.perm));

  return (
    <div className="fixed top-16 left-0 right-0 z-30 bg-black/60 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1 overflow-x-auto">
          {links.map((l) => {
            const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  active ? "bg-purple-600 text-white" : "text-white/70 hover:bg-white/10"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-white/50 text-xs hidden sm:inline">
            {name} · {role === "FACULTY_ADMIN" ? "Faculty" : "Developer"}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-white/60 hover:bg-red-500/20 hover:text-red-300 border border-white/10 transition-all text-sm"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
