import { WorkBook } from 'xlsx';

import { DataExcel, SheetName, EXCEL_PATH } from 'cypress/excel';
import { FormSelector, EligibilityResultText, URLPath } from 'cypress/enum';

describe('Calculate RF2 Eligibility.', () => {
  const urlPath: string = URLPath.RF2_F1_2_E;
  let dataExcel: DataExcel;
  let rowsData: Record<string, any>[];

  before(() => {
    cy.task<WorkBook>('getDataExcel', EXCEL_PATH).then((workbook) => {
      dataExcel = new DataExcel(workbook, SheetName.RF2_F1_2_E);
      rowsData = dataExcel.getData();
    });
  });

  beforeEach(() => {
    cy.intercept('**/variables/**', { middleware: true }, (req) => {
      req.on('before:response', (res) => {
        // We want to catch response data from server, the implementation is in calculateEligibility custom command.
        // This API is served from cache, but if request is served from the browser cache,
        // it will never hit the network layer, and cy.intercept() will never fire.
        // We can find the detail https://docs.cypress.io/api/commands/intercept#cyintercept-and-request-caching
        res.headers['cache-control'] = 'no-store';
      });
    }).as('getVariableDetail');
  });

  it('Successfully calculate refrigrated cabinet eligibility with eligible or ineligible result. Row data 1', () => {
    const rowData = rowsData[0];

    let ineligibleSelectors: string[] = [];
    if (rowData['ineligibleQuestions']) {
      ineligibleSelectors = rowData['ineligibleQuestions'].split(',');
    }

    const eligibleResult =
      ineligibleSelectors.length == 0
        ? EligibilityResultText.ELIGIBLE
        : EligibilityResultText.INELIGIBLE;

    cy.calculateEligibility({
      id: rowData['tid'],
      uri: urlPath,
      calculateFormSelector: FormSelector.CALCULATE_FORM_SELECTOR,
      nextSelector: FormSelector.NEXT_SELECTOR,
      data: rowData,
      eligibilityResultText: eligibleResult,
      ineligibleSelectors: ineligibleSelectors,
    });
  });

  it('Successfully calculate refrigrated cabinet eligibility with eligible or ineligible result. Row data 2', () => {
    const rowData = rowsData[1];

    let ineligibleSelectors: string[] = [];
    if (rowData['ineligibleQuestions']) {
      ineligibleSelectors = rowData['ineligibleQuestions'].split(',');
    }

    const eligibleResult =
      ineligibleSelectors.length == 0
        ? EligibilityResultText.ELIGIBLE
        : EligibilityResultText.INELIGIBLE;

    cy.calculateEligibility({
      id: rowData['tid'],
      uri: urlPath,
      calculateFormSelector: FormSelector.CALCULATE_FORM_SELECTOR,
      nextSelector: FormSelector.NEXT_SELECTOR,
      data: rowData,
      eligibilityResultText: eligibleResult,
      ineligibleSelectors: ineligibleSelectors,
    });
  });

  it('Successfully calculate refrigrated cabinet eligibility with eligible or ineligible result. Row data 3', () => {
    const rowData = rowsData[2];

    let ineligibleSelectors: string[] = [];
    if (rowData['ineligibleQuestions']) {
      ineligibleSelectors = rowData['ineligibleQuestions'].split(',');
    }

    const eligibleResult =
      ineligibleSelectors.length == 0
        ? EligibilityResultText.ELIGIBLE
        : EligibilityResultText.INELIGIBLE;

    cy.calculateEligibility({
      id: rowData['tid'],
      uri: urlPath,
      calculateFormSelector: FormSelector.CALCULATE_FORM_SELECTOR,
      nextSelector: FormSelector.NEXT_SELECTOR,
      data: rowData,
      eligibilityResultText: eligibleResult,
      ineligibleSelectors: ineligibleSelectors,
    });
  });

  // it('Successfully calculate refrigrated cabinet eligibility with eligible or ineligible result.', () => {
  //   const rowsData = dataExcel.getData();

  //   rowsData.forEach((rowData, index) => {
  //     let ineligibleSelectors: string[] = [];
  //     if (rowData['ineligibleQuestions']) {
  //       ineligibleSelectors = rowData['ineligibleQuestions'].split(',');
  //     }

  //     const eligibleResult =
  //       ineligibleSelectors.length == 0
  //         ? EligibilityResultText.ELIGIBLE
  //         : EligibilityResultText.INELIGIBLE;

  //     cy.calculateEligibility({
  //       id: rowData['tid'],
  //       uri: urlPath,
  //       calculateFormSelector: FormSelector.CALCULATE_FORM_SELECTOR,
  //       nextSelector: FormSelector.NEXT_SELECTOR,
  //       data: rowData,
  //       eligibilityResultText: eligibleResult,
  //       ineligibleSelectors: ineligibleSelectors,
  //     });

  //     if (index <= rowsData.length - 1) {
  //       // reload page needed to trigger the **/variables/** API again.
  //       // because we need the network request triggered in order to intercept the request.
  //       // detail on beforeEach above.
  //       cy.reload();
  //     }
  //   });
  // });
});
