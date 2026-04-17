import { configDotenv } from 'dotenv';

configDotenv();

interface Config {
  baseUrl: string
  excelPath: string
  reportDir: string
  sendReportToEmail: boolean
  uploadReportToGithub: boolean,
  communicationServicesConnectionString: string
  communicationServicesEmailSenderDomain: string
  recipientEmail: string
  recipientName: string
  githubToken: string
  githubOwner: string
  githubRepositoryName: string
  githubTestReportDir: string
}

const config: Config = {
  baseUrl: process.env['BASE_URL'] || 'http://localhost:3000',
  excelPath: process.env['EXCEL_PATH'] || 'cypress/fixtures/data.xlsx',
  reportDir: process.env['REPORT_DIR'] || 'cypress/reports/',
  sendReportToEmail: process.env['SEND_REPORT_TO_EMAIL']?.toLowerCase() === 'true' || true,
  uploadReportToGithub: process.env['UPLOAD_REPORT_TO_GITHUB']?.toLocaleLowerCase() === 'true' || true,
  communicationServicesConnectionString: process.env['COMMUNICATION_SERVICES_CONNECTION_STRING'] || '',
  communicationServicesEmailSenderDomain: process.env['COMMUNICATION_SERVICES_EMAIL_SENDER_DOMAIN'] || '',
  recipientEmail: process.env['RECIPIENT_EMAIL'] || 'sustainability@environment.nsw.gov.au',
  recipientName: process.env['RECIPIENT_NAME'] || 'sustainability',
  githubToken: process.env['GITHUB_TOKEN'] || '',
  githubOwner: process.env['GITHUB_OWNER'] || 'energy-savings-scheme',
  githubRepositoryName: process.env['GITHUB_REPOSITORY_NAME'] || 'product-registry-files',
  githubTestReportDir: process.env['GITHUB_REPORT_DIR'] || 'auto-test-result/'
}

export default config;
