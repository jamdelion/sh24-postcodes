const VALID_POSTCODE_INPUT_REGEX = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i

export const isValidPostcode = (postcode: string | undefined) =>
  Boolean(postcode && VALID_POSTCODE_INPUT_REGEX.test(postcode.trim()));
