"use client";
import { ReactNode, useMemo } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

export default function Providers({ children }: { children: ReactNode }) {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
          primary: { main: "#ef5350" },
          secondary: { main: "#1976d2" },
          background: { default: "#fafafa" },
        },
        typography: { fontFamily: "var(--font-geist-sans)" },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
