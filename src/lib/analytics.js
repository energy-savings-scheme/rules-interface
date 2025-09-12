import moment from 'moment'
import RegistryApi from 'services/registry_api'

class FormAnalytics {
  constructor(event) {
    this.event = event
    this.values = {}
  }

  updateData(values) {
    Object.assign(this.values, values)
  }
}

function getClientID() {
  const cookieMatch = document.cookie.match(/_ga=([^;]*)/);
  if (cookieMatch && cookieMatch[1]) {
    const raw = cookieMatch[1];
    const parts = raw.split('.');
    if (parts.length >= 2) {
      // The last two parts are the client ID: a unique ID and a timestamp
      return parts[2] + '.' + parts[3];
    }
  }
  return null; 
}

const estimatorFormAnalytics = new FormAnalytics('SafeguardSubmission')
const feedbackFormAnalytics = new FormAnalytics('SafeguardFeedback')

export function updateEstimatorFormAnalytics(values) {
  estimatorFormAnalytics.updateData(values)
  return estimatorFormAnalytics.values
}

export function updateFeedbackFormAnalytics(values) {
  feedbackFormAnalytics.updateData(values)
  return feedbackFormAnalytics.values
}

export function updateSearchCaptureAnalytics(postcode, brand, model) {
  updateEstimatorFormAnalytics({
    sf_postcode: postcode,
    sf_brand: brand,
    sf_model: model
  })
  updateFeedbackFormAnalytics({
    sf_postcode: postcode,
    sf_brand: brand,
    sf_model: model
  })
}

export function updateSegmentCaptureAnalytics(userType) {
  updateEstimatorFormAnalytics({
    sf_userType: userType
  })
  updateFeedbackFormAnalytics({
    sf_userType: userType
  })
}

export function updatePostCodeAnalytics(postcode) {
  updateEstimatorFormAnalytics({
    sf_postcode: postcode
  })
  updateFeedbackFormAnalytics({
    sf_postcode: postcode
  })
}

export function clearSearchCaptureAnalytics() {
  delete estimatorFormAnalytics.values.sf_postcode
  delete estimatorFormAnalytics.values.sf_brand
  delete estimatorFormAnalytics.values.sf_model

  delete feedbackFormAnalytics.values.sf_postcode
  delete feedbackFormAnalytics.values.sf_brand
  delete feedbackFormAnalytics.values.sf_model
}

export async function submitEstimatorFormAnalytics() {
  try {
    await RegistryApi.sendToGoogleAnalytics({
      client_id: getClientID(),
      event: estimatorFormAnalytics.event,
      params: {
        ...estimatorFormAnalytics.values,
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
      client_id: getClientID(),
      event: feedbackFormAnalytics.event,
      params: {
        ...feedbackFormAnalytics.values,
        sf_isHelpful: isHelpful,
        submittedAt: moment().utc().format()
      }
    })
  } catch (err) {
    console.log(err.data.error)
  }
}
