import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      comments {
        _id
      }
    }
  }
`;

export const QUERY_MATCH_COMMENTS = gql`
  query comments($matchId: String) {
    comments(matchId: $matchId) {
      _id
      text
      author
      createdAt
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      comments {
        _id
      }
    }
  }
`;
