import type { Metadata } from "next";
import Link from "next/link";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DetailTabs from "@/components/DetailTabs";
import { getTypeGradient } from "@/components/typeColors";
import PokeballWatermark from "@/components/PokeballWatermark";
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
  const params = await props.params;
  const { name } = params;
  const data = await getPokemon(name);
  const evolutions = await getEvolutions(data.species.url);
  const image =
    data.sprites.other?.["official-artwork"]?.front_default ||
    data.sprites.other?.dream_world?.front_default ||
    "";
  const typeNames = data.types.map((t) => t.type.name);
  const grad = getTypeGradient(typeNames);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button
            component={Link as any}
            href="/"
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            sx={{ borderRadius: "20px" }}
          >
            Back to Pokédex
          </Button>
        </div>
      </div>

      {/* Main Pokémon Card */}
      <div className="container mx-auto px-4 pt-8 max-w-4xl">
        <Card
          sx={{
            borderRadius: "24px",
            overflow: "hidden", 
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            background: `linear-gradient(135deg, ${grad.start}, ${grad.end})`,
            color: "white",
            position: "relative",
          }}
        >
          {/* Watermark */}
          <div className="absolute inset-0 pointer-events-none">
            <PokeballWatermark className="absolute -right-9 top-40 w-90 h-90 opacity-10" />
          </div>
          {/* Pokémon Info Header */}
          <Box sx={{ p: 4, pb: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 2,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  fontSize: { xs: "2.5rem", md: "3rem" },
                  lineHeight: 1.2,
                }}
              >
                {data.name}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  opacity: 0.9,
                  fontWeight: "bold",
                  fontSize: { xs: "1.5rem", md: "2rem" },
                }}
              >
                #{String(data.id).padStart(3, "0")}
              </Typography>
            </Box>

            {/* Type Badges */}
            <Box sx={{ display: "flex", gap: 1.5, mb: 3 }}>
              {typeNames.map((type) => (
                <Chip
                  key={type}
                  label={type.charAt(0).toUpperCase() + type.slice(1)}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.25)",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    px: 2,
                    py: 0.5,
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Combined Image and Tabs Container */}
          <Box sx={{ position: "relative" }}>
            {/* Pokémon Image */}
            {image && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "350px",
                  position: "relative",
                  px: 1,
                  zIndex: 2,
                }}
              >
                <img
                  src={image}
                  alt={data.name}
                  style={{
                    width: "450px",
                    height: "450px",
                    objectFit: "contain",
                    filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.3))",
                    position: "relative",
                    zIndex: 2,
                  }}
                />
              </Box>
            )}

            {/* Detail Tabs */}
            <Box
              sx={{
                position: "relative",
                marginTop: "-100px",
                paddingTop: "100px",
                zIndex: 1,
              }}
            >
              <DetailTabs
                about={[
                  { label: "Species", value: data.species.name },
                  {
                    label: "Height",
                    value: `${(data.height / 10).toFixed(1)} m`,
                  },
                  {
                    label: "Weight",
                    value: `${(data.weight / 10).toFixed(1)} kg`,
                  },
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
            </Box>
          </Box>
        </Card>
      </div>
    </main>
  );
}