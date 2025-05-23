"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TeaserPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <main className="min-h-screen bg-green-100 flex items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">Get Ready for the Show!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Our judging event is almost here. Stay tuned for live scores and incredible performances from our participants.
        </p>
        <div className="space-x-4">
          <Link
            href="/judges"
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
          >
            Judge Panel
          </Link>
          <Link
            href="/scoreboard"
            className="px-6 py-3 border border-green-600 text-green-700 rounded-lg font-semibold hover:bg-green-100"
          >
            View Scoreboard
          </Link>
        </div>
      </div>
    </main>
  );
}
