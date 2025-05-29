import { http, HttpResponse } from "msw";
import { POSTCODE_LOOKUP_BASE_URL } from "../../../../api/useQueryPostcodeLookup";
import { validLambethResponse, validSouthwarkResponse } from "./mockResponses";

export const getWithValidSouthwarkData = http.get(
  `${POSTCODE_LOOKUP_BASE_URL}/SE1%207QD`,
  () => {
    return HttpResponse.json(validSouthwarkResponse);
  },
);

export const getWithValidLambethData = http.get(
  `${POSTCODE_LOOKUP_BASE_URL}/SE1%207QA`,
  () => {
    return HttpResponse.json(validLambethResponse);
  },
);

// TODO: get with server-side error, get with 404
