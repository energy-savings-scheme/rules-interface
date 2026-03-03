import { FormSelector, ResultSelector, PostcodeState, URLPath } from 'cypress/enum';

import dataFixtures from 'cypress/fixtures/certificate/BESS2_C.json';

describe('Calculate BESS2 PRC certificate.', () => {
  const urlPath: string = URLPath.BESS2_C;
  const resultSelector = [
    ResultSelector.PRC_CERTIFICATE_SELECTOR,
    ResultSelector.PEAK_DEMAND_REDUCTION_SELECTOR,
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
          postcode: rowData['BESS2_PDRSAug24_PDRS__postcode'],
          state: PostcodeState.NSW,
        },
      });
    });
  });
});
