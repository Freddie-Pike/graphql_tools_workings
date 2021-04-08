import React from "react";
import PropTypes from "prop-types";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

import Button from "./Button";

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    id
    firstName
    lastName
  }
`;

function UserButton({ ...props }) {
  const { data: userData } = useQuery(GET_CURRENT_USER);
  return <Button {...props}>{userData.firstName} {userData.lastName}'s Button</Button>;
}

UserButton.propTypes = {
  children: PropTypes.node,
};

export default UserButton;
