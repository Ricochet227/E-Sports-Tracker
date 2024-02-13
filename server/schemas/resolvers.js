const { User, Comment } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("comments");
      }

      throw new AuthenticationError("User not authenticated");
    },
    users: async () => {
      return User.find().populate("comments");
    },

    user: async (parent, { username }) => {
      return User.findOne({ username: username });
    },

    comments: async (parent, { matchId }) => {
      const params = matchId ? { matchId } : {};
      return Comment.find(params)
        .sort({ createdAt: 1 })
        .select("_id text author matchId createdAt");
    },

    comment: async (parent, { commentId }) => {
      return Comment.findOne({ _id: commentId });
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addComment: async (parent, { text, matchId }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          text,
          author: context.user.username,
          matchId,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { comments: comment._id },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return comment;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
