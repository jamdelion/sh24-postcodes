import { http, HttpResponse } from "msw";
import { POSTCODE_LOOKUP_BASE_URL } from "../../../../api/useQueryPostcodeLookup";
import { validSouthwarkResponse } from "./mockResponses";

export const getWithValidData = http.get(
  `${POSTCODE_LOOKUP_BASE_URL}/SE1%207QD`,
  () => {
    return HttpResponse.json(validSouthwarkResponse);
  },
);

// TODO: get with server-side error, get with 404
