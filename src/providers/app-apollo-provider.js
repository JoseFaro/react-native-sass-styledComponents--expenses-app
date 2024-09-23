import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, from } from '@apollo/client';
import { APP_GRAPHQL_URL, APP_NAME, APP_VERSION } from '@env';
import { setContext } from '@apollo/client/link/context';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const httpLink = new HttpLink({
   uri: APP_GRAPHQL_URL,
});

const AppApolloProvider = ({ children }) => {
   const { isLoggedIn, token } = useSelector((state) => state.auth);

   const apolloClient = useMemo(() => {
      const tokenHeaders = {
         Accept: isLoggedIn ? 'application/json' : undefined,
         Authorization: isLoggedIn ? `Bearer ${token}` : undefined,
      };

      const tokenMiddleware = setContext((operation, { headers }) => {
         return {
            headers: {
               ...headers,
               ...tokenHeaders,
            },
         };
      });

      return new ApolloClient({
         link: from([tokenMiddleware, httpLink]),
         cache: new InMemoryCache(),

         // pending: deshabilitar cache temporalmente
         defaultOptions: {
            watchQuery: {
               fetchPolicy: 'no-cache',
               errorPolicy: 'ignore',
            },
            query: {
               fetchPolicy: 'no-cache',
               errorPolicy: 'all',
            },
         },
      });
   }, [httpLink, isLoggedIn, token]);

   return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default AppApolloProvider;
