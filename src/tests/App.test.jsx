import React from "react";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import App from "../App.jsx";
import {
  getWithIslingtonData,
  getWithLambethData,
  getWithSouthwarkData,
} from "./mockServer/handlers/mockGetPostcodeLookup/mockGetPostcodeLookup.js";
import server from "./mockServer/server.js";
import { renderWithQueryClient } from "./testUtils";

describe("when the component renders", () => {
  it("displays a form field for postcode input", () => {
    const { getByLabelText } = renderWithQueryClient(<App />);
    expect(getByLabelText("Enter a postcode:")).toBeInTheDocument();
  });

  // TODO: it should not display an error message
});

describe.each([
  {
    origin: "Southwark",
    mockApi: getWithSouthwarkData,
    postcode: "SE1 7QD",
    result: "The postcode is in the service area",
  },
  {
    origin: "Lambeth",
    mockApi: getWithLambethData,
    postcode: "SE1 7QA",
    result: "The postcode is in the service area",
  },
  {
    origin: "outside the service area",
    mockApi: getWithIslingtonData,
    postcode: "N1 1AA",
    result: "Not in the service area",
  },
  {
    origin: "the allow list",
    mockApi: null,
    postcode: "SH24 1AA",
    result: "The postcode is in the service area",
  },
])(
  "when the user submits a postcode from $origin",
  ({ mockApi, postcode, result }) => {
    it("displays the result below", async () => {
      server.use(mockApi);
      const { getByLabelText, getByText, getByRole } = renderWithQueryClient(
        <App />,
      );

      const postcodeInput = getByLabelText("Enter a postcode:");
      await userEvent.type(postcodeInput, postcode);

      const submitButton = getByRole("button", { name: "Submit" });
      await userEvent.click(submitButton);

      await waitFor(() => expect(getByText(result)).toBeInTheDocument());
    });
  },
);
