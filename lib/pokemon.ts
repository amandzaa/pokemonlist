export type PokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
  species: { url: string };
  sprites: { other?: Record<string, any> };
  types: { slot: number; type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  moves?: { move: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
};

export async function fetchPokemon(name: string): Promise<PokemonDetail> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Pokémon tidak ditemukan");
  return res.json();
}

export async function fetchEvolutions(speciesUrl: string): Promise<string[]> {
  const speciesRes = await fetch(speciesUrl, { next: { revalidate: 60 } });
  if (!speciesRes.ok) return [];
  const species = await speciesRes.json();
  const evoRes = await fetch(species.evolution_chain.url, {
    next: { revalidate: 60 },
  });
  if (!evoRes.ok) return [];
  const evo = await evoRes.json();
  const list: string[] = [];
  function walk(node: any) {
    if (!node) return;
    if (node.species?.name) list.push(node.species.name);
    (node.evolves_to || []).forEach(walk);
  }
  walk(evo.chain);
  return list;
}
