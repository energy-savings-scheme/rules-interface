import { defineConfig } from 'cypress';
import { readFile, WorkBook } from 'xlsx';

import { transformExcelSheetToJson } from 'cypress/transform';
import { uploadToGithub, generateSummaryReport, sendEmail } from 'cypress/report';
import { TestFailureDetail } from 'cypress/type';
import appConfig from 'cypress/config';


export default defineConfig({
  e2e: {
    baseUrl: appConfig.baseUrl,
    viewportWidth: 960,
    viewportHeight: 1280,
    defaultBrowser: 'chrome',
    video: true,
    screenshotsFolder: 'cypress/screenshots', // Ensure this matches reality
    videosFolder: 'cypress/videos',
    trashAssetsBeforeRuns: true,
    retries: 2,
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      reportFilename: "[name]",
      code: false,
      json: true,
      html: false,
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
      on('after:run', async (results: CypressCommandLine.CypressRunResult | CypressCommandLine.CypressFailedRunResult): Promise<void> => {
        // test failed, it will return CypressFailedRunResult as the results, and it will have "status" property.
        if ('status' in results) {
          console.log(JSON.stringify(results, null, 2))
          return
        }

        const failures: TestFailureDetail[] = []
        if (results.totalFailed > 0) {
          const rundetails: CypressCommandLine.RunResult[] = results.runs.filter((run: CypressCommandLine.RunResult) => {
            return run['stats']['failures'] > 0
          })
          rundetails.forEach((runDetail: CypressCommandLine.RunResult) => {
            runDetail.tests.forEach((testDetail: CypressCommandLine.TestResult) => {
              if (testDetail.state === "failed") {
                const failureDetail: TestFailureDetail = {
                  file: runDetail.spec.relative,
                  duration: runDetail.stats.duration ? `${Math.round(runDetail.stats.duration / 1000)} seconds` : '-',
                  title: testDetail.title.join(' - '),
                  error: testDetail.displayError
                }
                failures.push(failureDetail)
              }
            })
          })
        }
        console.log('FAILURES : ')
        console.log(JSON.stringify(failures, null, 2))

        const filepath: string = await generateSummaryReport();
        
        let githubUrl: string | undefined;
        if (appConfig.uploadReportToGithub) {
          githubUrl = await uploadToGithub(filepath);
        }

        if (appConfig.sendReportToEmail) {
          const status = results.totalFailed == 0 ? "PASSED" : "FAILED";
          await sendEmail(status, filepath, githubUrl);
        }
      })
    },
    env: {},
  },
  env: {},
  trashAssetsBeforeRuns: false,
});
