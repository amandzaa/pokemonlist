"use client";
export default function StatBar({
  label,
  value,
  color = "#49B57E",
}: {
  label: string;
  value: number;
  color?: string;
}) {
  const pct = Math.min(100, Math.round((value / 150) * 100));
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 text-sm capitalize">{label}</span>
      <span className="w-8 text-sm font-semibold">{value}</span>
      <div className="flex-1 h-2 rounded bg-gray-200 overflow-hidden">
        <div
          className="h-full"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
