import "./index.css";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

const httpLink = createHttpLink({ uri: "http://localhost:4000" });
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
