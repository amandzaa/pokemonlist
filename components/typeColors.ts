export const TYPE_COLORS: Record<
  string,
  { start: string; end: string; chip: string }
> = {
  grass: { start: "#5FC38D", end: "#49B57E", chip: "#49B57E" },
  poison: { start: "#B26CC7", end: "#8E49A3", chip: "#8E49A3" },
  fire: { start: "#F46F6F", end: "#E05252", chip: "#E05252" },
  water: { start: "#62A3F7", end: "#3F86E6", chip: "#3F86E6" },
  bug: { start: "#9CCC65", end: "#7CB342", chip: "#7CB342" },
  normal: { start: "#B0BEC5", end: "#90A4AE", chip: "#90A4AE" },
  electric: { start: "#FFD54F", end: "#FFC107", chip: "#FFC107" },
  ground: { start: "#D7CCC8", end: "#BCAAA4", chip: "#BCAAA4" },
  fairy: { start: "#F48FB1", end: "#F06292", chip: "#F06292" },
  fighting: { start: "#EF9A9A", end: "#E57373", chip: "#E57373" },
  psychic: { start: "#CE93D8", end: "#AB47BC", chip: "#AB47BC" },
  rock: { start: "#BCAAA4", end: "#8D6E63", chip: "#8D6E63" },
  ghost: { start: "#9575CD", end: "#7E57C2", chip: "#7E57C2" },
  ice: { start: "#81D4FA", end: "#4FC3F7", chip: "#4FC3F7" },
  dragon: { start: "#7E57C2", end: "#5E35B1", chip: "#5E35B1" },
  dark: { start: "#8D6E63", end: "#6D4C41", chip: "#6D4C41" },
  steel: { start: "#B0BEC5", end: "#90A4AE", chip: "#90A4AE" },
};

export function getTypeGradient(types: string[]): {
  start: string;
  end: string;
} {
  const a = TYPE_COLORS[types[0]]?.start ?? "#9E9E9E";
  const b =
    TYPE_COLORS[types[1]]?.end ?? TYPE_COLORS[types[0]]?.end ?? "#757575";
  return { start: a, end: b };
}
