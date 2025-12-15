enum FormSelector {
  INITIAL_FORM_SELECTOR = '[data-ui-name="initial-form"]',
  CALCULATE_FORM_SELECTOR = '[data-ui-name="calculate-form"]',
  USER_TYPE_SELECTOR = '[data-ui-name="user-type"]',
  NEXT_SELECTOR = '[data-ui-name="next"]',
  USER_TYPE = '[data-ui-name="user-type"]',
  POSTCODE = '[data-ui-name="postcode"]',
  BRAND = '[data-ui-name="brand"]',
  MODEL = '[data-ui-name="model"]'
}

enum ResultSelector {
  ESC_CERTIFICATE = "esc",
  PRC_CERTIFICATE = "prc",
  ENERGY_SAVING = "aes",
  PEAK_DEMAND_REDUCTION = "apdr"
}

enum ErrorSelector {
  POSTCODE_INVALID = '[data-ui-name="error-postcode"]',
  PRODUCT_REGISTRY_API_ERROR = '[data-ui-name="error-data-registry"]',
  CALCULATE_ERROR = '[data-ui-name="error-calculation"]'
}

const ELIGIBILITY_RESULT_TEXT_SELECTOR = '[data-ui-name="eligibility-result-text"]'

enum EligibilityResultText {
  ELIGIBLE = "Based on the information you have provided you have met the activity eligibility requirements.",
  INELIGIBLE = "Based on the information you have provided you have NOT met the activity eligibility requirements."
}

enum ErrorMessage {
  InvalidPostcode = "The postcode is not valid in NSW",
  UnreachableProductRegistryServer = "Unable to load data from the product registry. Please try again later.",
  UnreachableOpenfiscaServer = "We are experiencing technical difficulties right now, please try again later."
}

enum PostcodeState {
  VALID = "NSW",
  INVALID = "VIC"
}


export {
  FormSelector,
  ResultSelector,
  EligibilityResultText,
  ErrorSelector,
  PostcodeState,
  ErrorMessage,
  ELIGIBILITY_RESULT_TEXT_SELECTOR
}
