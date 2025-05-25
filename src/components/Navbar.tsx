"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-700 text-lg">CTF Scores Portal</h1>
        <div className="space-x-4">
          <Link href="/scoreboard" className="text-gray-600 text-lg hover:text-green-700 hover:underline">Home</Link>
          <Link href="/judge" className="text-gray-600 hover:text-green-700 text-lg hover:underline">Judge Panel</Link>
          <Link href="/participants" className="text-gray-600 hover:text-green-700 text-lg hover:underline">Participants</Link>
          <Link href="/admin" className="text-white-600 hover:text-white-200 bg-green-700  p-3 rounded-xl ">Admin</Link>

        </div>
      </div>
    </nav>
  );
}
