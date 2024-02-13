import "./App.css";
import { Outlet } from "react-router-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import Auth from "./utils/auth";

import Header from "./components/header/header";
import Footer from "./components/footer/index";

const getAuthToken = () => {
  return Auth.getToken();
};

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

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
