import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { type ReactElement } from "react";

export const renderWithQueryClient = (ui: ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

export const SOUTHWARK_POSTCODE = "SE1 7QD"

export const LAMBETH_POSTCODE = "SE1 7QA"

export const ISLINGTON_POSTCODE = "N1 1AA"

export const NON_EXISTING_POSTCODE = "S1 1AX"

export const ALLOW_LIST_POSTCODE = "SH24 1AA"

export const MALFORMED_POSTCODE = "12 3HZ"