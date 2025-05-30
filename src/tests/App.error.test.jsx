import React from "react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import App from "../App.js";
import { renderWithQueryClient } from "./testUtils.js";
import server from "./mockServer/server.js";
import { getWith404 } from "./mockServer/handlers/mockGetPostcodeLookup/mockGetPostcodeLookup.js";

describe("when the postcode does not exist", () => {
  it("displays an appropriate error message", async () => {
    server.use(getWith404)
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
