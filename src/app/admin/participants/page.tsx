'use client';

import { useEffect, useState } from "react";

interface Participant {
  id: string;
  name: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export default function ParticipantPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newParticipant, setNewParticipant] = useState("");

  // Fetch participants on load
  useEffect(() => {
    async function fetchParticipants() {
      try {
        const res = await fetch(`${API_BASE}/participants/`);
        const data = await res.json();
        setParticipants(data);
      } catch {
        console.error("Failed to fetch participants");
      } finally {
        setLoading(false);
      }
    }

    fetchParticipants();
  }, []);

  // Add participant handler
  async function handleAddParticipant() {
    if (!newParticipant.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/participants/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newParticipant }),
      });

      if (res.ok) {
        const added = await res.json();
        setParticipants(prev => [...prev, added]);
        setNewParticipant("");
        setIsModalOpen(false);
      } else {
        console.error("Failed to add participant");
      }
    } catch {
      console.error("Error adding participant");
    }
  }

  return (
    <main id="admin/participants" className="min-h-screen bg-green-50 relative">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">Participants</h1>
        {loading ? (
          <p className="text-center text-gray-600">Loading Participants...</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-left border-b border-green-200">
                <th className="p-2">Number</th>
                <th className="p-2 text-right">Name</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((entry) => (
                <tr key={entry.id} className="border-b border-gray-100">
                  <td className="p-2 font-medium">{entry.id}</td>
                  <td className="p-2 text-right">{entry.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-green-700 hover:bg-green-800 text-white p-4 rounded-full shadow-lg text-xl"
        aria-label="Add Participant"
      >
        +Add a Participant
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Add Participant</h2>
            <input
              type="text"
              placeholder="Enter participant name"
              value={newParticipant}
              onChange={(e) => setNewParticipant(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-700 hover:text-white hover:bg-gray-500 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddParticipant}
                className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
