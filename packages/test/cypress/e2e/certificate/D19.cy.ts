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

describe('Calculate HVAC1 ESC and PRC certificate.', () => {
  const urlPath: string = URLPath.D19_C;
  const resultSelector = [
    ResultSelector.ESC_CERTIFICATE_SELECTOR,
    ResultSelector.ENERGY_SAVING_SELECTOR,
  ];
  let dataExcel: DataExcel;

  before(() => {
    cy.task<WorkBook>('getDataExcel', EXCEL_PATH).then((workbook) => {
      dataExcel = new DataExcel(workbook, SheetName.D19_C);
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
        interceptPostcodeAPI: {
          postcode: rowData['postcode'],
          state: PostcodeState.VALID,
        },
      });

      if (index <= rowsData.length - 1) {
        cy.get(FormSelector.RECALCULATE_SELECTOR).should('be.exist').click();
      }
    });
  });
});
