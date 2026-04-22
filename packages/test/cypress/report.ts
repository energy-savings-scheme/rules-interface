import path from "path";
import { readFileSync } from "fs";

import {merge} from "mochawesome-merge";
import generator from "mochawesome-report-generator";
import { EmailClient, EmailMessage, EmailSendResponse, KnownEmailSendStatus } from "@azure/communication-email";
import type { SimplePollerLike, OperationState } from "@azure/core-lro";
import { Octokit } from "@octokit/rest";

import config from "cypress/config";

console.log(JSON.stringify(config, null, 2))


type ReportStatus = "PASSED" | "FAILED"
let emailClient: EmailClient;

const octokit = new Octokit({ 
  auth: config.githubToken.trim()
});

function getEmailClient(): EmailClient {
  if (!config.communicationServicesConnectionString) {
    throw new Error("Connection string is required.")
  }

  if (!emailClient) {
    emailClient = new EmailClient(config.communicationServicesConnectionString);
  }

  return emailClient
}

function reportDate(): string {
  const now = new Date()
  // we want to take the date information only
  return now.toISOString().split("T")[0];
}

/**
 * This function will combine all the cypress json result into a single HTML file report.
 */
async function generateSummaryReport(): Promise<string> {
  const report = await merge({
    files: [`${config.reportDir}/*.json`],
  });

  // 2. Create the HTML report
  // files will be an array with 2 items.
  // the first one is the path of generate html file report
  // the second one is the path of generate html file report
  const files: string[] = await generator.create(report, {
    reportDir: `${config.reportDir}`,
    reportFilename: "report-[datetime]",
    timestamp: "yyyy-mm-dd_HH:MM:ss",
    reportPageTitle: `Cypress Auto Testing Report - ${reportDate()}`,
    inline: true,
    saveHtml: true,
    saveJson: false,
    code: false
  });
  
  return files[0];
}

/**
 * 
 * @param filename the name of the report file that already combined.
 * @returns 
 */
async function isFileExistInRepo(filename: string): Promise<boolean> {
  const githubPath: string = path.join(config.githubTestReportDir, filename);
  try {
    await octokit.rest.repos.getContent({
      owner: config.githubOwner,
      repo: config.githubRepositoryName,
      path: githubPath
    })
  } catch (err: unknown) {
    if (err instanceof Error && "status" in err) {
      if (err.status == 404) {
        return false
      }
    }
    console.log(JSON.stringify(err, null, 2))
  }

  return true
}

/**
 * 
 * @param reportPath path to the report that already combined into a single html file 
 * @returns
 */
async function uploadToGithub(reportPath: string): Promise<string | undefined> {
  const filename: string = path.basename(reportPath);
  const githubPath: string = path.join(config.githubTestReportDir, filename);
  const isFileExist: boolean = await isFileExistInRepo(filename);
  if (!isFileExist) {    
    const file: Buffer<ArrayBuffer> = readFileSync(reportPath);
    try {
        const {data} = await octokit.rest.repos.createOrUpdateFileContents({
        owner: config.githubOwner,
        repo: config.githubRepositoryName,
        path: githubPath,
        message: `System upload cypress auto testing report`,
        branch: "main",
        content: file.toString('base64'),
      })
      return data.content?.html_url
    } catch (error) {
      if (error instanceof Error && "response" in error && "status" in error) {
        console.log("Status:", error.status);
        console.log("Data:", (error as any).response.data); 
      }
    }
  }

  console.log(`File ${githubPath} already exist in Github.`)
}


/**
 * @param status status of the test result
 * @param reportPath path to the report that already combined into a single html file
 * @param githubUrl url path of the report that uploaded to the Github
 * @returns
 */
async function sendEmail(status: ReportStatus, reportPath: string, githubUrl: string | undefined): Promise<void> {
  const emailClient: EmailClient = getEmailClient();

  const subject: string = `Auto Testing Report - ${status}`;
  const emailRecipient: string = config.recipientEmail;
  const nameRecipient: string = config.recipientName;
  const githubLinkTemplate: string = `<p>The report also uploaded to <a href="${githubUrl}">Github</a></p>`
  const githubLinkNotAvailable: string = '<p>Report link to Github not available.</p>'

  if (config.communicationServicesEmailSenderDomain) {
    const POLLER_WAIT_TIME: number = 10
    try {
      const message: EmailMessage = {
        senderAddress: config.communicationServicesEmailSenderDomain,
        content: {
          subject: subject,
          html: githubUrl ? githubLinkTemplate : githubLinkNotAvailable,
        },
        attachments: [],
        recipients: {
          to: [
            {
              address: emailRecipient,
              displayName: nameRecipient,
            },
          ],
        },
      };

      const poller: SimplePollerLike<OperationState<EmailSendResponse>, EmailSendResponse> = await emailClient.beginSend(message);

      if (poller.getOperationState().status != "running") {
        throw "Poller was not started."
      }

      let timeElapsed: number = 0;
      while (!poller.isDone()) {
        poller.poll();
        console.log("Email send polling in progress");

        await new Promise(resolve => setTimeout(resolve, POLLER_WAIT_TIME * 1000));
        timeElapsed += 10;

        if (timeElapsed > 18 * POLLER_WAIT_TIME) {
          throw "Polling timed out.";
        }
      }

      if (poller.getResult()?.status === KnownEmailSendStatus.Succeeded) {
        console.log(`Successfully sent the email (operation id: ${poller.getResult()?.id})`);
      }
      else {
        throw poller.getResult()?.error;
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export {
  reportDate,
  generateSummaryReport,
  sendEmail,
  uploadToGithub
}
