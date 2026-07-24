// HINWEIS: Das ist ein einfacher Speicher im Arbeitsspeicher, nur für lokale Tests.
// Er merkt sich Jobs, solange der Server läuft, aber NICHT nach einem Neustart.
// Für den echten Live-Betrieb später durch eine echte Datenbank ersetzen
// (z.B. Vercel KV, Postgres). Für den jetzigen Testschritt reicht das völlig aus.

export type VideoJob = {
  status: "pending" | "processing" | "done" | "error";
  prompt: string;
  videoUrl?: string;
  errorMessage?: string;
  createdAt: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __videoJobs: Map<string, VideoJob> | undefined;
}

export const jobStore: Map<string, VideoJob> =
  global.__videoJobs ?? (global.__videoJobs = new Map());
