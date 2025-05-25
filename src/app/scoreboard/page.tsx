"use client";

import { useEffect, useState } from "react";
import { getParticipants } from "../../utils/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface RawScore {
  id: number;
  points: number;
  judge: number;
  participant: number;
}

interface ScoreEntry {
  id: number;
  name: string;
  score: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export default function ScoreboardPage() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [scoreRes, participants] = await Promise.all([
          fetch(`${API_BASE}/scores/`),
          getParticipants(),
        ]);

        if (!scoreRes.ok) throw new Error("Failed to fetch scores");

        const rawScores: RawScore[] = await scoreRes.json();

        const scoreMap: { [participantId: number]: number[] } = {};
        rawScores.forEach(({ participant, points }) => {
          if (!scoreMap[participant]) {
            scoreMap[participant] = [];
          }
          scoreMap[participant].push(points);
        });

        const entries: ScoreEntry[] = Object.entries(scoreMap).map(([id, scores]) => {
          const average = scores.reduce((a, b) => a + b, 0) / scores.length;
          const participant = participants.find((p) => p.id.toString() === id);
          return {
            id: Number(id),
            name: participant ? participant.name : `Participant ${id}`,
            score: Math.round(average * 10) / 10,
          };
        });

        entries.sort((a, b) => b.score - a.score);
        setScores(entries);
      } catch (err) {
        console.error("Error loading scoreboard:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="min-h-screen flex flex-col justify-between bg-green-50">
      <Navbar />
      <div className="flex-grow p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">Live Scoreboard</h1>
          {loading ? (
            <p className="text-center text-gray-600">Loading scores...</p>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-left border-b border-green-200">
                  <th className="p-2">Participant</th>
                  <th className="p-2 text-right">Avg. Score</th>
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
      </div>
      <Footer />
    </main>
  );
}
