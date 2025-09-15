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

  const tabs = [
    { id: "about", label: "About" },
    { id: "stats", label: "Base Stats" },
    { id: "evolution", label: "Evolution" },
    { id: "moves", label: "Moves" },
  ] as const;

  const renderContent = () => {
    switch (tab) {
      case "about":
        return (
          <div className="grid grid-cols-2 gap-y-3" style={{ color: "#000" }}>
            {" "}
            {/* Forced black text */}
            {about.map((row, index) => (
              <div
                key={row.label}
                className="contents animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Typography
                  variant="body2"
                  color="inherit" 
                  className="font-medium text-black" 
                >
                  {row.label}
                </Typography>
                <Typography
                  variant="body2"
                  color="inherit" 
                  className="font-semibold capitalize text-black" 
                >
                  {row.value}
                </Typography>
              </div>
            ))}
          </div>
        );
      case "stats":
        return (
          <div className="flex flex-col gap-3" style={{ color: "#000" }}>
            {" "}
            {/* Forced black text */}
            {stats.map((s, index) => (
              <div
                key={s.name}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <StatBar label={s.name} value={s.base} />
              </div>
            ))}
          </div>
        );
      case "evolution":
        return (
          <div className="flex flex-wrap gap-2" style={{ color: "#000" }}>
            {" "}
            {/* Forced black text */}
            {evolutions.map((evo, index) => (
              <span
                key={evo}
                className="capitalize px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-black font-medium border border-blue-100 animate-fade-in-scale hover:scale-105 transition-transform duration-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {evo}
              </span>
            ))}
          </div>
        );
      default:
        return (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2"
            style={{ color: "#000" }}
          >
            {" "}
            {/* Forced black text */}
            {moves.map((m, index) => (
              <span
                key={m}
                className="capitalize px-3 py-2 rounded-lg bg-gradient-to-r from-gray-50 to-slate-100 text-black font-medium border border-gray-200 animate-fade-in-scale hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:border-blue-200 transition-all duration-200"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                {m.replace("-", " ")}
              </span>
            ))}
          </div>
        );
    }
  };

  return (
    <>
      {/* Add custom CSS animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-scale {
          animation: fadeInScale 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }

        .tab-content {
          animation: fadeInUp 0.4s ease-out;
        }

        .tab-indicator {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      <div
        className="bg-white rounded-t-3xl p-10 pt-20 shadow-lg -mt-8 relative overflow-hidden"
        style={{ color: "#000" }}
      >
        {" "}
        {/* Tab Navigation */}
        <div className="relative flex gap-6 border-b mb-6 ">
          {tabs.map((tabItem, index) => (
            <button
              key={tabItem.id}
              className={`pb-3 px-2 font-semibold whitespace-nowrap relative transition-all duration-300 ease-out ${
                tab === tabItem.id
                  ? "text-blue-600 scale-105"
                  : "text-gray-500 hover:text-gray-700 hover:scale-102"
              }`}
              onClick={() => setTab(tabItem.id as typeof tab)}
            >
              <span className="relative z-10">{tabItem.label}</span>

              {/* Active tab indicator */}
              {tab === tabItem.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full tab-indicator animate-slide-in"></div>
              )}

              {/* Hover effect background */}
              <div className="absolute inset-0 rounded-lg transition-all duration-300"></div>
            </button>
          ))}
        </div>
        {/* Tab Content */}
        <div key={tab} className="tab-content min-h-[200px] p-1">
          {renderContent()}
        </div>
        {/* Loading shimmer effect during tab transition */}
        <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-blue-200/50 to-transparent animate-pulse"></div>
        </div>
      </div>
    </>
  );
}
