const pathToFilename = {
  'residential-small-business-air-conditioner-certificates': 'residential_ac_estimator.js',
  'residential-pool-pump-certificates': 'residential_pool_pump_certificates.js',
  'residential-refrigerators-estimator': 'residential_refrigerators_estimator.js',
  'residential-small-business-electric-to-heat-pump-water-heater-certificates': 'electric_heat_pumps_estimator.js',
  'residential-small-business-gas-to-heat-pump-water-heater-certificates': 'gas_heat_pumps_estimator.js',
  'residential-small-business-electric-to-solar-water-heater-certificates': 'residential_solar_water_heater_estimator.js',
  'residential-small-business-gas-to-solar-water-heater-certificates': 'residential_gas_replacement_solar_water_heater_estimator.js',
  'residential-solar-battery-demand-response-certificates': 'residential_solar_battery_demand_response_certificates.js',
  'commercial-air-conditioner-certificates': 'commercial_ac_estimator.js',
  'commercial-electric-to-heat-pump-water-heater-certificates': 'commercial_electric_to_heat_pump_water_heater_certificates.js',
  'commercial-gas-to-heat-pump-water-heater-certificates': 'commercial_gas_to_heat_pump_water_heater_certificates.js',
  'commercial-new-heat-pump-water-heater-certificates': 'commercial_new_heat_pump_water_heater_certificates.js',
  'commercial-refrigerated-cabinet-certificates': 'refrigerated_cabinet_estimator.js',
  'commercial-motors-certificates': 'commercial_motors_estimator.js',
  'core-eligibility': 'core_eligibility.js',
  'air-conditioner-eligibility': 'residential_ac_activity_requirements.js',
  'residential-pool-pump-eligibility': 'residential_pool_pump_eligibility.js',
  'residential-small-business-spare-refrigerator-freezer-eligibility': 'residential_refrigeration_activity_requirements.js',
  'residential-small-business-electric-to-heat-pump-water-heater-eligibility': 'electric_residential_heat_pump_activity_requirements.js',
  'residential-small-business-gas-to-heat-pump-water-heater-eligibility': 'gas_residential_heat_pump_activity_requirements.js',
  'residential-small-business-electric-to-solar-water-heater-eligibility': 'residential_solar_water_heater_activity_requirements.js',
  'residential-small-business-gas-to-solar-water-heater-eligibility': 'residential_solar_gas_water_heater_activity_requirements.js',
  'residential-solar-battery-demand-response-eligibility': 'residential_solar_battery_demand_response_eligibility.js',
  'commercial-air-conditioner-eligibility': 'commercial_ac_activity_requirements.js',
  'commercial-electric-to-heat-pump-water-heater-eligibility': 'commercial_electric_to_heat_pump_water_heater_eligibility.js',
  'commercial-gas-to-heat-pump-water-heater-eligibility': 'commercial_gas_to_heat_pump_water_heater_eligibility.js',
  'commercial-new-heat-pump-water-heater-eligibility': 'commercial_new_heat_pump_water_heater_eligibility.js',
  'commercial-refrigerated-cabinet-eligibility': 'refrigerated_cabinet_activity_requirements.js',
  'commercial-motors-eligibility': 'commercial_motors_activity_requirements.js'
}

function isStagingEnvironment() {
    const hostname = window.location.hostname;
    if (hostname.startsWith('staging.')) {
        return true;
    }

    return false;
}

function getScriptUrl() {
    const mapStorageUrl = {
        'staging': 'https://auesfgracessstgdev.z8.web.core.windows.net/dist/latest/files/',
        'prod': 'https://auesfgracessstgprd.blob.core.windows.net/estimator-v5/dist/latest/files/'
    }

    return mapStorageUrl[isStagingEnvironment() ? 'staging' : 'prod'];
}

function getFilenameFromPath() {
  let filename
  const fullPath = window.location.pathname
  if (fullPath) {
    const path = fullPath.split('/').at(-1)
    filename = pathToFilename[path]
  }

  return filename
}

function loadScript(url) {
  return new Promise((resolve, reject) => {
    // Create a new script element
    const script = document.createElement('script');

    // Generate a timestamp to use as a cache-busting query parameter
    const timestamp = new Date().getTime();

    // Append the timestamp to the URL
    const cacheBustingUrl = `${url}?t=${timestamp}`;
    
    // Set the script's source URL
    script.src = cacheBustingUrl;

    // Use async and defer for non-blocking loading
    script.async = true;
    script.defer = true;

    // Listen for the script to load successfully
    script.onload = () => {
      resolve(script);
    };

    // Listen for errors during script loading
    script.onerror = () => {
      // Clean up the script element on error
      script.remove();
      reject(new Error(`Failed to load script: ${cacheBustingUrl}`));
    };

    // Append the script element to the document's head
    document.querySelector('#ess-form').appendChild(script);
  });
}

/**
 * 
 * @param {string} filename
 */
function isValidFilename(filename) {
  const regex = /^[a-zA-Z_]+.js$/;
  return regex.test(filename);
}

function loadEstimator() {
  const filename = getFilenameFromPath();
  if (!isValidFilename(filename)) {
      throw new Error(`Invalid filename: ${filename}`);
  }
  let scriptUrl = `${getScriptUrl()}${filename}`;
  return loadScript(scriptUrl);
}

loadEstimator();
