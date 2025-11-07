import moment from 'moment';
import RegistryApi from 'services/registry_api';


class Safeguard {
  measurementId = 'G-8DV3J4W84B'
  constructor() {
  }

  gtag() {
    return window.dataLayer.push(arguments);
  }

  async getGTMValue(measurementId, propName) {
    return new Promise((resolve) => {
      this.gtag('get', measurementId, propName, (v) => resolve(v || null))
    });
  }
  async getGTMClientId() {
    return this.getGTMValue(this.measurementId, 'client_id');
  }
  async getGTMSessionId() {
    return this.getGTMValue(this.measurementId, 'session_id');
  }
}

const safeguard = new Safeguard();


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

export async function submitEstimatorFormAnalytics() {
  try {
    await RegistryApi.sendToGoogleAnalytics({
      event: estimatorFormAnalytics.event,
      client_id: await safeguard.getGTMClientId(),
      params: {
        ...estimatorFormAnalytics.values,
        session_id: await safeguard.getGTMSessionId(),
        submittedAt: moment().utc().format()
      }
    })
  } catch(err) {
    console.log(err.data.error)
  }
}

export async function submitFeedbackFormAnalytics(isHelpful) {
  try {
    await RegistryApi.sendToGoogleAnalytics({
      event: feedbackFormAnalytics.event,
      client_id: await safeguard.getGTMClientId(),
      params: {
        ...feedbackFormAnalytics.values,
        session_id: await safeguard.getGTMSessionId(),
        sf_isHelpful: isHelpful,
        submittedAt: moment().utc().format()
      }
    })
  } catch (err) {
    console.log(err.data.error)
  }
}
