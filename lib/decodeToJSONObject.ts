/**
 * Decodes a base64 encoded string and returns the corresponding JSON
 * object, or an empty object if decoding fails.
 * @param encodedValue A value encoded in Base64 format.
 */
const decodeToJSONObject = (encodedValue: string) => {
  try {
    return JSON.parse(atob(encodedValue));
  } catch (err) {
    console.warn(`Failed to decode: ${err}`);
    return {};
  }
};

export default decodeToJSONObject;
