"use client";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">CTF Judge Portal</h1>
        <div className="space-x-4">
          <a href="/" className="text-gray-600 hover:text-blue-500">Home</a>
          <a href="/judge" className="text-gray-600 hover:text-blue-500">Judge Panel</a>
          <a href="/scoreboard" className="text-gray-600 hover:text-blue-500">Scoreboard</a>
        </div>
      </div>
    </nav>
  );
}