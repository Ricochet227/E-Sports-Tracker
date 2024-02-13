const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    text: String
    author: String
    matchId: String!
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    comments(matchId: String): [Comment]
    comment(commentId: ID!): Comment
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addComment(text: String, matchId: String): Comment
  }
`;
module.exports = typeDefs;
