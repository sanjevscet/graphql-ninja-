import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import Header from "./Components/Header";
import Clients from "./Components/Clients";
import AddClientModel from "./Components/AddClientModel";
import Projects from "./Components/Projects";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(_, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          {/* create Client */}
          <AddClientModel />

          {/* list Projects */}
          <Projects />

          {/* list Clients */}
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
