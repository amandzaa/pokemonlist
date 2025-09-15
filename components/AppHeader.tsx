"use client";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import TextField from "@mui/material/TextField";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <AppBar position="sticky" color="primary" enableColorOnDark>
      <Toolbar className="container mx-auto flex justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 no-underline text-inherit"
        >
          <CatchingPokemonIcon sx={{ fontSize: "2.5rem" }} />
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Pokédex
          </Typography>
        </Link>
        <div className="flex-1 max-w-md">
          <TextField
            fullWidth
            size="small"
            label="Search"
            placeholder="pikachu"
            value={q}
            onChange={(e) => handleSearchChange(e.target.value)}
            sx={{
              '& .MuiInputLabel-root': {
                color: 'gray', 
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'gray', 
              },
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.7)',
                },
              },
            }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}
