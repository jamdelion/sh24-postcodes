import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import React from "react";
import App from "../App.jsx";

test("displays a form field for postcode input", () => {
  render(<App />);
  expect(screen.getByLabelText("Enter a postcode:")).toBeInTheDocument();
});
