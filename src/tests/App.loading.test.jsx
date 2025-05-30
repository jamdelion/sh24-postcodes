import React from "react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";
import App from "../App.js";
import { renderWithQueryClient } from "./testUtils.js";

vi.mock(import("../api/useQueryPostcodeLookup.js"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    isLoading: true,
  };
});

describe("when the data is loading", () => {
  it("displays a spinner", async () => {
    const { getByLabelText, findByTestId, getByRole } = renderWithQueryClient(
      <App />,
    );

    const postcodeInput = getByLabelText("Enter a postcode:");
    await userEvent.type(postcodeInput, "SE1 7QA");

    const submitButton = getByRole("button", { name: "Submit" });
    await userEvent.click(submitButton);

    expect(await findByTestId("loading-spinner")).toBeVisible();
  });
});
