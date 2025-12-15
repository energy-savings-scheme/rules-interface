import {WorkBook} from "xlsx";

import {DataExcel, SheetName} from "../../excel"
import { 
  FormSelector, 
  ErrorSelector, 
  ResultSelector, 
  PostcodeState,
  ErrorMessage
} from "../../enum";

describe('Calculate ESC and PRC certificate.', () => {
  const urlPath: string = "#/residential-ac-estimator";
  const resultSelector = [
    ResultSelector.ESC_CERTIFICATE,
    ResultSelector.PRC_CERTIFICATE,
    ResultSelector.ENERGY_SAVING,
    ResultSelector.PEAK_DEMAND_REDUCTION
  ]
  let dataExcel: DataExcel;

  before(() => {
    cy.task<WorkBook>("getDataExcel", Cypress.env("dataExcelPath"))
    .then((workbook) => {
      dataExcel = new DataExcel(workbook, SheetName.RES_AC_CERT_SHEET);
    })
  })

  it('Successfully calculate certificate.', () => {
    const testId: string = "HVAC1_C_001";
    const rowData = dataExcel.getRowData(testId);

    cy.calculate({
      id: testId,
      uri: urlPath,
      initialFormSelector: FormSelector.INITIAL_FORM_SELECTOR,
      calculateFormSelector: FormSelector.CALCULATE_FORM_SELECTOR,
      nextSelector: FormSelector.NEXT_SELECTOR,
      data: rowData,
      resultSelector: resultSelector,
      interceptPostcodeAPI: {
        postcode: rowData["postcode"],
        state: PostcodeState.VALID
      }
    })
  })

  it('Successfully calculate certificate with 0 ESC or PRC.', () => {
    const testId: string = "HVAC1_C_002";
    const rowData = dataExcel.getRowData(testId);

    cy.calculate({
      id: testId,
      uri: urlPath,
      initialFormSelector: FormSelector.INITIAL_FORM_SELECTOR,
      calculateFormSelector: FormSelector.CALCULATE_FORM_SELECTOR,
      nextSelector: FormSelector.NEXT_SELECTOR,
      data: rowData,
      resultSelector: resultSelector,
      interceptPostcodeAPI: {
        postcode: rowData["postcode"],
        state: PostcodeState.VALID
      }
    })
  })

  it('Successfully calculate with 0 certificate.', () => {
    const testId: string = "HVAC1_C_003";
    const rowData = dataExcel.getRowData(testId);

    cy.calculate({
      id: testId,
      uri: urlPath,
      initialFormSelector: FormSelector.INITIAL_FORM_SELECTOR,
      calculateFormSelector: FormSelector.CALCULATE_FORM_SELECTOR,
      nextSelector: FormSelector.NEXT_SELECTOR,
      data: rowData,
      resultSelector: resultSelector,
      interceptPostcodeAPI: {
        postcode: rowData["postcode"],
        state: PostcodeState.VALID
      }
    })
  })

  it('Failed because of invalid postcode.', () => {
    const testId: string = "HVAC1_C_004";
    const rowData = dataExcel.getRowData(testId);

    cy.interceptPostcodeAPI({
      postcode: rowData["postcode"],
      state: PostcodeState.INVALID
    })

    cy.visitAndExpectRegistry(urlPath);
    cy.fillForm(FormSelector.INITIAL_FORM_SELECTOR, rowData);
    cy.waitForNetworkIdle(1000);
    cy.nextOrCalculate(FormSelector.NEXT_SELECTOR);
    cy.get(ErrorSelector.POSTCODE_INVALID)
      .should("be.exist")
      .find("h3")
      .and("have.text", ErrorMessage.InvalidPostcode);
  })

  it('Failed because Product Registry server unreachable.', () => {
    const testId: string = "HVAC1_C_005";
    const rowData = dataExcel.getRowData(testId);

    cy.intercept("GET", "**/models", {forceNetworkError: true});
    
    cy.visitAndExpectRegistry(urlPath);
    cy.fillForm(FormSelector.INITIAL_FORM_SELECTOR, rowData);
    cy.get(ErrorSelector.PRODUCT_REGISTRY_API_ERROR)
      .should("be.exist")
      .find("p")
      .and("have.text", ErrorMessage.UnreachableProductRegistryServer);
  })

  it('Failed because Openfisca server unreachable.', () => {
    const testId: string = "HVAC1_C_006";
    const rowData = dataExcel.getRowData(testId);

    cy.interceptPostcodeAPI({
      postcode: rowData["postcode"],
      state: PostcodeState.VALID
    })
    
    cy.visitAndExpectRegistry(urlPath);
    cy.fillForm(FormSelector.INITIAL_FORM_SELECTOR, rowData);
    cy.waitForNetworkIdle(1000);
    cy.nextOrCalculate(FormSelector.NEXT_SELECTOR);
    cy.intercept("POST", "**/calculate", {forceNetworkError: true});
    cy.fillForm(FormSelector.CALCULATE_FORM_SELECTOR, rowData);
    cy.nextOrCalculate(FormSelector.NEXT_SELECTOR);
    cy.get(ErrorSelector.CALCULATE_ERROR)
      .should("be.exist")
      .find("p")
      .and("have.text", ErrorMessage.UnreachableOpenfiscaServer);
  })

  it('Failed because required field are empty.', () => {
    const testId: string = "HVAC1_C_007";
    const rowData = dataExcel.getRowData(testId);
    const emptyFields = dataExcel.getEmptyFields(testId);

    cy.interceptPostcodeAPI({
      postcode: rowData["postcode"],
      state: PostcodeState.VALID
    })

    cy.visitAndExpectRegistry(urlPath);
    cy.fillForm(FormSelector.INITIAL_FORM_SELECTOR, rowData);
    cy.waitForNetworkIdle(1000);
    cy.nextOrCalculate(FormSelector.NEXT_SELECTOR);
    cy.fillForm(FormSelector.CALCULATE_FORM_SELECTOR, rowData);
    cy.nextOrCalculate(FormSelector.NEXT_SELECTOR);
    emptyFields.forEach((field) => {
      cy.get(`[data-ui-name="${field}"]`).should("be.exist");
    })
  })
})
