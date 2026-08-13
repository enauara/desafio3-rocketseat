import { userResolvers } from "./resolvers/user";
import { categoryResolvers } from "./resolvers/category";
import { transactionResolvers } from "./resolvers/transaction";

export const schema = {
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
      __serialize: (value: any) => value.toISOString(),
      __parseValue: (value: any) => new Date(value),
      __parseLiteral: (ast: any) => new Date(ast.value),
    },
    Query: {
      ...userResolvers.Query,
      ...categoryResolvers.Query,
      ...transactionResolvers.Query,
    },
    Mutation: {
      ...userResolvers.Mutation,
      ...categoryResolvers.Mutation,
      ...transactionResolvers.Mutation,
    },
  },
};
