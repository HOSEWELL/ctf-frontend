"use client";

import { useEffect, useState } from "react";
import React from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

interface Judge {
  id: string;
  identifier: string;
  username: string;
  display_name: string;
}

export default function JudgesPage() {
  const [judges, setJudges] = useState<Judge[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    identifier: "",
    username: "",
    display_name: "",
  });

  const fetchJudges = async () => {
    try {
      const res = await fetch(`${BASE_URL}/judges/`);
      const data = await res.json();
      setJudges(data);
    } catch (err) {
      console.error("Failed to fetch judges:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJudges();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddJudge = async () => {
    try {
      const res = await fetch(`${BASE_URL}/judges/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add judge");

      alert("Judge added successfully");
      setShowModal(false);
      setFormData({ identifier: "", username: "", display_name: "" });
      fetchJudges();
    } catch (err) {
      alert("Error adding judge");
    }
  };

  return (
    <div id="admin/judges" className="relative">
      <h1 className="text-2xl font-bold mb-6">Judges List</h1>

      {loading ? (
        <p>Loading judges...</p>
      ) : (
        <div className="grid gap-4">
          {judges.map((judge) => (
            <div key={judge.id} className="bg-white shadow p-4 rounded">
              <p className="font-semibold">{judge.display_name}</p>
              <p className="text-sm text-gray-500">Title: {judge.identifier}</p>
            </div>
          ))}
        </div>
      )}

      {/* Floating Add Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 bg-green-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-800 transition"
      >
        + Add Judge
      </button>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Register New Judge</h2>
            <input
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="Identifier"
              className="w-full border p-2 mb-3 rounded"
            />
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full border p-2 mb-3 rounded"
            />
            <input
              name="display_name"
              value={formData.display_name}
              onChange={handleChange}
              placeholder="Display Name"
              className="w-full border p-2 mb-3 rounded"
            />
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddJudge}
                className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
              >
                Add Judge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
