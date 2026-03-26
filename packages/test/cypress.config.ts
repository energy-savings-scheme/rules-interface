import { defineConfig } from 'cypress';
import { readFile, WorkBook } from 'xlsx';

import { transformExcelSheetToJson } from 'cypress/transform';
import 'dotenv/config';

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    viewportWidth: 960,
    viewportHeight: 1280,
    video: true,
    retries: 2,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json',
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
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
        },
      });
      on('before:run', (details) => {
        transformExcelSheetToJson();
      });
    },
    env: {},
  },
  env: {},
  trashAssetsBeforeRuns: false,
});

/* 
TODO: 
- Multiple reporters. (spec to console, and junit to xml file)
- find a way to know which report file is failed.
*/
