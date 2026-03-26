import * as fs from 'fs';
import * as path from 'path';

import { WorkSheet, utils, readFile } from 'xlsx';

import {SheetName} from './excel';

const EXCEL_PATH = 'cypress/fixtures/data.xlsx';
const FIXTURE_FOLDER = 'cypress/fixtures';

/**
 * Get headers from excel sheet where the header will be in row 2.
 * @param worksheet - worksheet instance
 * @returns 
 */
function getHeaders(worksheet: WorkSheet): string[] {
  const rows: string[][] = utils.sheet_to_json(worksheet, { header: 1, raw: false, defval: '' });
  return rows[1];
}

/**
 * Get rows data from specific sheet.
 * @param sheetName - Sheet name from excel file
 * @returns
 */
function getData(sheetName: string): Record<string, any>[] {
  const wb = readFile(EXCEL_PATH);
  const worksheet = wb.Sheets[sheetName];
  const headers = getHeaders(worksheet);
  const rowsData = utils.sheet_to_json<Record<string, any>[]>(worksheet, {
    header: headers,
    range: 2,
    raw: false,
    defval: '',
    blankrows: false,
  });

  return rowsData;
}

/**
 * Write JSON data to file.
 * - Creates file if it does not exist
 * - Overwrites file if it already exists
 *
 * @param filePath - Full path to the JSON file
 * @param data - Array of objects to write
 */
function writeJsonToFile(filePath: string, data: Record<string, any>[]): void {
  try {
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Convert data to formatted JSON string
    const jsonContent = JSON.stringify(data, null, 2);

    // Write (overwrite if exists)
    fs.writeFileSync(filePath, jsonContent, {
      encoding: 'utf8',
      flag: 'w', // overwrite mode
    });

    console.log(`✅ JSON file written successfully at: ${filePath}`);
  } catch (error) {
    console.error('❌ Failed to write JSON file:', error);
    throw error;
  }
}

const sheets = Object.values(SheetName);

/**
 * Transform all excel sheet into json files.
 */
function transformExcelSheetToJson() {
  sheets.forEach((sheetName: string) => {
    const type = sheetName.at(-1);
    const activityType = type == 'C' ? 'certificate' : 'eligibility';
    const fixturePath = path.join(FIXTURE_FOLDER, activityType, `${sheetName}.json`);
    const data = getData(sheetName);
    writeJsonToFile(fixturePath, data);
  });
}

export {
  transformExcelSheetToJson
}
