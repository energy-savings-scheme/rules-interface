import { PostcodeState } from "./enum";


export interface BaseInputFormType {
  id: string,
  uri: string,
  nextSelector: string
}

export interface FirstFormType extends BaseInputFormType {
  initialFormSelector: string;
  data: {[key: string]: any};
}

export interface CalculateFormInputType extends FirstFormType {
  calculateFormSelector: string;
  resultSelector: string[];
  interceptPostcodeAPI?: InterceptPostcodeAPIOptions
}

export interface CalculateEligibilityFormInputType extends BaseInputFormType {
  calculateFormSelector: string;
  data: {[key: string]: any};
  eligibilityResultText: string;
  ineligibleSelectors: string[];
}


export interface InterceptPostcodeAPIOptions {
  postcode: string,
  state: PostcodeState.VALID | PostcodeState.INVALID
}

export interface PostCodeResponseType {
  code: string,
  data: { [key: string]: { [key: string]: string } },
  message: string,
  status: string
}
