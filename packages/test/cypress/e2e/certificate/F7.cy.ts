import { WorkBook } from 'xlsx';

import { DataExcel, SheetName, EXCEL_PATH } from 'cypress/excel';
import {
  FormSelector,
  ErrorSelector,
  ResultSelector,
  PostcodeState,
  ErrorMessage,
  URLPath,
} from 'cypress/enum';

describe('Calculate F7 ESC certificate.', () => {
  const urlPath: string = URLPath.F7_C;
  const resultSelector = [
    ResultSelector.ESC_CERTIFICATE_SELECTOR,
    ResultSelector.ENERGY_SAVING_SELECTOR,
  ];
  let dataExcel: DataExcel;

  before(() => {
    cy.task<WorkBook>('getDataExcel', EXCEL_PATH).then((workbook) => {
      dataExcel = new DataExcel(workbook, SheetName.F7_C);
    });
  });

  it('Calculate certificate based on Excel sheet.', () => {
    const rowsData = dataExcel.getData();

    rowsData.forEach((rowData, index) => {
      cy.calculate({
        id: rowData['tid'],
        uri: urlPath,
        initialFormSelector: FormSelector.INITIAL_FORM_SELECTOR,
        calculateFormSelector: FormSelector.CALCULATE_FORM_SELECTOR,
        nextSelector: FormSelector.NEXT_SELECTOR,
        data: rowData,
        resultSelector: resultSelector,
        twoStep: true,
        interceptPostcodeAPI: {
          postcode: rowData['F7_PDRSAug24_PDRS__postcode'],
          state: PostcodeState.NSW,
        },
      });

      if (index <= rowsData.length - 1) {
        cy.get(FormSelector.RECALCULATE_SELECTOR).should('be.exist').click();
      }
    });
  });
});
