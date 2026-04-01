import { EmailClient, EmailMessage, EmailSendOptionalParams, EmailSendResponse, KnownEmailSendStatus } from '@azure/communication-email';
import type { SimplePollerLike, OperationState } from "@azure/core-lro";

import { configDotenv } from 'dotenv';

import {SummaryReport, TestFailureDetail} from 'cypress/type';

configDotenv();

const connectionString = process.env['COMMUNICATION_SERVICES_CONNECTION_STRING'];
const senderDomain = process.env['COMMUNICATION_SERVICES_EMAIL_SENDER_DOMAIN'];

let emailClient: EmailClient;

function getEmailClient(): EmailClient {
  if (!connectionString) {
    throw new Error('Connection string is required.')
  }

  if (!emailClient) {
    emailClient = new EmailClient(connectionString);
  }

  return emailClient
}

export async function sendReport(summaryReport: SummaryReport, failures: TestFailureDetail[] = []): Promise<void> {
  const emailClient = getEmailClient();

  const subject = 'Weekly Regression Test Report - Cypress'
  const emailRecipient = process.env['RECIPIENT_EMAIL'] || ''
  const nameRecipient = process.env['RECIPIENT_NAME'] || ''

  const messageRows = Object.entries(summaryReport)
    .map(([key, value]) => `${key.padEnd(20)}: ${value}`)
    .join('\n  ');

  let failureRows = '---';
  if (failures.length > 0) {
    failureRows = failures
    .map((failure: TestFailureDetail) => {
      return Object.entries(failure)
        .map(([key, value]) => `${key.padEnd(20)}: ${value}`)
        .join('\n  ');
    })
    .join('\n  -------------------------------------------\n  ');
  }

  const plainTextContent = `
  This is the summary automated testing report:
  -------------------------------------------
  ${messageRows}
  -------------------------------------------

  Failures:
  -------------------------------------------
  ${failureRows}
  -------------------------------------------

  Regards,
  Azure VM System.
  `;

  if (senderDomain) {
    const POLLER_WAIT_TIME = 10
    try {
      const message = {
        senderAddress: senderDomain,
        content: {
          subject: subject,
          plainText: plainTextContent,
        },
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

      let timeElapsed = 0;
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
