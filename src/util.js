// this seems not working, see https://stackoverflow.com/questions/43183450/jsdoc-typedef-in-a-separate-file
// https://github.com/jsdoc/jsdoc/issues/1537
/// <reference path="./typedefs.js" />
/**
 * @typedef {import('./typedefs.js').BasicInfo} BasicInfo
 */

// https://stackoverflow.com/questions/14603205/how-to-convert-hex-string-into-a-bytes-array-and-a-bytes-array-in-the-hex-strin
/**
 * convert hex string to Uint8Array
 * @param {string} s the hex string
 * 
 * @return {Uint8Array} the Uint8Array of the hex string
 */
function h2b(s) {
  return new Uint8Array([...s.matchAll(/../g)].map(m => parseInt(m[0], 16)));
}

/**
 * convert Uint8Array to hex string
 * @param {Uint8Array} b the Uint8Array for converting
 * @returns {string} the hex string of the Uint8Array
 */
// eslint-disable-next-line no-unused-vars
function b2h(b) {
  return [...b].map(n => n.toString(16)).join("");
}

/**
 * Sign the data with the HMAC-SHA1 algorithm
 * The data need to sorted by key in ascending order and use the format key1=value1&key2=value2&...
 * @param {BasicInfo} data - the data to sign
 * @param {string} [hmacSha1Key] - the key of the HMAC-SHA1 algorithm
 * @param {'hexString'|'textString'} [keyFormat='hexString'] - the format of the key of HMAC-SHA1, support 'hexString' or 'textString'
 * 
 * @returns {Promise<string>} the sign of the data in lowercase hex string
 */
export async function sign(data, hmacSha1Key, keyFormat = 'hexString') {
  // check the inputs
  if (!data) {
    throw new TypeError('data should be a nonempty object');
  }
  if (typeof hmacSha1Key !== 'string') {
    throw new TypeError('hmacSha1Key should be a string');
  }
  const dataStr = Array.from(Object.entries(data))
    .filter(([, value]) => ![null, undefined, ''].includes(value))
    .sort(([key1], [key2]) => key1.localeCompare(key2))
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  // use web crypto to sign the data
  const encoder = new TextEncoder();
  let encodedKey = h2b(hmacSha1Key);
  if (keyFormat === 'textString') {
    encodedKey = encoder.encode(hmacSha1Key);
  }
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey
   */
  const key = await crypto.subtle.importKey('raw', encodedKey, { name: 'HMAC', hash: 'SHA-1' }, true, ['sign', 'verify'])
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(dataStr))
  const hexString = Array.from(new Uint8Array(signature)).map(byte => byte.toString(16).padStart(2, '0')).join('')
  // console.info(data, dataStr, hexString)
  return hexString;
}

/**
 * normalize the data for signing, add the timestamp in yyyyMMddhhmmss format 
 * @param {BasicInfo} data - the data to sign
 * 
 * @returns {BasicInfo} the data with the timestamp
 */
function normalizeData(data) {
  // check the inputs
  if (!data) {
    throw new TypeError('data should be an object');
  }
  // add the timestamp in yyyyMMddhhmmss format, use Asia/Shanghai timezone
  const timestamp = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/[^0-9]/g, '');
  data['timestamp'] = timestamp;
  if (!data['sign_method']) {
    data['sign_method'] = 'HMAC';
  }
  return data;
}

/**
 * Generate the data with the signature
 * 
 * @param {BasicInfo} data - the data to sign
 * @param {string} [hmacSha1Key] - the key of the HMAC algorithm
 * 
 * @returns {Promise<BasicInfo>} the data with the timestamp
 */
export async function signData(data, hmacSha1Key) {
  // check the inputs
  if (!data) {
    throw new TypeError('data should be an object');
  }
  // remove the item which value is undefined, null, or empty string
  const cleanedData = Object.fromEntries(Object.entries(data).filter(([, value]) => ![null, undefined, ''].includes(value)));
  // normalize the data
  const finalData = normalizeData(cleanedData);
  // sign the data
  const signature = await sign(finalData, hmacSha1Key, 'textString');
  // add the signature
  finalData['sign'] = signature;
  return finalData;
}