import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    hmr: {
      clientPort: 443,
    },
    // Add both the specific host AND the wildcard
    allowedHosts: [".csb.app"],
  },
});