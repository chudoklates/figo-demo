export const INVALID_CREDENTIALS = [
  {
    message: "INVALID_CREDENTIALS",
    extensions: {
      internal_code: "INVALID_CREDENTIALS",
      code: "AUTHENTICATION_ERROR",
    },
  },
];

export const TOKEN_MISSING_IN_REQUEST = [
  {
    message: "You did not provide authentication token.",
    extensions: {
      internal_code: "TOKEN_MISSING_IN_REQUEST",
      code: "AUTHENTICATION_ERROR",
    },
  },
];

export const NAME_ALREADY_IN_USE = [
  {
    message: "NAME_ALREADY_IN_USE",
    extensions: {
      internal_code: "NAME_ALREADY_IN_USE",
      code: "REQUEST_INPUT_ERROR",
    },
  },
];

export const INVALID_PARAMETERS = [
  {
    message: "INVALID_PARAMETERS",
    extensions: {
      internal_code: "INVALID_PARAMETERS",
      code: "REQUEST_INPUT_ERROR",
    },
  },
];
