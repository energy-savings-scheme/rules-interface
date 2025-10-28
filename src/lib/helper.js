
/**
 * Format a number with commas for readability, and two decimal places.
 *
 * @param {number} num
 * @return {string}
 */
function formatNumber(num) {
  return num.toLocaleString('en-AU', {maximumFractionDigits:2});
}

/**
 * Focus to a specific element by id
 * 
 * @param {string} id
 */
function focusElement(id) {
  const element = document.getElementById(id)
  if (element) {
    element.focus();
  }
}

export { formatNumber, focusElement };
