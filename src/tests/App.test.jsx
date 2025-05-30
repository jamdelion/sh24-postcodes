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
import { ISLINGTON_POSTCODE, LAMBETH_POSTCODE, renderWithQueryClient, SOUTHWARK_POSTCODE, ALLOW_LIST_POSTCODE } from "./testUtils";

describe("when the component renders", () => {
  it("displays a form field for postcode input", () => {
    const { getByLabelText } = renderWithQueryClient(<App />);
    expect(getByLabelText("Enter a postcode:")).toBeInTheDocument();
  });
  it("should not display an error message", () => {
    const { queryByText } = renderWithQueryClient(<App />);
    expect(queryByText(/Postcode not found/)).not.toBeInTheDocument();
  });
});

describe.each([
  {
    origin: "Southwark",
    mockApi: getWithSouthwarkData,
    postcode: SOUTHWARK_POSTCODE,
    result: "The postcode is in the service area",
  },
  {
    origin: "Lambeth",
    mockApi: getWithLambethData,
    postcode: LAMBETH_POSTCODE,
    result: "The postcode is in the service area",
  },
  {
    origin: "outside the service area",
    mockApi: getWithIslingtonData,
    postcode: ISLINGTON_POSTCODE,
    result: "Not in the service area",
  },
  {
    origin: "the allow list",
    mockApi: null,
    postcode: ALLOW_LIST_POSTCODE,
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
