const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
import { Participant } from "@/types";



// judges
export async function fetchJudges() {
  const res = await fetch(`${API_BASE}/judges/`);
  return res.json();
}

export async function createJudge(data: { identifier: string; username: string; display_name: string }) {
  const res = await fetch(`${API_BASE}/judges/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}


// participants
export async function getParticipants(): Promise<Participant[]> {
  const res = await fetch(`${API_BASE}/participants`);
  if (!res.ok) throw new Error("Failed to fetch participants");
  return res.json();
}

export async function submitScore(participantId: string, score: number) {
  const res = await fetch(`${API_BASE}/participants/${participantId}/score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score }),
  });
  if (!res.ok) throw new Error("Failed to submit score");
  return res.json();
}

