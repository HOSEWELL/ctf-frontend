"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";



export default function Admin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div id="admin" className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-8"><Link href="/scoreboard" >Admin Panel</Link></h2>
        <Link href={'/participantlist'}>Participants</Link>
      </aside>

      <main className="flex-1 bg-gray-50 p-8">{children}</main>

    </div>
  );
}
