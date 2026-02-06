import { WorkBook } from 'xlsx';

import { DataExcel, SheetName, EXCEL_PATH } from 'cypress/excel';
import { FormSelector, ResultSelector, PostcodeState, URLPath } from 'cypress/enum';

describe('Calculate BESS2 PRC certificate.', () => {
  const urlPath: string = URLPath.BESS2_C;
  const resultSelector = [
    ResultSelector.PRC_CERTIFICATE_SELECTOR,
    ResultSelector.PEAK_DEMAND_REDUCTION_SELECTOR,
  ];
  let dataExcel: DataExcel;

  before(() => {
    cy.task<WorkBook>('getDataExcel', EXCEL_PATH).then((workbook) => {
      dataExcel = new DataExcel(workbook, SheetName.BESS2_C);
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
          postcode: rowData['BESS2_PDRSAug24_PDRS__postcode'],
          state: PostcodeState.NSW,
        },
      });

      if (index <= rowsData.length - 1) {
        cy.get(FormSelector.RECALCULATE_SELECTOR).should('be.exist').click();
      }
    });
  });
});
