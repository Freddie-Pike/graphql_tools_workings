import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { JsonFileLoader } from "@graphql-tools/json-file-loader";
import { loadSchema } from "@graphql-tools/load";
import schema from "../introspection.json";

import { graphql } from "graphql";

describe("graphql-tools", () => {
  it("Runs mocked Schema", () => {
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

    const mocks = {
      String: () => "abc",
      Int: () => 56,
      UserObjectType: () => ({
        firstName: "John",
        lastName: "Smith",
      }),
    };

    const schema = makeExecutableSchema({ typeDefs: schemaString });

    const schemaWithMocks = addMocksToSchema({ schema, mocks });

    const query = `{
      GetCurrentUser { id, firstName, lastName }
    }`;

    graphql(schemaWithMocks, query).then((result) => {
      const obj = JSON.parse(JSON.stringify(result));

      expect(obj.data.GetCurrentUser.id).toBe(56);
      expect(obj.data.GetCurrentUser.firstName).toBe("John");
      expect(obj.data.GetCurrentUser.lastName).toBe("Smith");
    });
  });

  it("Runs mocked Schema with JsonFileLoader", async () => {
    const JSONSchema = await loadSchema(schema, {
      loaders: [new JsonFileLoader()],
    });

    const mocks = {
      String: () => "abc",
      Int: () => 56,
      UserObjectType: () => ({
        firstName: "John",
        lastName: "Smith",
      }),
    };

    // Create a new schema with mocks
    const schemaWithMocks = addMocksToSchema({
      schema: JSONSchema,
      mocks,
    });

    const query = `{
      GetCurrentUser { id, firstName, lastName }
    }`;

    graphql(schemaWithMocks, query).then((result) => {
      const obj = JSON.parse(JSON.stringify(result));

      expect(obj.data.GetCurrentUser.id).toBe(56);
      expect(obj.data.GetCurrentUser.firstName).toBe("John");
      expect(obj.data.GetCurrentUser.lastName).toBe("Smith");
    });
  });
});
