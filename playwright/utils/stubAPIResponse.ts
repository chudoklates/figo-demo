import {
  INVALID_CREDENTIALS,
  INVALID_PARAMETERS,
  NAME_ALREADY_IN_USE,
  TOKEN_MISSING_IN_REQUEST,
} from "../fixtures/errors";
import { participant, user } from "../fixtures/user";

const stubAPIResponse: Record<
  string,
  (
    variables: any,
    context: { token: string | null | undefined }
  ) => { data: any; errors: any[]; status?: number }
> = {
  loginParticipant(variables, _context) {
    if (
      variables.email !== "playwright@test.com" ||
      variables.password !== "1234567890!Aa"
    ) {
      return {
        data: null,
        errors: INVALID_CREDENTIALS,
      };
    }

    return {
      data: {
        loginParticipant: {
          token: "xyz-testtoken",
          __typename: "Session",
        },
      },
      errors: [],
    };
  },
  me(_variables, context) {
    if (!context.token) {
      return {
        data: null,
        errors: TOKEN_MISSING_IN_REQUEST,
        status: 401,
      };
    }

    return {
      data: {
        me: user,
      },
      errors: [],
    };
  },
  myParticipants(_variables, context) {
    if (!context.token) {
      return {
        data: null,
        errors: TOKEN_MISSING_IN_REQUEST,
        status: 401,
      };
    }

    return {
      data: {
        myParticipants: [participant],
      },
      errors: [],
    };
  },
  logoutMe(_variables, _context) {
    return {
      data: {
        logoutMe: true,
      },
      errors: [],
    };
  },
  registerParticipant(variables, _context) {
    if (variables.email === "email@taken.com") {
      return {
        data: null,
        errors: NAME_ALREADY_IN_USE,
      };
    }

    return {
      data: {
        registerParticipant: true,
      },
      errors: [],
    };
  },
  verifyParticipant(variables, _context) {
    if (variables.token === "invalid-token") {
      return {
        data: null,
        errors: INVALID_PARAMETERS,
      };
    }

    return {
      data: {
        verifyPassword: true,
      },
      errors: [],
    };
  },
};

export default stubAPIResponse;
