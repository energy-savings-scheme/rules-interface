import moment from 'moment'

class FormAnalytics {
  constructor(event) {
    this.event = event
    this.values = {}
  }

  updateData(values) {
    this.values = values
  }
}

const ESTIMATOR_FORM_ANALYTICS = new FormAnalytics('SafeguardEstimator')
const FEEDBACK_FORM_ANALYTICS = new FormAnalytics('SafeguardFeedback')

export function updateEstimatorFormAnalytics(values) {
  ESTIMATOR_FORM_ANALYTICS.updateData(values)
  return ESTIMATOR_FORM_ANALYTICS.values
}

export function updateFeedbackFormAnalytics(values) {
  FEEDBACK_FORM_ANALYTICS.updateData(values)
  return FEEDBACK_FORM_ANALYTICS.values
}

export function submitEstimatorFormAnalytics() {
  window.dataLayer = window.dataLayer || [];
  const submittedData = {
    ...ESTIMATOR_FORM_ANALYTICS.values,
    event: ESTIMATOR_FORM_ANALYTICS.event,
    submittedAt: moment().utc().format()
  }
  window.dataLayer.push(submittedData);
  console.log(`Estimator form analytics: ${JSON.stringify(submittedData)}`)
}

export function submitFeedbackFormAnalytics(isHelpful) {
  window.dataLayer = window.dataLayer || [];
  const submittedData = {
    ...FEEDBACK_FORM_ANALYTICS.values,
    event: FEEDBACK_FORM_ANALYTICS.event,
    isHelpful: isHelpful,
    submittedAt: moment().utc().format()
  }
  window.dataLayer.push(submittedData);
  console.log(`Feedback form analytics: ${JSON.stringify(submittedData)}`)
}