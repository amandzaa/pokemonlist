"use client";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

export default function AppHeader() {
  return (
    <AppBar position="sticky" color="primary" enableColorOnDark>
      <Toolbar className="container mx-auto flex justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 no-underline text-inherit"
        >
          <CatchingPokemonIcon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pokédex
          </Typography>
        </Link>
        <div className="flex items-center gap-2">
          <IconButton color="inherit" aria-label="pokeball">
            <CatchingPokemonIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
