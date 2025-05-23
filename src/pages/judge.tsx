"use client";

import { useEffect, useState } from "react";
import { getParticipants, submitScore } from "@/lib/api";
import { Participant } from "@/types";

export default function JudgePage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [scoreMap, setScoreMap] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getParticipants();
        setParticipants(data);
      } catch (err) {
        console.error("Failed to fetch participants", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleScoreChange = (id: string, score: number) => {
    setScoreMap((prev) => ({ ...prev, [id]: score }));
  };

  const handleSubmit = async (id: string) => {
    const score = scoreMap[id];
    if (!score) return;

    try {
      await submitScore(id, score);
      alert("Score submitted!");
    } catch (err) {
      alert("Failed to submit score.");
    }
  };

  return (
    <main id="judge" className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Judge Panel</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid gap-4 max-w-3xl mx-auto">
          {participants.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
            >
              <span>{p.name}</span>
              <input
                type="number"
                className="border rounded px-2 py-1 w-20 mx-2"
                value={scoreMap[p.id] || ""}
                onChange={(e) => handleScoreChange(p.id, parseInt(e.target.value))}
                placeholder="0-100"
              />
              <button
                onClick={() => handleSubmit(p.id)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
