import { WorkBook, WorkSheet, utils } from 'xlsx';

enum SheetName {
  HVAC1_C = 'HVAC1_C',
  SYS2_D5_C = 'SYS2_D5_C',
  D17_C = 'D17_C',
  D19_C = 'D19_C',
  HVAC1_E = 'HVAC1_E',
}

const EXCEL_PATH = 'cypress/fixtures/data.xlsx';

class DataExcel {
  workbook: WorkBook;
  sheetName: string;

  constructor(workbook: WorkBook, sheetName: string) {
    this.workbook = workbook;
    this.sheetName = sheetName;
  }

  getHeaders(worksheet: WorkSheet): string[] {
    const rows: string[][] = utils.sheet_to_json(worksheet, { header: 1, raw: false, defval: '' });
    return rows[1];
  }

  getData(): Record<string, any>[] {
    const worksheet = this.workbook.Sheets[this.sheetName];
    const headers = this.getHeaders(worksheet);
    const rowsData = utils.sheet_to_json<Record<string, any>[]>(worksheet, {
      header: headers,
      range: 2,
      raw: false,
      defval: '',
      blankrows: false,
    });

    return rowsData;
  }
}

export { DataExcel, SheetName, EXCEL_PATH };
