import type { Metadata } from "next";
import Link from "next/link";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DetailTabs from "@/components/DetailTabs";
import { getTypeGradient } from "@/components/typeColors";
import {
  fetchPokemon,
  fetchEvolutions,
  type PokemonDetail,
} from "@/lib/pokemon";

type Pokemon = PokemonDetail;

export async function generateMetadata(props: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await props.params;
  const title = `${name.charAt(0).toUpperCase()}${name.slice(1)} • Pokédex`;
  return { title };
}

const getPokemon = fetchPokemon;
const getEvolutions = fetchEvolutions;

export default async function PokemonDetail(props: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await props.params;
  const data = await getPokemon(name);
  const evolutions = await getEvolutions(data.species.url);
  const image =
    data.sprites.other?.["official-artwork"]?.front_default ||
    data.sprites.other?.dream_world?.front_default ||
    "";
  const typeNames = data.types.map((t) => t.type.name);
  const grad = getTypeGradient(typeNames);

  return (
    <main className="container mx-auto px-0 md:px-4 pb-8">
      <div className="px-4 pt-4">
        <Button
          component={Link as any}
          href="/"
          startIcon={<ArrowBackIcon />}
          variant="outlined"
        >
          Kembali
        </Button>
      </div>

      <div className="relative">
        <div
          className="h-[280px] w-full"
          style={{
            background: `linear-gradient(135deg, ${grad.start}, ${grad.end})`,
          }}
        >
          <div className="container mx-auto px-4 h-full flex items-end pb-6">
            <div className="w-full flex items-end justify-between">
              <div>
                <Typography
                  variant="h3"
                  className="capitalize font-extrabold text-white"
                >
                  {data.name}
                </Typography>
                <div className="mt-2 flex gap-2">
                  {typeNames.map((t) => (
                    <span
                      key={t}
                      className="capitalize px-3 py-1 rounded-full text-white/90 bg-white/20 backdrop-blur"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <Typography variant="h6" className="text-white/80">
                #{String(data.id).padStart(3, "0")}
              </Typography>
            </div>
          </div>
        </div>
        {image && (
          <div className="container mx-auto px-4">
            <Card className="-mt-24 mx-auto max-w-4xl">
              <CardMedia
                component="img"
                image={image}
                alt={data.name}
                className="object-contain h-[300px]"
              />
            </Card>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <DetailTabs
          about={[
            { label: "Height", value: `${(data.height / 10).toFixed(1)} m` },
            { label: "Weight", value: `${(data.weight / 10).toFixed(1)} kg` },
            {
              label: "Abilities",
              value: data.abilities.map((a) => a.ability.name).join(", "),
            },
          ]}
          stats={data.stats.map((s) => ({
            name: s.stat.name,
            base: s.base_stat,
          }))}
          evolutions={evolutions}
          moves={(data.moves || []).slice(0, 24).map((m) => m.move.name)}
        />
      </div>
    </main>
  );
}
