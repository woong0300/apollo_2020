import ApolliClient from "apollo-boost";

const client = new ApolliClient({
  uri: "http://localhost:4000/"
});

export default client;
