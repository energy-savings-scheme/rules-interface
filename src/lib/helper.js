
/**
 * Format a number with commas for readability, and two decimal places.
 *
 * @param {number} num
 * @return {string}
 */
function formatNumber(num) {
  return num.toLocaleString('en-AU', {maximumFractionDigits:2});
}

export { formatNumber };
