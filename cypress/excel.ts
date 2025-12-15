import { WorkBook, WorkSheet, utils } from "xlsx";


enum SheetName {
  RES_AC_CERT_SHEET = "HVAC1_C",
  RES_AC_ELIG_SHEET = "HVAC1_E"
}

class DataExcel {
  workbook: WorkBook
  sheetName: string

  constructor(workbook: WorkBook, sheetName: string) {
    this.workbook = workbook;
    this.sheetName = sheetName;
  }

  getHeaders(worksheet: WorkSheet): string[] {
    const rows: string[][] = utils.sheet_to_json(worksheet, { header: 1, raw: false, defval: "" });
    return rows[1];
  }

  getData(): Record<string, any>[] {
    const worksheet = this.workbook.Sheets[this.sheetName];
    const headers = this.getHeaders(worksheet);
    const rowsData = utils.sheet_to_json<Record<string, any>[]>(worksheet, {
      header: headers,
      range: 2,
      raw: false,
      defval: "",
      blankrows: false
    })

    return rowsData
  }

  getRowData(id: string): Record<string, any> {
    const rowData:Record<string, any>[] = this.getData();
    const record = rowData.find((item) => {
      return item["tid"] === id;
    })

    if (!record) {
      throw new Error(`Failed to fetch data. Data id ${id} not found.`);
    }

    return record;
  }

  getEmptyFields(id: string): string[] {
    const rowData:Record<string, any>[] = this.getData();
    const emptyFields:string[] = []
    Object.entries(rowData).forEach(([key, value]) => {
      if (!value) {
        emptyFields.push(key)
      }
    })

    return emptyFields
  }
}

export {
  DataExcel,
  SheetName
}