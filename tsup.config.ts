import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["esm"],
  outDir: "dist",
  splitting: false,
  clean: true,
  dts: true,
  sourcemap: true,
  target: "es2022",
  shims: false,
});
