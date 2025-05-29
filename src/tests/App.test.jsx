import React from "react";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";
import App from "../App.jsx";
import { getWithValidLambethData, getWithValidSouthwarkData } from "./mockServer/handlers/mockGetPostcodeLookup/mockGetPostcodeLookup.js";
import server from "./mockServer/server.js";
import { renderWithQueryClient } from "./testUtils";

describe("when the component renders", () => {
  it("displays a form field for postcode input", () => {
    const { getByLabelText } = renderWithQueryClient(<App />);
    expect(getByLabelText("Enter a postcode:")).toBeInTheDocument();
  });

  // TODO: it should not display an error message
});

describe("when the user submits a postcode from Southwark", () => {
  it("displays the positive result below", async () => {
    server.use(getWithValidSouthwarkData);
    const { getByLabelText, getByText, getByRole } = renderWithQueryClient(
      <App />,
    );

    const postcodeInput = getByLabelText("Enter a postcode:");
    await userEvent.type(postcodeInput, "SE1 7QD");

    const submitButton = getByRole("button", { name: "Submit" });
    await userEvent.click(submitButton);

    await waitFor(() =>
      expect(
        getByText("The postcode is in the service area"),
      ).toBeInTheDocument(),
    );
  });
});

describe("when the user submits a postcode from Lambeth", () => {
  it("displays the positive result below", async () => {
    server.use(getWithValidLambethData);
    const { getByLabelText, getByText, getByRole } = renderWithQueryClient(
      <App />,
    );

    const postcodeInput = getByLabelText("Enter a postcode:");
    await userEvent.type(postcodeInput, "SE1 7QA");

    const submitButton = getByRole("button", { name: "Submit" });
    await userEvent.click(submitButton);

    await waitFor(() =>
      expect(
        getByText("The postcode is in the service area"),
      ).toBeInTheDocument(),
    );
  });
});