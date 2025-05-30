
import React from "react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import App from "../App.js";
import {
  getWith404,
  getWith500,
} from "./mockServer/handlers/mockGetPostcodeLookup/mockGetPostcodeLookup.js";
import server from "./mockServer/server.js";
import {
  MALFORMED_POSTCODE,
  renderWithQueryClient,
  SOUTHWARK_POSTCODE,
} from "./testUtils.js";

describe("when the postcode does not exist", () => {
  it("displays an appropriate error message", async () => {
    server.use(getWith404);
    const { getByLabelText, findByText, getByRole } = renderWithQueryClient(
      <App />,
    );

    const postcodeInput = getByLabelText("Enter a postcode:");
    await userEvent.type(postcodeInput, "S1 1AX");

    const submitButton = getByRole("button", { name: "Submit" });
    await userEvent.click(submitButton);

    expect(await findByText(/Postcode not found/)).toBeInTheDocument();
  });
});

describe("when there is a server-side error", () => {
  it("displays an appropriate error message", async () => {
    server.use(getWith500);
    const { getByLabelText, findByText, getByRole } = renderWithQueryClient(
      <App />,
    );

    const postcodeInput = getByLabelText("Enter a postcode:");
    await userEvent.type(postcodeInput, SOUTHWARK_POSTCODE);

    const submitButton = getByRole("button", { name: "Submit" });
    await userEvent.click(submitButton);

    expect(await findByText(/Something went wrong/)).toBeInTheDocument();
  });
});

describe("when the user enters a malformed postcode", () => {
  it("displays an appropriate error message", async () => {
    const { getByLabelText, findByText, getByRole } = renderWithQueryClient(
      <App />,
    );

    const postcodeInput = getByLabelText("Enter a postcode:");
    await userEvent.type(postcodeInput, MALFORMED_POSTCODE);

    const submitButton = getByRole("button", { name: "Submit" });
    await userEvent.click(submitButton);

    expect(
      await findByText(/Please enter a valid UK postcode/),
    ).toBeInTheDocument();
  });
});
