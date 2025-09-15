"use client";
import { useEffect } from "react";
import Alert from "@mui/material/Alert";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Alert severity="error">
      Terjadi kesalahan saat memuat detail Pokémon.
    </Alert>
  );
}
