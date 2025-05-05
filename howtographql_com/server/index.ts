import { ApolloServer } from "apollo-server";

import { context } from "./src/context";
import { schema } from "./src/schema";

export const server = new ApolloServer({ schema, context });

const port = 3000;

server.listen({ port }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
