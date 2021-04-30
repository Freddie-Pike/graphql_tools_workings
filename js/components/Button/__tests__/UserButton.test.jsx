import React from "react";
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from "@testing-library/react";
import UserButton, {GET_CURRENT_USER} from "../UserButton";
import ApolloMockingProvider from "../../providers/ApolloMockingProvider";

describe("UserButton", () => {
  let onClickMock;

  beforeEach(() => {
    jest.resetAllMocks();
    onClickMock = jest.fn();
  });

  it("Renders with first and last name with MockedProvider", async () => {
    const mocks = [
      {
        request: {
          query: GET_CURRENT_USER,
        },
        result: {
          data: {
            id: 1,
            firstName: "John",
            lastName: "Smith",
          }
        },
      }
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserButton />
      </MockedProvider>
    );

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Loading...")

    await waitFor(() => {
      expect(screen.queryByText("John Smith's Button")).toBeInTheDocument();
    });
  });
  

  it.skip("Renders with first and last name.", async () => {
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
