import { ApolloClient, InMemoryCache } from '@apollo/client';

const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';
// https://rickandmortyapi.com/graphql
// http://localhost:4000/graphql
// https://localhost:1337/graphql
// ../schema.graphql

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

export default client;
