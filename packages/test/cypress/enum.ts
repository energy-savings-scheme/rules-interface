enum FormSelector {
  INITIAL_FORM_SELECTOR = '[data-ui-name="initial-form"]',
  CALCULATE_FORM_SELECTOR = '[data-ui-name="calculate-form"]',
  USER_TYPE_SELECTOR = '[data-ui-name="user-type"]',
  NEXT_SELECTOR = '[data-ui-name="next"]',
  POSTCODE_SELECTOR = '[data-ui-name="postcode"]',
  BRAND_SELECTOR = '[data-ui-name="brand"]',
  MODEL_SELECTOR = '[data-ui-name="model"]',
  RECALCULATE_SELECTOR = '[data-ui-name="recalculate"]',
}

enum ResultSelector {
  ESC_CERTIFICATE_SELECTOR = 'esc',
  PRC_CERTIFICATE_SELECTOR = 'prc',
  ENERGY_SAVING_SELECTOR = 'aes',
  PEAK_DEMAND_REDUCTION_SELECTOR = 'apdr',
  ELIGIBILITY_RESULT_TEXT_SELECTOR = '[data-ui-name="eligibility-result-text"]',
}

enum ErrorSelector {
  POSTCODE_INVALID = '[data-ui-name="error-postcode"]',
  PRODUCT_REGISTRY_API_ERROR = '[data-ui-name="error-data-registry"]',
  CALCULATE_ERROR = '[data-ui-name="error-calculation"]',
}

enum EligibilityResultText {
  CORE_ELIGIBLE = 'Based on the information you have provided you have met the core eligibility requirements.',
  CORE_INELIGIBLE = 'Based on the information you have provided you have NOT met the core eligibility requirements.',
  ELIGIBLE = 'Based on the information you have provided you have met the activity eligibility requirements.',
  INELIGIBLE = 'Based on the information you have provided you have NOT met the activity eligibility requirements.',
}

enum ErrorMessage {
  InvalidPostcode = 'The postcode is not valid in NSW',
  UnreachableProductRegistryServer = 'Unable to load data from the product registry. Please try again later.',
  UnreachableOpenfiscaServer = 'We are experiencing technical difficulties right now, please try again later.',
}

enum PostcodeState {
  NSW = 'NSW',
  VIC = 'VIC',
}

enum URLPath {
  HVAC1_D16_C = '#/residential-ac-estimator',
  SYS2_D5_C = '#/residential-pool-pump-certificates',
  D17_C = '#/electric-heat-pumps-estimator',
  D18_C = '#/residential-solar-water-heater-estimator',
  D19_C = '#/gas-heat-pumps-estimator',
  D20_C = '#/residential-gas-replacement-solar-water-heater-estimator',
  C1_C = '#/residential-refrigerators-estimator',
  BESS2_C = '#/residential-solar-battery-demand-response-certificates',
  HVAC2_F4_C = '#/commercial-ac-estimator',
  F16_E_C = '#/commercial-electric-to-heat-pump-water-heater-certificates',
  F16_G_C = '#/commercial-gas-to-heat-pump-water-heater-certificates',
  F17_C = '#/commercial-new-heat-pump-water-heater-certificates',
  RF2_F1_2_C = '#/refrigerated-cabinet-estimator',
  F7_C = '#/commercial-motors-estimator',
  CORE_E = '#/core-eligibility',
  HVAC1_D16_E = '#/residential-ac-activity-requirements',
  SYS2_D5_E = '#/residential-pool-pump-eligibility',
  C1_E = '#/residential-refrigeration-activity-requirements',
  BESS2_E = '#/residential-solar-battery-demand-response-eligibility',
  D17_E = '#/electric-residential-heat-pump-activity-requirements',
  D18_E = '#/residential-solar-water-heater-activity-requirements',
  D19_E = '#/gas-residential-heat-pump-activity-requirements',
  D20_E = '#/residential-solar-gas-water-heater-activity-requirements',
  HVAC2_F4_E = '#/commercial-ac-activity-requirements',
  F16_E_E = '#/commercial-electric-to-heat-pump-water-heater-eligibility',
  F16_G_E = '#/commercial-gas-to-heat-pump-water-heater-eligibility',
  F17_E = '#/commercial-new-heat-pump-water-heater-eligibility',
  RF2_F1_2_E = '#/refrigerated-cabinet-activity-requirements',
  F7_E = '#/commercial-motors-activity-requirements',
}

export {
  FormSelector,
  ResultSelector,
  EligibilityResultText,
  ErrorSelector,
  PostcodeState,
  ErrorMessage,
  URLPath,
};
