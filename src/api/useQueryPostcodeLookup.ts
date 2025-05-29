import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const POSTCODE_LOOKUP_BASE_URL = "https://api.postcodes.io/postcodes";

const POSTCODE_LOOKUP_QUERY_KEY = "POSTCODE_LOOKUP/GET";

const useQueryPostcodeLookup = (
  searchTerm: string,
  options?: Record<any, any>,
) => {
  const fetchPostcodeData = async (searchTerm: string) => {
    const url = `${POSTCODE_LOOKUP_BASE_URL}/${encodeURIComponent(searchTerm)}`;
    const response = await axios.get(url);
    return response.data;
  };

  return useQuery({
    queryKey: [POSTCODE_LOOKUP_QUERY_KEY, searchTerm],
    queryFn: () => fetchPostcodeData(searchTerm),
    ...options
    // staleTime: 1000 * 60 * 10, // cache for 10 minutes
  });
};

export default useQueryPostcodeLookup;

// options?: Readonly<
//     Omit<
//       UseQueryOptions<AddressesSearchResponse, RequestError>,
//       "queryKey" | "queryFn"
//     >
//   >
