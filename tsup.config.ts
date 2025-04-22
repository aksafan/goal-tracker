import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["esm"],
  outDir: "dist",
  splitting: false,
  clean: true,
  // Disables TS checking during type declaration generation to prevent Prisma TS4094 errors
  dts: false,
  sourcemap: true,
  target: "es2022",
  shims: false,
});
