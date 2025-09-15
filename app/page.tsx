"use client";
import { useEffect, useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import PokemonCard from "@/components/PokemonCard";
import { usePokedex } from "@/hooks/pokedex";

type NamedAPIResource = { name: string; url: string };
type PokemonType = { name: string; url: string };

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const pageSize = 24;
  const {
    allPokemon,
    types,
    activeType,
    setActiveType,
    isLoading,
    error,
    filtered: baseFiltered,
    pokemonTypesMap,
    prefetchTypesFor,
  } = usePokedex();

  const filteredList = useMemo(() => {
    const s = search.trim().toLowerCase();
    let list = s ? allPokemon.filter((p) => p.name.includes(s)) : baseFiltered;
    return list;
  }, [allPokemon, search, activeType]);

  // prefetch visible pokemon types
  useEffect(() => {
    const start = (currentPage - 1) * pageSize;
    const slice = filteredList.slice(start, start + pageSize);
    prefetchTypesFor(slice.map((p) => p.name));
  }, [filteredList, page]);

  const totalPages = Math.max(1, Math.ceil(filteredList.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = filteredList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <main className="container mx-auto px-4 py-8">
      <Typography variant="h3" component="h1" className="font-extrabold mb-6">
        Pokedex
      </Typography>
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2 overflow-x-auto">
          {types.map((t) => (
            <button
              key={t.name}
              onClick={() => setActiveType(t.name)}
              className={`px-4 py-2 rounded-full text-sm capitalize ${
                activeType === t.name ? "bg-primary text-white" : "bg-gray-200"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
        <TextField
          label="Search"
          placeholder="pikachu"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading && (
        <div className="w-full flex justify-center py-16">
          <CircularProgress />
        </div>
      )}
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      {!isLoading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paged.map((p) => {
              const idMatch = p.url.match(/\/pokemon\/(\d+)\/?$/);
              const id = (idMatch ? idMatch[1] : p.name).toString();
              const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
              const types = pokemonTypesMap[p.name] ?? [];
              return (
                <PokemonCard
                  key={p.name}
                  name={p.name}
                  id={id}
                  types={types}
                  image={image}
                />
              );
            })}
          </div>

          <div className="flex justify-center mt-6">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </div>
        </>
      )}
    </main>
  );
}
