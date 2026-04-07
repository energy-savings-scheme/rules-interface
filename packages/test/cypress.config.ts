import fs from "fs";
import { readdir } from "fs/promises";

import { defineConfig } from 'cypress';
import { readFile, WorkBook } from 'xlsx';

import { configDotenv } from 'dotenv'

configDotenv();

import { transformExcelSheetToJson } from 'cypress/transform';
import { sendReport } from 'cypress/email';
import { SummaryReport, TestFailureDetail } from 'cypress/type';

async function listFiles(folderPath: string): Promise<void> {
  try {
    const files = await readdir(folderPath);

    for (const file of files) {
      console.log(file);
    }
  } catch (err) {
    console.error("Error reading directory:", err);
  }
}

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    viewportWidth: 960,
    viewportHeight: 1280,
    defaultBrowser: 'chrome',
    video: true,
    retries: 2,
    // reporter: 'cypress-multi-reporters',
    // reporterOptions: {
    //   configFile: 'reporter-config.json',
    // },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      reportFilename: "[name]-[status]",
      json: false
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
        const sendReportToEmail = process.env['SEND_REPORT_TO_EMAIL'] == 'true' || false
        if ('status' in results) {
          console.log(JSON.stringify(results, null, 2))
          return
        }

        const isDir = fs.existsSync("cypress/reports") && fs.lstatSync("cypress/reports").isDirectory();
        console.log(`IS DIRECTORY: ${isDir}`)
        await listFiles("cypress/reports");

        const summary: SummaryReport = {
          start: results.startedTestsAt,
          end: results.endedTestsAt,
          browser: `${results.browserName} - ${results.browserVersion}`,
          duration: `${Math.round(results.totalDuration / 1000)} seconds`,
          totalTest: results.totalTests,
          totalPassedTest: results.totalPassed,
          totalFailedTest: results.totalFailed
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
        if (sendReportToEmail) {
          await sendReport(summary, failures)
        }
      })
    },
    env: {},
  },
  env: {},
  trashAssetsBeforeRuns: false,
});
