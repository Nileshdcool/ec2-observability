
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppProvider } from "../lib/AppContext";
import { ThemeProvider } from "@/lib/ThemeContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ThemeProvider>
  );
}
