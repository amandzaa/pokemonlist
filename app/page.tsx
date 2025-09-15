"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import PokemonCard from "@/components/PokemonCard";
import { usePokedex } from "@/hooks/pokedex";

type NamedAPIResource = { name: string; url: string };
type PokemonType = { name: string; url: string };

export default function Home() {
  const searchParams = useSearchParams();
  const search = (searchParams.get("q") ?? "").toLowerCase();
  const [page, setPage] = useState<number>(1);
  const pageSize = 24;
  const {
    allPokemon,
    isLoading,
    error,
    filtered: baseFiltered,
    pokemonTypesMap,
    prefetchTypesFor,
  } = usePokedex();

  const filteredList = useMemo(() => {
    const s = search.trim();
    let list = s ? allPokemon.filter((p) => p.name.includes(s)) : baseFiltered;
    return list;
  }, [allPokemon, search]);

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
      <div className="h-4" />

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
