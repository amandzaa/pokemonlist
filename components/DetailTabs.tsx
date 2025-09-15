"use client";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import StatBar from "./StatBar";

export default function DetailTabs({
  about,
  stats,
  evolutions,
  moves,
}: {
  about: Array<{ label: string; value: string }>;
  stats: Array<{ name: string; base: number }>;
  evolutions: string[];
  moves: string[];
}) {
  const [tab, setTab] = useState<"about" | "stats" | "evolution" | "moves">(
    "about"
  );
  return (
    <div className="bg-white rounded-t-3xl p-6 shadow-sm -mt-8">
      <div className="flex gap-6 border-b mb-4">
        <button
          className={`pb-2 font-medium ${
            tab === "about"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setTab("about")}
        >
          About
        </button>
        <button
          className={`pb-2 font-medium ${
            tab === "stats"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setTab("stats")}
        >
          Base Stats
        </button>
        <button
          className={`pb-2 font-medium ${
            tab === "evolution"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setTab("evolution")}
        >
          Evolution
        </button>
        <button
          className={`pb-2 font-medium ${
            tab === "moves"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setTab("moves")}
        >
          Moves
        </button>
      </div>

      {tab === "about" ? (
        <div className="grid grid-cols-2 gap-y-3">
          {about.map((row) => (
            <div key={row.label} className="contents">
              <Typography variant="body2" color="text.secondary">
                {row.label}
              </Typography>
              <Typography variant="body2">{row.value}</Typography>
            </div>
          ))}
        </div>
      ) : tab === "stats" ? (
        <div className="flex flex-col gap-3">
          {stats.map((s) => (
            <StatBar key={s.name} label={s.name} value={s.base} />
          ))}
        </div>
      ) : tab === "evolution" ? (
        <div className="flex flex-wrap gap-2">
          {evolutions.map((evo) => (
            <span
              key={evo}
              className="capitalize px-3 py-2 rounded bg-gray-100"
            >
              {evo}
            </span>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {moves.map((m) => (
            <span key={m} className="capitalize px-3 py-2 rounded bg-gray-100">
              {m}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
