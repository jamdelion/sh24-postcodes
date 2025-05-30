import { http, HttpResponse } from "msw";
import { POSTCODE_LOOKUP_BASE_URL } from "../../../../api/useQueryPostcodeLookup";
import {
  mockIslingtonResponse,
  notFoundResponse,
  validLambethResponse,
  validSouthwarkResponse,
} from "./mockResponses";

export const getWithSouthwarkData = http.get(
  `${POSTCODE_LOOKUP_BASE_URL}/SE1%207QD`,
  () => {
    return HttpResponse.json(validSouthwarkResponse);
  },
);

export const getWithLambethData = http.get(
  `${POSTCODE_LOOKUP_BASE_URL}/SE1%207QA`,
  () => {
    return HttpResponse.json(validLambethResponse);
  },
);

export const getWithIslingtonData = http.get(
  `${POSTCODE_LOOKUP_BASE_URL}/N1%201AA`,
  () => {
    return HttpResponse.json(mockIslingtonResponse);
  },
);

export const getWith404 = http.get(
  `${POSTCODE_LOOKUP_BASE_URL}/S1%201AX`,
  () => {
    return HttpResponse.json(notFoundResponse, { status: 404 });
  },
);

// TODO: get with server-side error
