import {
  AC_DUCTED_SINGLE_SPLIT_SYSTEM,
  AC_DUCTED_MULTI_SPLIT_SYSTEM,
  AC_DUCTED_UNITARY_SYSTEM,
  AC_NON_DUCTED_SINGLE_SPLIT_SYSTEM,
  AC_NON_DUCTED_MULTI_SPLIT_SYSTEM,
  AC_NON_DUCTED_UNITARY_SYSTEM,
} from 'constant/product';

/**
 * Format a number with commas for readability, and two decimal places.
 *
 * @param {number} num
 * @return {string}
 */
function formatNumber(num) {
  return num.toLocaleString('en-AU', { maximumFractionDigits: 2 });
}

/**
 * Focus to a specific element by id
 *
 * @param {string} id
 */
function focusElement(id) {
  const element = document.getElementById(id);
  if (element) {
    element.focus();
  }
}

/**
 *
 * @param {string} name - The cookie name
 * @returns {string|null}
 */
function getCookie(name) {
  const cookie = document.cookie.split('; ').find((c) => c.startsWith(`${name}=`));

  if (cookie) {
    return cookie.split('=')[1];
  }

  return null;
}

/**
 * Get today's date in YYYY-MM-DD format
 *
 * @return {string}
 */
function getTodayDate() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

/**
 * Reorders air conditioner types based on a predefined order
 * @param {Object} possibleValues 
 * @returns {Object}
 */
function reOrderAirConditionerTypes(possibleValues) {
  const desiredOrder = [
    AC_DUCTED_SINGLE_SPLIT_SYSTEM,
    AC_DUCTED_MULTI_SPLIT_SYSTEM,
    AC_DUCTED_UNITARY_SYSTEM,
    AC_NON_DUCTED_SINGLE_SPLIT_SYSTEM,
    AC_NON_DUCTED_MULTI_SPLIT_SYSTEM,
    AC_NON_DUCTED_UNITARY_SYSTEM,
  ];

  // Reduce the desired order array to an object that maintains the order of keys as specified in desiredOrder
  return desiredOrder.reduce((acc, key) => {
    if (key in possibleValues) {
      acc[key] = possibleValues[key];
    }
    return acc;
  }, {});
}

function selectAirConditionerType(productType, installationType) {
  const pType = productType ? productType.trim().toLowerCase() : '';
  const iType = installationType ? installationType.trim().toLowerCase() : '';
    
  const unitaryTypes = ['portable', 'unitary double duct wall mounted', 'window wall'];
  const multiSplitTypes = ['fixed', 'vrf'];

  switch (true) {
    // --- Unitary Systems ---
    case (pType === 'ducted' && unitaryTypes.includes(iType)):
      return AC_DUCTED_UNITARY_SYSTEM;

    case (pType === 'non ducted' && unitaryTypes.includes(iType)):
      return AC_NON_DUCTED_UNITARY_SYSTEM;


    // --- Single Split Systems ---
    case (pType === 'ducted' && iType === 'single split system'):
      return AC_DUCTED_SINGLE_SPLIT_SYSTEM;

    case (pType === 'non ducted' && iType === 'single split system'):
      return AC_NON_DUCTED_SINGLE_SPLIT_SYSTEM;


    // --- Multi-Split Systems ---
    case (pType === 'ducted' && multiSplitTypes.includes(iType)):
      return AC_DUCTED_MULTI_SPLIT_SYSTEM;

    case (pType === 'non ducted' && multiSplitTypes.includes(iType)):
      return AC_NON_DUCTED_MULTI_SPLIT_SYSTEM;


    // --- Fallback ---
    default:
      return '';
  }
}

export { 
  formatNumber, 
  focusElement, 
  getCookie, 
  getTodayDate, 
  reOrderAirConditionerTypes,
  selectAirConditionerType
};
