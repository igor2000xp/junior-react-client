import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { PropsWithChildren } from 'react';

const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';
  // https://rickandmortyapi.com/graphql
  // http://localhost:4000/graphql
  // https://localhost:1337/graphql
  // ../schema.graphql

  const StrapiApolloProvider: React.FC<PropsWithChildren<{}>> = ({children}) => {
  const client = new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>
    (children)
  </ApolloProvider>
}

export default StrapiApolloProvider;
