import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/graphql', //teste
  credentials: "include",
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");
  
  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return forward(operation);
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
