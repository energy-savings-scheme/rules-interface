import { FormSelector, EligibilityResultText, URLPath } from 'cypress/enum';

import dataFixtures from 'cypress/fixtures/eligibility/F16_E_E.json';

describe('Calculate F16-E Eligibility.', () => {
  const urlPath: string = URLPath.F16_E_E;

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

  dataFixtures.forEach((rowData: Record<string, any>) => {
    it(`Successfully calculate commercial electric water heater - heat pump eligibility with eligible or ineligible result. Test ID: ${rowData['tid']}`, () => {
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
  });
});
