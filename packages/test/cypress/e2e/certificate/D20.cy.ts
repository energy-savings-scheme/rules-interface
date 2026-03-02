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

describe('Calculate D20 ESC certificate.', () => {
  const urlPath: string = URLPath.D20_C;
  const resultSelector = [
    ResultSelector.ESC_CERTIFICATE_SELECTOR,
    ResultSelector.ENERGY_SAVING_SELECTOR,
  ];
  let dataExcel: DataExcel;
  let rowsData: Record<string, any>[];

  before(() => {
    cy.task<WorkBook>('getDataExcel', EXCEL_PATH).then((workbook) => {
      dataExcel = new DataExcel(workbook, SheetName.D20_C);
      rowsData = dataExcel.getData();
    });
  });

  it('Calculate certificate based on Excel sheet. Row data 1', () => {
    const rowData = rowsData[0];

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
        state: PostcodeState.NSW,
      },
    });
  });

  it('Calculate certificate based on Excel sheet. Row data 2', () => {
    const rowData = rowsData[1];

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
        state: PostcodeState.NSW,
      },
    });
  });

  it('Calculate certificate based on Excel sheet. Row data 3', () => {
    const rowData = rowsData[2];

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
        state: PostcodeState.NSW,
      },
    });
  });

  it('Calculate certificate based on Excel sheet. Row data 4', () => {
    const rowData = rowsData[3];

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
        state: PostcodeState.NSW,
      },
    });
  });

  it('Calculate certificate based on Excel sheet. Row data 5', () => {
    const rowData = rowsData[4];

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
        state: PostcodeState.NSW,
      },
    });
  });

  it('Calculate certificate based on Excel sheet. Row data 6', () => {
    const rowData = rowsData[5];

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
        state: PostcodeState.NSW,
      },
    });
  });

  it('Calculate certificate based on Excel sheet. Row data 7', () => {
    const rowData = rowsData[6];

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
        state: PostcodeState.NSW,
      },
    });
  });

  // it('Calculate certificate based on Excel sheet.', () => {
  //   const rowsData = dataExcel.getData();

  //   rowsData.forEach((rowData, index) => {
  //     cy.calculate({
  //       id: rowData['tid'],
  //       uri: urlPath,
  //       initialFormSelector: FormSelector.INITIAL_FORM_SELECTOR,
  //       calculateFormSelector: FormSelector.CALCULATE_FORM_SELECTOR,
  //       nextSelector: FormSelector.NEXT_SELECTOR,
  //       data: rowData,
  //       resultSelector: resultSelector,
  //       interceptPostcodeAPI: {
  //         postcode: rowData['postcode'],
  //         state: PostcodeState.NSW,
  //       },
  //     });

  //     if (index <= rowsData.length - 1) {
  //       cy.get(FormSelector.RECALCULATE_SELECTOR).should('be.exist').click();
  //     }
  //   });
  // });
});
