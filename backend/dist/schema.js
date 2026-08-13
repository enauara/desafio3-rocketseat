"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const user_1 = require("./resolvers/user");
const category_1 = require("./resolvers/category");
const transaction_1 = require("./resolvers/transaction");
exports.schema = {
    typeDefs: `
    scalar DateTime

    type User {
      id: ID!
      email: String!
      name: String!
      createdAt: DateTime!
      updatedAt: DateTime!
    }

    type Category {
      id: ID!
      name: String!
      createdAt: DateTime!
      updatedAt: DateTime!
    }

    type Transaction {
      id: ID!
      title: String!
      amount: Float!
      type: String!
      date: DateTime!
      category: Category!
      createdAt: DateTime!
      updatedAt: DateTime!
    }

    type AuthPayload {
      token: String!
      user: User!
    }

    type Query {
      me: User!
      categories: [Category!]!
      category(id: ID!): Category
      transactions: [Transaction!]!
      transaction(id: ID!): Transaction
    }

    type Mutation {
      signup(email: String!, name: String!, password: String!): AuthPayload!
      login(email: String!, password: String!): AuthPayload!
      
      createCategory(name: String!): Category!
      updateCategory(id: ID!, name: String!): Category!
      deleteCategory(id: ID!): Boolean!
      
      createTransaction(title: String!, amount: Float!, type: String!, categoryId: ID!, date: DateTime!): Transaction!
      updateTransaction(id: ID!, title: String, amount: Float, type: String, categoryId: ID, date: DateTime): Transaction!
      deleteTransaction(id: ID!): Boolean!
    }
  `,
    resolvers: {
        DateTime: {
            __serialize: (value) => value.toISOString(),
            __parseValue: (value) => new Date(value),
            __parseLiteral: (ast) => new Date(ast.value),
        },
        Query: {
            ...user_1.userResolvers.Query,
            ...category_1.categoryResolvers.Query,
            ...transaction_1.transactionResolvers.Query,
        },
        Mutation: {
            ...user_1.userResolvers.Mutation,
            ...category_1.categoryResolvers.Mutation,
            ...transaction_1.transactionResolvers.Mutation,
        },
    },
};
//# sourceMappingURL=schema.js.map