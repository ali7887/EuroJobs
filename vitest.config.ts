import { defineConfig } from "vitest/config"
import path from "path"
import dotenv from "dotenv"

dotenv.config({ path: ".env.test" })

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./src/tests/setupTests.ts"],

    include: ["src/**/*.test.ts"],
    exclude: ["src/tests/e2e/**"],
  },
})
