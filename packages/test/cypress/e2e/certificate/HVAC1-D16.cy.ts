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
  const urlPath: string = URLPath.HVAC1_D16_C;
  const resultSelector = [
    ResultSelector.ESC_CERTIFICATE_SELECTOR,
    ResultSelector.PRC_CERTIFICATE_SELECTOR,
    ResultSelector.ENERGY_SAVING_SELECTOR,
    ResultSelector.PEAK_DEMAND_REDUCTION_SELECTOR,
  ];
  let dataExcel: DataExcel;
  let rowsData: Record<string, any>[];

  before(() => {
    cy.task<WorkBook>('getDataExcel', EXCEL_PATH).then((workbook) => {
      dataExcel = new DataExcel(workbook, SheetName.HVAC1_D16_C);
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
    const rowData = rowsData[1]

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
    const rowData = rowsData[2]

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
    const rowData = rowsData[3]

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
    const rowData = rowsData[4]

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
    const rowData = rowsData[5]

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
    const rowData = rowsData[6]

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

  it('Calculate certificate based on Excel sheet. Row data 8', () => {
    const rowData = rowsData[7]

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

  it('Calculate certificate based on Excel sheet. Row data 9', () => {
    const rowData = rowsData[8]

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

  it('Calculate certificate based on Excel sheet. Row data 10', () => {
    const rowData = rowsData[9]

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

  it('Calculate certificate based on Excel sheet. Row data 11', () => {
    const rowData = rowsData[10]

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

  // it('Failed because of invalid postcode.', () => {
  //   const testId: string = "HVAC1_C_004";
  //   const rowData = dataExcel.getRowData(testId);

  //   cy.fixture("response/postcode").then((response) => {
  //     cy.interceptPostcodeAPI(response, {
  //       postcode: rowData["postcode"],
  //       state: PostcodeState.INVALID
  //     })
  //   }).as('getPostcodeResponse');

  //   cy.visitAndExpectRegistry(urlPath);
  //   cy.fillForm(FormSelector.INITIAL_FORM_SELECTOR, rowData);
  //   cy.waitForNetworkIdle(1000);
  //   cy.nextOrCalculate(FormSelector.NEXT_SELECTOR);
  //   cy.wait('@getPostcodeResponse');
  //   cy.get(ErrorSelector.POSTCODE_INVALID)
  //     .should("be.exist")
  //     .find("h3")
  //     .and("have.text", ErrorMessage.InvalidPostcode);
  // })

  // it('Failed because Product Registry server unreachable.', () => {
  //   const testId: string = "HVAC1_C_005";
  //   const rowData = dataExcel.getRowData(testId);

  //   cy.intercept("GET", "**/models", {forceNetworkError: true});

  //   cy.visitAndExpectRegistry(urlPath);
  //   cy.fillForm(FormSelector.INITIAL_FORM_SELECTOR, rowData);
  //   cy.get(ErrorSelector.PRODUCT_REGISTRY_API_ERROR)
  //     .should("be.exist")
  //     .find("p")
  //     .and("have.text", ErrorMessage.UnreachableProductRegistryServer);
  // })

  // it('Failed because Openfisca server unreachable.', () => {
  //   const testId: string = "HVAC1_C_006";
  //   const rowData = dataExcel.getRowData(testId);

  //   cy.fixture("response/postcode").then((response) => {
  //     cy.interceptPostcodeAPI(response, {
  //       postcode: rowData["postcode"],
  //       state: PostcodeState.VALID
  //     })
  //   }).as('getPostcodeResponse');

  //   cy.visitAndExpectRegistry(urlPath);
  //   cy.fillForm(FormSelector.INITIAL_FORM_SELECTOR, rowData);
  //   cy.waitForNetworkIdle(1000);
  //   cy.nextOrCalculate(FormSelector.NEXT_SELECTOR);
  //   cy.intercept("POST", "**/calculate", {forceNetworkError: true});
  //   cy.fillForm(FormSelector.CALCULATE_FORM_SELECTOR, rowData);
  //   cy.nextOrCalculate(FormSelector.NEXT_SELECTOR);
  //   cy.wait('@getPostcodeResponse');
  //   cy.get(ErrorSelector.CALCULATE_ERROR)
  //     .should("be.exist")
  //     .find("p")
  //     .and("have.text", ErrorMessage.UnreachableOpenfiscaServer);
  // })

  // it('Failed because required field are empty.', () => {
  //   const testId: string = "HVAC1_C_007";
  //   const rowData = dataExcel.getRowData(testId);
  //   const emptyFields = dataExcel.getEmptyFields(testId);

  //   cy.fixture("response/postcode").then((response) => {
  //     cy.interceptPostcodeAPI(response, {
  //       postcode: rowData["postcode"],
  //       state: PostcodeState.VALID
  //     })
  //   }).as('getPostcodeResponse');

  //   cy.visitAndExpectRegistry(urlPath);
  //   cy.fillForm(FormSelector.INITIAL_FORM_SELECTOR, rowData);
  //   cy.waitForNetworkIdle(1000);
  //   cy.nextOrCalculate(FormSelector.NEXT_SELECTOR);
  //   cy.wait('@getPostcodeResponse');
  //   cy.fillForm(FormSelector.CALCULATE_FORM_SELECTOR, rowData);
  //   cy.nextOrCalculate(FormSelector.NEXT_SELECTOR);
  //   emptyFields.forEach((field) => {
  //     cy.get(`[data-ui-name="${field}"]`).should("be.exist");
  //   })
  // })
});
