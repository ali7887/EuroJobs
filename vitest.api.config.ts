import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/tests/api/**/*.test.ts"],
    setupFiles: ["./tests/setup/api-setup.ts"],
  },
});
