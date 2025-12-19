// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "cypress";
import { readFile, WorkBook } from "xlsx";
import 'dotenv/config'


export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    viewportWidth: 960,
    viewportHeight: 1280,
    fileServerFolder: "test",
    downloadsFolder: "test/downloads",
    fixturesFolder: "test/fixtures",
    screenshotsFolder: "test/screenshots",
    videosFolder: "test/videos",
    supportFile: "test/support/e2e.{js,jsx,ts,tsx}",
    specPattern: "test/e2e/**/*.cy.{js,jsx,ts,tsx}",
    video: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
        /**
        * Reads and processes a file and returns an XLSX WorkBook object.
        * @param filePath The arguments passed to the task.
        * @returns A promise that resolves to the WorkBook object.
        */
        getDataExcel(filePath: string): WorkBook {
          try {
            return readFile(filePath);
          } catch (e) {
            throw new Error(`Failed to load data for test. ${e}`);
          }
        }
      });
    },
    env: {}
  },
  env: {},
  trashAssetsBeforeRuns: false,
});
