import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 960,
    viewportHeight: 1280,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
