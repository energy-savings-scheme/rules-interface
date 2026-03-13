import { FormSelector, ResultSelector, PostcodeState, URLPath } from 'cypress/enum';

import dataFixtures from 'cypress/fixtures/certificate/HVAC2_F4_C.json';

describe('Calculate HVAC2 ESC and PRC certificate.', () => {
  const urlPath: string = URLPath.HVAC2_F4_C;
  const resultSelector = [
    ResultSelector.ESC_CERTIFICATE_SELECTOR,
    ResultSelector.PRC_CERTIFICATE_SELECTOR,
    ResultSelector.ENERGY_SAVING_SELECTOR,
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
        interceptPostcodeAPI: {
          postcode: rowData['postcode'],
          state: PostcodeState.NSW,
        },
      });
    });
  });
});
