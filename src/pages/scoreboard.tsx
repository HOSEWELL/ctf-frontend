"use client";

import { useEffect, useState } from "react";

interface ScoreEntry {
  id: string;
  name: string;
  score: number;
}

export default function ScoreboardPage() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScores() {
      try {
        const res = await fetch("/api/scores");
        if (!res.ok) throw new Error("Failed to fetch scores");
        const data = await res.json();
        // Sort by highest score
        const sorted = data.sort((a: ScoreEntry, b: ScoreEntry) => b.score - a.score);
        setScores(sorted);
      } catch (err) {
        console.error("Error fetching scores:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchScores();
  }, []);

  return (
    <main className="min-h-screen bg-green-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">Live Scoreboard</h1>
        {loading ? (
          <p className="text-center text-gray-600">Loading scores...</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-left border-b border-green-200">
                <th className="p-2">Participant</th>
                <th className="p-2 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((entry) => (
                <tr key={entry.id} className="border-b border-gray-100">
                  <td className="p-2 font-medium">{entry.name}</td>
                  <td className="p-2 text-right">{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
