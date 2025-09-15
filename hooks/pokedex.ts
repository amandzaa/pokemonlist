"use client";
import { useEffect, useMemo, useState } from "react";

export type NamedAPIResource = { name: string; url: string };
export type PokemonType = { name: string; url: string };

export function usePokedex() {
  const [allPokemon, setAllPokemon] = useState<NamedAPIResource[]>([]);
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [activeType, setActiveType] = useState<string>("all");
  const [activeTypeNames, setActiveTypeNames] = useState<Set<string> | null>(
    null
  );
  const [pokemonTypesMap, setPokemonTypesMap] = useState<
    Record<string, string[]>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [res, resTypes] = await Promise.all([
          fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"),
          fetch("https://pokeapi.co/api/v2/type"),
        ]);
        if (!res.ok) throw new Error("Gagal memuat data Pokémon");
        const data = await res.json();
        const typeData = await resTypes.json();
        setAllPokemon(data.results);
        setTypes([{ name: "all", url: "" }, ...typeData.results]);
      } catch (e: any) {
        setError(e.message ?? "Terjadi kesalahan");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    const run = async () => {
      if (activeType === "all") {
        setActiveTypeNames(null);
        return;
      }
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${activeType}`);
        if (!res.ok) throw new Error("Gagal memuat tipe");
        const data = await res.json();
        const names = new Set<string>(
          (data.pokemon as Array<{ pokemon: { name: string } }>).map(
            (x) => x.pokemon.name
          )
        );
        setActiveTypeNames(names);
      } catch {
        // ignore
      }
    };
    run();
  }, [activeType]);

  const filtered = useMemo(() => {
    return activeTypeNames
      ? allPokemon.filter((p) => activeTypeNames.has(p.name))
      : allPokemon;
  }, [allPokemon, activeTypeNames]);

  const prefetchTypesFor = async (names: string[]) => {
    const missing = names.filter((n) => !pokemonTypesMap[n]).slice(0, 12);
    if (missing.length === 0) return;
    const entries = await Promise.all(
      missing.map(async (n) => {
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${n}`);
          if (!res.ok) return [n, [] as string[]] as const;
          const data = await res.json();
          const types = (data.types as any[]).map(
            (t) => t.type.name
          ) as string[];
          return [n, types] as const;
        } catch {
          return [n, [] as string[]] as const;
        }
      })
    );
    setPokemonTypesMap((prev) => ({ ...prev, ...Object.fromEntries(entries) }));
  };

  return {
    allPokemon,
    types,
    activeType,
    setActiveType,
    isLoading,
    error,
    filtered,
    pokemonTypesMap,
    prefetchTypesFor,
  } as const;
}

// Server helpers
// Server helpers moved to lib/pokemon.ts to avoid client-module boundary issues.
