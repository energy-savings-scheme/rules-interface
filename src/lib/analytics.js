import moment from 'moment'

class FormAnalytics {
  constructor(event) {
    this.event = event
    this.values = {}
  }

  updateData(values) {
    Object.assign(this.values, values)
  }
}

const estimatorFormAnalytics = new FormAnalytics('SafeguardEstimator')
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
}

export function updateSegmentCaptureAnalytics(userType) {
  updateEstimatorFormAnalytics({
    sf_userType: userType
  })
}

export function submitEstimatorFormAnalytics() {
  window.dataLayer = window.dataLayer || [];
  const submittedData = {
    ...estimatorFormAnalytics.values,
    event: estimatorFormAnalytics.event,
    submittedAt: moment().utc().format()
  }
  window.dataLayer.push(submittedData);
  console.log(`Estimator form analytics: ${JSON.stringify(submittedData)}`)
}

export function submitFeedbackFormAnalytics(isHelpful) {
  window.dataLayer = window.dataLayer || [];
  const submittedData = {
    ...feedbackFormAnalytics.values,
    event: feedbackFormAnalytics.event,
    sf_isHelpful: isHelpful,
    submittedAt: moment().utc().format()
  }
  window.dataLayer.push(submittedData);
  console.log(`Feedback form analytics: ${JSON.stringify(submittedData)}`)
}
