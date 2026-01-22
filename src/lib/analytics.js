import moment from 'moment';
import RegistryApi from 'services/registry_api';
import { getCookie } from 'lib/helper';

class FormAnalytics {
  constructor(event) {
    this.event = event;
    this.values = {};
  }

  updateData(values) {
    Object.assign(this.values, values);
  }
}

const estimatorFormAnalytics = new FormAnalytics('SafeguardSubmission');
const feedbackFormAnalytics = new FormAnalytics('SafeguardFeedback');

export function updateEstimatorFormAnalytics(values) {
  estimatorFormAnalytics.updateData(values);
  return estimatorFormAnalytics.values;
}

export function updateFeedbackFormAnalytics(values) {
  feedbackFormAnalytics.updateData(values);
  return feedbackFormAnalytics.values;
}

export function updateSearchCaptureAnalytics(postcode, brand, model) {
  updateEstimatorFormAnalytics({
    sf_postcode: postcode,
    sf_brand: brand,
    sf_model: model,
  });
  updateFeedbackFormAnalytics({
    sf_postcode: postcode,
    sf_brand: brand,
    sf_model: model,
  });
}

export function updateSegmentCaptureAnalytics(userType) {
  updateEstimatorFormAnalytics({
    sf_userType: userType,
  });
  updateFeedbackFormAnalytics({
    sf_userType: userType,
  });
}

export function updatePostCodeAnalytics(postcode) {
  updateEstimatorFormAnalytics({
    sf_postcode: postcode,
  });
  updateFeedbackFormAnalytics({
    sf_postcode: postcode,
  });
}

export function clearSearchCaptureAnalytics() {
  delete estimatorFormAnalytics.values.sf_postcode;
  delete estimatorFormAnalytics.values.sf_brand;
  delete estimatorFormAnalytics.values.sf_model;

  delete feedbackFormAnalytics.values.sf_postcode;
  delete feedbackFormAnalytics.values.sf_brand;
  delete feedbackFormAnalytics.values.sf_model;
}

function analyticIsDisabled() {
  let isDisabled = false;
  const cookie = getCookie('analyticDisabled');
  if (cookie && cookie == 'true') {
    isDisabled = true;
  }

  return isDisabled;
}

export function submitEstimatorFormAnalytics() {
  if (analyticIsDisabled()) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  const submittedData = {
    ...estimatorFormAnalytics.values,
    event: estimatorFormAnalytics.event,
    submittedAt: moment().utc().format(),
  };
  window.dataLayer.push(submittedData);
  console.log(`Estimator form analytics: ${JSON.stringify(submittedData)}`);
}

export function submitFeedbackFormAnalytics(isHelpful) {
  if (analyticIsDisabled()) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  const submittedData = {
    ...feedbackFormAnalytics.values,
    event: feedbackFormAnalytics.event,
    sf_isHelpful: isHelpful,
    submittedAt: moment().utc().format(),
  };
  window.dataLayer.push(submittedData);
  console.log(`Feedback form analytics: ${JSON.stringify(submittedData)}`);
}
