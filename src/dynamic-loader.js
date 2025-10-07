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

/**
 * 
 * @param {string} filename  
 */
function loadEstimator(filename) {
    if (!isValidFilename(filename)) {
        throw new Error(`Invalid filename: ${filename}`);
    }
    let scriptUrl = `${getScriptUrl()}${filename}`;
    return loadScript(scriptUrl);
}

// in this case filename declaration is in Drupal Page.
loadEstimator(filename);
