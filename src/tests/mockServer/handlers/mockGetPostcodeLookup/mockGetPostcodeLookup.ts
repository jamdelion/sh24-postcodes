import { http, HttpResponse } from "msw";
import { POSTCODE_LOOKUP_BASE_URL } from "../../../../api/useQueryPostcodeLookup";
import {
  mockIslingtonResponse,
  notFoundResponse,
  validLambethResponse,
  validSouthwarkResponse,
} from "./mockResponses";
import { ISLINGTON_POSTCODE, LAMBETH_POSTCODE, NON_EXISTING_POSTCODE, SOUTHWARK_POSTCODE } from "../../../testUtils";

export const getWithSouthwarkData = http.get(
  `${POSTCODE_LOOKUP_BASE_URL}/${encodeURIComponent(SOUTHWARK_POSTCODE)}`,
  () => {
    return HttpResponse.json(validSouthwarkResponse);
  },
);

export const getWithLambethData = http.get(
  `${POSTCODE_LOOKUP_BASE_URL}/${encodeURIComponent(LAMBETH_POSTCODE)}`,
  () => {
    return HttpResponse.json(validLambethResponse);
  },
);

export const getWithIslingtonData = http.get(
  `${POSTCODE_LOOKUP_BASE_URL}/${encodeURIComponent(ISLINGTON_POSTCODE)}`,
  () => {
    return HttpResponse.json(mockIslingtonResponse);
  },
);

export const getWith404 = http.get(
  `${POSTCODE_LOOKUP_BASE_URL}/${encodeURIComponent(NON_EXISTING_POSTCODE)}`,
  () => {
    return HttpResponse.json(notFoundResponse, { status: 404 });
  },
);

export const getWith500 = http.get(
  `${POSTCODE_LOOKUP_BASE_URL}/${encodeURIComponent(SOUTHWARK_POSTCODE)}`,
  () => {
    return HttpResponse.json(
      { status: 500, error: "Internal Server Error" },
      { status: 500 }
    );
  }
);

