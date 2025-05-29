import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, test } from "vitest";
import App from "../App.jsx";

describe("Dashboard view", () => {
  test("displays a hello world title", () => {
    render(<App />);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });
});
