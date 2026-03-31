import { defineConfig } from 'cypress';
import { readFile, WorkBook } from 'xlsx';

import { transformExcelSheetToJson } from 'cypress/transform';
import 'dotenv/config';


export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    viewportWidth: 960,
    viewportHeight: 1280,
    defaultBrowser: 'chrome',
    video: true,
    retries: 2,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json',
    },
    setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
      // implement node event listeners here
      on('task', {
        log(message: string) {
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
      on('before:run', (details: Cypress.BeforeRunDetails): void => {
        transformExcelSheetToJson();
      });
      on('after:run', (results: CypressCommandLine.CypressRunResult | CypressCommandLine.CypressFailedRunResult): void => {
        /**
         * We can provide
         * - Start At : results.startedTestsAt
         * - End At : results.endedTestsAt
         * - Browser : results.browserName - results.browserVersion
         * - Total duration : results.totalDuration (in ms)
         * - Total tests : results.totalTests
         * - Total passed : results.totalPassed
         * - Total failed : results.totalFailed
         * - Failures : custom and optional if we have any test that failed.
         *    - file : results.runs[i].spec.relative
         *    - duration : results.runs[i].spec.duration (in ms)
         *    - test title : results.runs[i].tests[j].title (["Calculate D18 ESC certificate.", "Calculate certificate test ID: D18_C_002"])
         *    - error message : results.runs[i].tests[j].displayError
         */
        if ('status' in results) {
          console.log(JSON.stringify(results, null, 2))
          return
        }

        const summary: Record<string, any> = {}
        summary['started_at'] = results.startedTestsAt
        summary['ended_at'] = results.endedTestsAt
        summary['browser'] = `${results.browserName} - ${results.browserVersion}`
        summary['duration'] = `${Math.round(results.totalDuration / 1000)} seconds`
        summary['total_tests'] = results.totalTests
        summary['total_passed_tests'] = results.totalPassed
        summary['total_failed_tests'] = results.totalFailed
        summary['failures'] = []
        if (results.totalFailed > 0) {
          const rundetails: Record<string, any> = results.runs.filter((run: CypressCommandLine.RunResult) => {
            return run['stats']['failures'] > 0
          })
          rundetails.forEach((runDetail: CypressCommandLine.RunResult) => {
            runDetail.tests.forEach((testDetail: CypressCommandLine.TestResult) => {
              if (testDetail.state === "failed") {
                const failureDetail: Record<string, any> = {}
                failureDetail['file'] = runDetail.spec.relative
                failureDetail['duration'] = runDetail.stats.duration
                failureDetail['title'] = testDetail.title.join(' - ')
                failureDetail['error_message'] = testDetail.displayError
                summary['failures'].push(failureDetail)
              }
            })
          })
        }

        console.log(JSON.stringify(summary, null, 2))
      })
    },
    env: {},
  },
  env: {},
  trashAssetsBeforeRuns: false,
});

/* 
TODO: 
- if possible find a way to know which report file is failed.
*/
