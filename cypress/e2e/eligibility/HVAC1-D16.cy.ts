import {WorkBook} from "xlsx";

import {DataExcel, SheetName, EXCEL_PATH} from "@cypress/excel"
import { 
  FormSelector, 
  ErrorMessage, 
  EligibilityResultText,
  URLPath
} from "@cypress/enum";

describe('Calculate HVAC1 Eligibility.', () => {
  const urlPath:string = URLPath.HVAC1_E;
  let dataExcel: DataExcel;

  before(() => {
    cy.task<WorkBook>("getDataExcel", EXCEL_PATH)
    .then((workbook) => {
      dataExcel = new DataExcel(workbook, SheetName.HVAC1_E);
    })
  })

  beforeEach(() => {
    cy.intercept("**/variables/**", { middleware: true },
    (req) => {
      req.on('before:response', (res) => {
        // We want to catch response data from server, the implementation is in calculateEligibility custom command.
        // This API is served from cache, but if request is served from the browser cache,
        // it will never hit the network layer, and cy.intercept() will never fire.
        // We can find the detail https://docs.cypress.io/api/commands/intercept#cyintercept-and-request-caching
        res.headers['cache-control'] = 'no-store'
      })
    }).as('getVariableDetail');
  })

  it('Successfully calculate eligibility with eligible result.', () => {
    const rowsData = dataExcel.getData();
    
    rowsData.forEach((rowData, index) => {
      let ineligibleSelectors: string[] = [];
      if (rowData["ineligibleQuestions"]) {
        ineligibleSelectors = rowData["ineligibleQuestions"].split(",");
      }

      const eligibleResult = ineligibleSelectors.length == 0 ? EligibilityResultText.ELIGIBLE : EligibilityResultText.INELIGIBLE;

      cy.calculateEligibility({
        id: rowData["tid"],
        uri: urlPath,
        calculateFormSelector: FormSelector.CALCULATE_FORM_SELECTOR,
        nextSelector: FormSelector.NEXT_SELECTOR,
        data: rowData,
        eligibilityResultText: eligibleResult,
        ineligibleSelectors: ineligibleSelectors
      })

      if (index <= rowsData.length - 1) {
        // reload page needed to trigger the **/variables/** API again.
        // because we need the network request triggered in order to intercept the request.
        // detail on beforeEach above.
        cy.reload();
      }
    })
  })

  // it('Failed because required fields are empty.', () => {
  //   const testId: string = "HVAC1_E_003";
  //   const rowData = dataExcel.getRowData(testId);
  //   const requiredFields: string[] = rowData["requiredFields"].split(",");

  //   cy.visit(urlPath);
  //   cy.get(FormSelector.USER_TYPE_SELECTOR).select("Government");
  //   cy.fillForm(FormSelector.CALCULATE_FORM_SELECTOR, rowData);
  //   cy.nextOrCalculate(FormSelector.NEXT_SELECTOR);

  //   requiredFields.forEach((selector) => {
  //     cy.get(`[data-ui-name="${selector}"]`).should("be.exist");
  //   })
  // })

  // it('Failed because Openfisca server unreachable.', () => {
  //   const testId: string = "HVAC1_E_004";
  //   const rowData = dataExcel.getRowData(testId);

  //   cy.visit(urlPath);
  //   cy.get(FormSelector.USER_TYPE_SELECTOR).select("Government");
  //   cy.fillForm(FormSelector.CALCULATE_FORM_SELECTOR, rowData);
  //   cy.intercept("POST", "**/calculate", {forceNetworkError: true});
  //   cy.nextOrCalculate(FormSelector.NEXT_SELECTOR);

  //   cy.get(`[data-ui-name="error-calculation"]`)
  //     .should("be.exist")
  //     .find("p")
  //     .and("have.text", ErrorMessage.UnreachableOpenfiscaServer);
  // })
})
