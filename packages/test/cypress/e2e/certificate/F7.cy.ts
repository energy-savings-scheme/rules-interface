import {
  FormSelector,
  ResultSelector,
  PostcodeState,
  URLPath,
} from 'cypress/enum';

import dataFixtures from 'cypress/fixtures/certificate/F7_C.json';

describe('Calculate F7 ESC certificate.', () => {
  const urlPath: string = URLPath.F7_C;
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
          postcode: rowData['F7_PDRSAug24_PDRS__postcode'],
          state: PostcodeState.NSW,
        },
      });
    });
  });
});
