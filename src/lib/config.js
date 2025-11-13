let analyticsEnabled = true
if (process.env.REACT_APP_ANALYTICS_ENABLED) {
  analyticsEnabled = process.env.REACT_APP_ANALYTICS_ENABLED.toLowerCase() === 'true'
}

console.log(process.env)

const config = {
  djangoApiBaseUrl: process.env.REACT_APP_API_BASE_URL,
  openfiscaApiBaseUrl: process.env.REACT_APP_OPENFISCA_BASE_URL,
  productRegistryApiBaseUrl: process.env.REACT_APP_REGISTRY_API_BASE_URL,
  analyticIsEnabled: analyticsEnabled
}

export default config
