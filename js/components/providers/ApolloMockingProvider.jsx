import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import React from "react";

const schemaString = `
  type AvatarObjectType {
    id: Int,
    avatarUrl: String
  }
  scalar DateTime
  scalar GenericScalar
  type UserObjectType {
    id: Int,
    username: String,
    firstName: String,
    lastName: String,
    avatar: AvatarObjectType,
    dateCreated: DateTime,
    notificationPreferences: GenericScalar,
  }
  type Query {
    GetCurrentUser: UserObjectType,
  }
`;

const globalMocks = {
  String: () => "abc",
  Int: () => 56,
  UserObjectType: () => ({
    firstName: "John",
    lastName: "Smith",
  }),
};

const ApolloMockingProvider = ({ children }) => {
  const executableSchema = makeExecutableSchema({ typeDefs: schemaString });

  const schemaWithMocks = addMocksToSchema({
    schema: executableSchema,
    mocks: globalMocks,
  });

  const client = new ApolloClient({
    link: new SchemaLink({ schemaWithMocks }),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloMockingProvider;
