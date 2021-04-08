import React from "react";
import { render, screen } from "@testing-library/react";
import UserButton from "../UserButton";
import ApolloMockingProvider from "../../providers/ApolloMockingProvider";
import userEvent from "@testing-library/user-event";
import { debug } from "webpack";

describe("UserButton", () => {
  let onClickMock;

  beforeEach(() => {
    jest.resetAllMocks();
    onClickMock = jest.fn();
  });

  it("Renders with first and last name.", () => {
    render(
      <ApolloMockingProvider>
        <UserButton />
      </ApolloMockingProvider>
    );

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("John Smith's Button")
  });
});
