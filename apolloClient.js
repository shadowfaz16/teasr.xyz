import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://teasr.zk3.io", // replace with your GraphQL server URI
  cache: new InMemoryCache(),
});

export default client;
