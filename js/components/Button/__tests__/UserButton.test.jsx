import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import UserButton from "../UserButton";
import ApolloMockingProvider from "../../providers/ApolloMockingProvider";

describe("UserButton", () => {
  let onClickMock;

  beforeEach(() => {
    jest.resetAllMocks();
    onClickMock = jest.fn();
  });

  it("Renders with first and last name.", async () => {
    render(
      <ApolloMockingProvider>
        <UserButton />
      </ApolloMockingProvider>
    );

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Loading...")

    await waitFor(() => {
      expect(screen.queryByText("John Smith's Button")).toBeInTheDocument();
    });
  });
});
