const VALID_POSTCODE_INPUT_REGEX = /^([a-z0-9]\s*){5,8}$/i;

export const isValidPostcode = (postcode: string | undefined) =>
  Boolean(postcode && VALID_POSTCODE_INPUT_REGEX.test(postcode.trim()));
