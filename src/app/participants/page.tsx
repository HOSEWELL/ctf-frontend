"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

interface Participant {
  id: string;
  name: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;


export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchParticipants() {
      try {
        const res = await fetch(`${API_BASE}/participants/`);
        const data = await res.json();
        setParticipants(data);
      } catch (err) {
        console.error("Failed to fetch participants", err);
      } finally {
        setLoading(false);
      }
    }

    fetchParticipants();
  }, []);

    return (
    <main id="participant" className="min-h-screen bg-green-50 ">
        <Navbar/>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">Participants Panel</h1>
        {loading ? (
          <p className="text-center text-gray-600">Loading Participants...</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-left border-b border-green-200">
                <th className="p-2">Number of the Participant</th>
                <th className="p-2 text-right">Name of the Participant</th>
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
    </main>
  );

}
 
