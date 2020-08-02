/* getProp utility function equivalence to lodash _.get(...) to check the existence of prop, return data of prop if data presence otherwise return default value
* https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get
* @param {Object} object
* @param {String|Array} keys
* @param {any} defaultValue
*/
export const getProp = (obj, path, defaultValue = undefined) => {
    const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
}

/* get local time string
* @param {string} utcTime : time in UTC format
* @return {string} locale string time
*/
export const convertUTCTimeToDateString = (utcTime) => new Date(utcTime).toDateString();


/* check if array has element or null
* @param {array} array : input array
* @return {boolean} true if array empty or null
*/
export const isArrayEmpty = (array) => {
    return (!Array.isArray(array) || !array.length);
}