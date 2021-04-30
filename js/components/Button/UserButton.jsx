import React from "react";
import PropTypes from "prop-types";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

import Button from "./Button";

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    id
    firstName
    lastName
  }
`;

function UserButton({ ...props }) {
  const { data: userData, loading } = useQuery(GET_CURRENT_USER);
  let buttonText = "Loading...";

  if (!loading) {
    buttonText = `${userData.firstName} ${userData.lastName}'s Button`;
  }
  return <Button {...props}>{buttonText}</Button>;
}

UserButton.propTypes = {
  children: PropTypes.node,
};

export default UserButton;
