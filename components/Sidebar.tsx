"use client";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

export default function Sidebar({
  types,
  activeType,
  onSelect,
}: {
  types: { name: string; url: string }[];
  activeType: string;
  onSelect: (t: string) => void;
}) {
  return (
    <aside className="sticky top-4">
      <Typography variant="h5" className="font-bold mb-3">
        Pokedex
      </Typography>
      <div className="flex flex-wrap gap-2">
        {types.map((t) => (
          <Chip
            key={t.name}
            label={t.name}
            clickable
            color={activeType === t.name ? "primary" : "default"}
            className="capitalize"
            onClick={() => onSelect(t.name)}
          />
        ))}
      </div>
    </aside>
  );
}
