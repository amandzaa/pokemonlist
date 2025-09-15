"use client";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { getTypeGradient } from "./typeColors";

export default function PokemonCard({
  name,
  id,
  types,
  image,
}: {
  name: string;
  id: string;
  types: string[];
  image: string;
}) {
  const grad = getTypeGradient(types);
  return (
    <Link href={`/pokemon/${name}`} className="no-underline">
      <Card 
        className="overflow-hidden shadow-sm hover:shadow-md transition-shadow" 
        style={{ borderRadius: '2rem' }}
      >
        <CardActionArea>
          <div
            className="h-[200px] w-full relative flex flex-col"
            style={{
              background: `linear-gradient(135deg, ${grad.start}, ${grad.end})`,
            }}
          >
            {/* top-right id */}
            <span className="absolute right-4 top-4 text-white/40 font-extrabold text-2xl">
              #{id.padStart(3, "0")}
            </span>
            
            {/* pokeball watermark */}
            <div className="absolute inset-0">
              <div className="absolute right-8 bottom-[-16px] w-48 h-48">
                {/* Simple Pokeball outline */}
                <div className="w-full h-full rounded-full border-2 border-white/20 relative">
                  {/* Middle horizontal line */}
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/20 transform -translate-y-1/2"></div>
                  {/* Center circle */}
                  <div className="absolute top-1/2 left-1/2 w-12 h-12 border-2 border-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2 bg-white/5">
                    <div className="absolute top-1/2 left-1/2 w-6 h-6 border border-white/15 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* title and type pills */}
            <div className="absolute left-5 top-6 flex flex-col gap-2 z-10">
              <Typography
                variant="h5"
                className="font-extrabold text-white capitalize"
              >
                {name}
              </Typography>
              <div className="flex flex-col gap-1">
                {types.map((t) => (
                  <span
                    key={t}
                    className="capitalize px-3 py-1 rounded-full text-white/90 bg-white/25 backdrop-blur text-sm w-fit"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Pokemon image positioned center-right */}
            <div className="absolute inset-0 flex items-center justify-end pr-4 pt-8">
              <CardMedia
                component="img"
                image={image}
                alt={name}
                className="max-h-[130px] max-w-[150px] w-auto h-auto object-contain z-10"
              />
            </div>
          </div>
        </CardActionArea>
      </Card>
    </Link>
  );
}