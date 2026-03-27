import { FormSelector, ResultSelector, PostcodeState, URLPath } from 'cypress/enum';

import dataFixtures from 'cypress/fixtures/certificate/C1_C.json';

describe('Calculate C1 ESC certificate.', () => {
  const urlPath: string = URLPath.C1_C;
  const resultSelector = [
    ResultSelector.ESC_CERTIFICATE_SELECTOR,
    ResultSelector.ENERGY_SAVING_SELECTOR,
  ];

  dataFixtures.forEach((rowData: Record<string, any>) => {
    it(`Calculate certificate test ID: ${rowData['tid']}`, () => {
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
          postcode: rowData['C1_PDRSAug24_PDRS__postcode'],
          state: PostcodeState.NSW,
        },
      });
    });
  });
});
