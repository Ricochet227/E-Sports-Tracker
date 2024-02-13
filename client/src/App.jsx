import "./App.css";
import { Outlet } from "react-router-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import Auth from "./utils/auth";

import Header from "./components/header/header";
import Footer from "./components/footer/index";

const authToken = Auth.getToken();

// Create the Apollo Client with a default configuration
let client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

// Modify the client headers if the user is logged in
if (Auth.loggedIn()) {
  const authToken = Auth.getToken();
  client = new ApolloClient({
    uri: "/graphql",
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
