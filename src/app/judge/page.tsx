'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';

interface Participant {
  id: number;
  name: string;
}

export default function JudgePage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [scoreMap, setScoreMap] = useState<{ [key: number]: number }>({});
  const [judgeId, setJudgeId] = useState<number | null>(null);
  const [inputJudgeId, setInputJudgeId] = useState<string>('');

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

  useEffect(() => {
    async function fetchParticipants() {
      try {
        const res = await fetch(`${BASE_URL}/participants/`);
        if (!res.ok) throw new Error('Failed to fetch participants');
        const data = await res.json();
        setParticipants(data);
      } catch  {
        console.error('Failed to fetch participants');
      } finally {
        setLoading(false);
      }
    }

    fetchParticipants();
  }, [BASE_URL]);

  const handleScoreChange = (id: number, score: number) => {
    setScoreMap((prev) => ({ ...prev, [id]: score }));
  };

  const handleSubmit = async (participantId: number) => {
    if (judgeId === null) return alert("Judge ID not set.");

    const points = scoreMap[participantId];
    if (points === undefined || isNaN(points)) return;

    try {
      const res = await fetch(`${BASE_URL}/scores/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          judge: judgeId,
          participant: participantId,
          points,
        }),
      });

      if (!res.ok) throw new Error('Failed to submit score');

      alert('Score submitted!');
    } catch (err) {
      console.error(err);
      alert('Failed to submit score.');
    }
  };

  const handleJudgeIdSubmit = () => {
    const id = parseInt(inputJudgeId, 10);
    if (isNaN(id)) {
      alert('Please enter a valid Judge ID');
      return;
    }
    setJudgeId(id);
  };

  return (
    <main id="judge">
      <Navbar />

      <div className="max-w-xl mx-auto mt-6 mb-4 p-4 bg-gray-100 rounded shadow">
        <h2 className="text-lg font-semibold mb-2 text-center">Judge Number</h2>
        <div className="flex gap-2 items-center justify-center">
          <input
            type="number"
            value={inputJudgeId}
            onChange={(e) => setInputJudgeId(e.target.value)}
            className="border px-3 py-1 rounded w-40"
            placeholder="judge number"
          />
          <button
            onClick={handleJudgeIdSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>

      {judgeId !== null && (
        <>
          <h1 className="text-3xl font-bold mb-6 p-2 text-center">Judge -{judgeId}</h1>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="grid gap-4 max-w-3xl mx-auto mb-[10em]">
              {participants.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
                >
                  <span>{p.name}</span>
                  <input
                    type="number"
                    className="border rounded px-2 py-1 w-20 mx-2"
                    value={scoreMap[p.id] || ''}
                    onChange={(e) =>
                      handleScoreChange(p.id, parseInt(e.target.value, 10))
                    }
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
        </>
      )}

      <Footer />
    </main>
  );
}
