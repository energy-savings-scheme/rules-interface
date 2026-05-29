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

function selectAirConditionerType(productType, productClass) {
  const pType = productType ? productType.trim().toLowerCase() : '';
  const pClass = productClass ? productClass.trim().toLowerCase() : '';

  const DUCTED = 'ducted';
  const NON_DUCTED = 'non ducted';
  const SINGLE_SPLIT = 'single split';
  const MULTI_SPLIT = 'multi split';
  const UNITARY = 'unitary';

  const productTypeByProductClass = {
    'class 5': UNITARY,
    'class 6': UNITARY,
    'class 7': UNITARY,
    'class 24': UNITARY,
    'class 8': SINGLE_SPLIT,
    'class 9': SINGLE_SPLIT,
    'class 10': SINGLE_SPLIT,
    'class 11': SINGLE_SPLIT,
    'class 12': SINGLE_SPLIT,
    'class 25': SINGLE_SPLIT,
    'class 18': MULTI_SPLIT,
    'class 19': MULTI_SPLIT,
    'class 20': MULTI_SPLIT,
    'class 21': MULTI_SPLIT,
    'class 27': MULTI_SPLIT,
  }

  const mapAirConditionerType = {
    [DUCTED]: {
      [SINGLE_SPLIT]: AC_DUCTED_SINGLE_SPLIT_SYSTEM,
      [MULTI_SPLIT]: AC_DUCTED_MULTI_SPLIT_SYSTEM,
      [UNITARY]: AC_DUCTED_UNITARY_SYSTEM,
    },
    [NON_DUCTED]: {
      [SINGLE_SPLIT]: AC_NON_DUCTED_SINGLE_SPLIT_SYSTEM,
      [MULTI_SPLIT]: AC_NON_DUCTED_MULTI_SPLIT_SYSTEM,
      [UNITARY]: AC_NON_DUCTED_UNITARY_SYSTEM,
    }
  }

  if (mapAirConditionerType[pType]) {
    const typeByClass = productTypeByProductClass[pClass];
    return mapAirConditionerType[pType][typeByClass] || '';
  }

  return '';
}

export { 
  formatNumber, 
  focusElement, 
  getCookie, 
  getTodayDate, 
  reOrderAirConditionerTypes,
  selectAirConditionerType
};
