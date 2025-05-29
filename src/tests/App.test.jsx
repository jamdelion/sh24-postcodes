import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { expect } from "vitest";
import App from "../App.jsx";
import { getWithValidData } from "./mockServer/handlers/mockGetPostcodeLookup/mockGetPostcodeLookup.js";
import server from "./mockServer/server.js";
import { renderWithQueryClient } from "./testUtils";
import userEvent from '@testing-library/user-event'

describe("when the component renders", () => {
  it("displays a form field for postcode input", () => {
    const { getByLabelText } = renderWithQueryClient(<App />);
    expect(getByLabelText("Enter a postcode:")).toBeInTheDocument();
  });

  // TODO: it should not display an error message
});

describe("when the user submits a postcode", () => {
  it("displays the result below", async () => {
    server.use(getWithValidData);
    const { getByLabelText, getByText, getByRole } = renderWithQueryClient(<App />);

    const postcodeInput = getByLabelText("Enter a postcode:");
    await userEvent.type(postcodeInput, "SE1 7QD");
    
    const submitButton = getByRole('button', {name: "Submit"})
    await userEvent.click(submitButton)

    await waitFor(() =>
      expect(getByText("Southwark 034A")).toBeInTheDocument()
      )
    })


});
