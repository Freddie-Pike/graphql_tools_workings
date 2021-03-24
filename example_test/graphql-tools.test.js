import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphql } from "graphql";

// Fill this in with the schema string
const schemaString = `
type Todo { id: ID, text: String, completed: Boolean }
type User { id: ID, name: String }
type Query { todoItems: [Todo] }
# ... other types here
`;

// Make a GraphQL schema with no resolvers
const schema = makeExecutableSchema({ typeDefs: schemaString });

// Create a new schema with mocks
const schemaWithMocks = addMocksToSchema({ schema });

const query = `{
query tasksForUser {
  user(id: 6) { id, name }
}
}`;

graphql(schemaWithMocks, query).then((result) => console.log('Got result', result));

describe("graphql-tools", () => {
  it("Runs mocked Schema", () => {
    
  });
});
