import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const conditionalPlugins: Array<[string, Record<string, unknown>]> = [];

if (process.env.TEMPO) {
  conditionalPlugins.push(['tempo-devtools/swc', {}]);
}

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      plugins: [...conditionalPlugins]
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));