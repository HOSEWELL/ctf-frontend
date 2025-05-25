"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navLinks = [
  { name: "Judges", href: "/admin/judges" },
  { name: "Participants", href: "/admin/participants" },
  { name: "Scores", href: "/admin/scores" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={(
                pathname === link.href ? "bg-white text-green-700 font-semibold" : "hover:bg-green-600"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
            <Link href={'/participantlist'}></Link>

      <main className="flex-1 bg-gray-50 p-8">{children}</main>
      <Link href={'/participantlist'}></Link>
    </div>
  );
}
