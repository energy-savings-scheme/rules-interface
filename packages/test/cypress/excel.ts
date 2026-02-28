import { WorkBook, WorkSheet, utils } from 'xlsx';

enum SheetName {
  HVAC1_C = 'HVAC1_C',
  SYS2_D5_C = 'SYS2_D5_C',
  D17_C = 'D17_C',
  D18_C = 'D18_C',
  D19_C = 'D19_C',
  D20_C = 'D20_C',
  C1_C = 'C1_C',
  BESS2_C = 'BESS2_C',
  HVAC2_C = 'HVAC2_C',
  F16_E_C = 'F16_E_C',
  F16_G_C = 'F16_G_C',
  F17_C = 'F17_C',
  RF2_F1_2_C = 'RF2_F1_2_C',
  F7_C = 'F7_C',
  CORE_E = 'CORE_E',
  HVAC1_E = 'HVAC1_E',
  SYS2_D5_E = 'SYS2_D5_E',
  C1_E = 'C1_E',
  BESS2_E = 'BESS2_E',
  D17_E = 'D17_E',
  D18_E = 'D18_E',
  D19_E = 'D19_E',
  D20_E = 'D20_E',
  HVAC2_E = 'HVAC2_E',
  F16_E_E = 'F16_E_E',
  F16_G_E = 'F16_G_E',
  F17_E = 'F17_E',
  RF2_F1_2_E = 'RF2_F1_2_E',
  F7_E = 'F7_E',
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
