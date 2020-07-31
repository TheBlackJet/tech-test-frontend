/* getProp utility function equivalence to lodash _.get(...) to check the existence of prop, return data of prop if data presence otherwise return default value
* @param {Object} object
* @param {String|Array} keys
* @param {any} defaultValue
*/
export const getProp = (object, keys, defaultValue) => {
    let temporaryKeys = Array.isArray(keys) ? [...keys] : [...keys.split('.')];
    object = object[temporaryKeys[0]];
    if (object && temporaryKeys.length > 1) {
        return getProp(object, temporaryKeys.slice(1), defaultValue);
    }
    return object === undefined ? defaultValue : object;
}


export const convertUTCTimeToLocaleString = (utcTime) => new Date(utcTime).toLocaleString();


export const isEmpty = (value) => {
    const type = typeof val;
    if ((value !== null && type === 'object') || type === 'function') {
        const properties = Object.keys(value);
        if (properties.length === 0 || properties.size === 0) {
            return true;
        }
    }
    return !value;
}
