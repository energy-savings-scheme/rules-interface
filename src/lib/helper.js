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

export { formatNumber, focusElement, getCookie, getTodayDate };
