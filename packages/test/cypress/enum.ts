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
  HVAC1_C = '#/residential-ac-estimator',
  HVAC1_E = '#/residential-ac-activity-requirements',
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
