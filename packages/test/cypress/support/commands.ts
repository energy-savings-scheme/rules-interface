import 'cypress-network-idle';
import { WorkBook } from 'xlsx';

import { FormSelector, ResultSelector } from 'cypress/enum';
import {
  InterceptPostcodeAPIOptions,
  CalculateEligibilityFormInputType,
  CalculateFormInputType,
} from 'cypress/type';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      visitAndExpectRegistry(uri: string): Chainable<void>;
      fillForm(formSelector: string, data: { [key: string]: any }): Chainable<JQuery<HTMLElement>>;
      checkCalculationResult(
        fieldNames: string[],
        data: { [key: string]: any },
      ): Chainable<{ [key: string]: string }>;
      calculate(input: CalculateFormInputType): Chainable<void>;
      calculateEligibility(input: CalculateEligibilityFormInputType): Chainable<void>;
      getDataExcel(filePath: string): Chainable<WorkBook>;
      nextOrCalculate(selector: string): Chainable<JQuery<HTMLElement>>;
      interceptPostcodeAPI(params: InterceptPostcodeAPIOptions): Chainable<void>;
    }
  }
}

Cypress.Commands.add('visitAndExpectRegistry', (uri: string) => {
  cy.visit(uri);
  cy.get('[data-ui-name="registry-update"]').should('be.exist');
});

Cypress.Commands.add('fillForm', (formSelector: string, data: { [key: string]: any }) => {
  cy.waitForNetworkIdle(1000);
  Object.entries(data).forEach(([fieldName, value]) => {
    cy.get(`${formSelector}`).then(($el) => {
      const input = $el.find(`[data-ui-name="${fieldName}"]`);
      // if element not found or
      // value field is empty, just skip.
      if (input.length === 0 || value == '') {
        return;
      }

      const tag = input.prop('tagName').toLowerCase();
      const type = input.attr('type');

      if (tag === 'select') {
        // Annoyingly, there is a moment when selecting a box, there is a call to populate
        // the options
        cy.get(`${formSelector} [data-ui-name="${fieldName}"]`).should('be.exist');
        cy.wrap(input).select(value);
        if (fieldName === 'brand') {
          cy.waitForNetworkIdle(100);
        }
      } else if (tag === 'textarea' || type === 'text' || type === 'email' || type === 'number') {
        cy.wrap(input).clear().type(value);
      } else if (type === 'checkbox' || type === 'radio') {
        cy.wrap(input).check(value);
      } else {
        cy.log(`Unsupported input type: ${type}`);
      }
    });
  });
});

Cypress.Commands.add(
  'checkCalculationResult',
  (fieldNames: string[], data: { [key: string]: any }) => {
    // const result: { [key: string]: string } = {};
    fieldNames.forEach((field) => {
      cy.get(`[data-ui-name="${field}"]`).should('be.exist').and('have.text', data[field]);
    });
  },
);

Cypress.Commands.add('nextOrCalculate', (selector: string) => {
  cy.get(selector).should("be.exist").click();
});

Cypress.Commands.add('calculate', (input: CalculateFormInputType) => {
  // Open page and wait
  cy.task('log', `Running test calculate. Test ID: ${input.id}`);

  cy.intercept('POST', '**/calculate').as('calculateAPI');

  cy.visitAndExpectRegistry(input.uri);
  if (input.interceptPostcodeAPI) {
    cy.interceptPostcodeAPI(input.interceptPostcodeAPI).as('getResponsePostcode');
  }

  // Fill first form
  cy.fillForm(input.initialFormSelector, input.data);
  cy.nextOrCalculate(input.nextSelector);
  cy.wait('@getResponsePostcode');

  // Next form
  cy.get(input.nextSelector).should('be.exist');
  cy.fillForm(input.calculateFormSelector, input.data);
  cy.nextOrCalculate(input.nextSelector);

  // make sure to wait calculate api completed first before do assertation.
  cy.wait('@calculateAPI');

  // Check result
  cy.checkCalculationResult(input.resultSelector, input.data);
});

Cypress.Commands.add('calculateEligibility', (input: CalculateEligibilityFormInputType) => {
  cy.task('log', `Running test calculate eligibility. Test ID: ${input.id}`);

  cy.intercept('POST', '**/calculate').as('calculateAPI');

  let variables: { [key: string]: any }[] = [];
  cy.visit(input.uri);
  cy.wait('@getVariableDetail').then((interception) => {
    variables = interception.response?.body.input_offsprings;
    cy.get(FormSelector.USER_TYPE_SELECTOR).select('Government');
    cy.fillForm(input.calculateFormSelector, input.data);
    cy.nextOrCalculate(input.nextSelector);

    // make sure to wait calculate api completed first before do assertation.
    cy.wait('@calculateAPI');

    cy.get(ResultSelector.ELIGIBILITY_RESULT_TEXT_SELECTOR).should(
      'have.text',
      input.eligibilityResultText,
    );

    input.ineligibleSelectors.forEach((selector) => {
      const variableDetail = variables.find((variable) => {
        return variable.name == selector;
      });

      if (variableDetail) {
        // replace all <br />, <br> with \n
        // because <br />, <br> element in eligibility clause text from response api
        // are being replaced by \n when rendered in eligibility result page.
        const expectedText = variableDetail.metadata.eligibility_clause.replace(
          /<br\s*\/?>/gi,
          '\n',
        );

        cy.get(`[data-ui-name=${selector}]`)
          .should('be.exist')
          .invoke('text')
          .should('eq', expectedText);
      }
    });
  });
});

Cypress.Commands.add('interceptPostcodeAPI', (params: InterceptPostcodeAPIOptions) => {
  cy.fixture('response/postcode').then((response) => {
    cy.intercept('GET', '**/postcode/**', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          ...response,
          data: {
            ...response['data'],
            state: params.state,
            postcode: params.postcode,
          },
        },
      });
    });
  });
});


export {};
