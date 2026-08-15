import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      name
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      description
      icon
      color
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!, $description: String!, $icon: String!, $color: String!) {
    createCategory(name: $name, description: $description, icon: $icon, color: $color) {
      id
      name
      description
      icon
      color
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $name: String!) {
    updateCategory(id: $id, name: $name) {
      id
      name
      updatedAt
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      id
      title
      amount
      type
      date
      category {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(
    $title: String!
    $amount: Float!
    $type: String!
    $categoryId: ID!
    $date: DateTime!
  ) {
    createTransaction(
      title: $title
      amount: $amount
      type: $type
      categoryId: $categoryId
      date: $date
    ) {
      id
      title
      amount
      type
      date
      category {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction(
    $id: ID!
    $title: String
    $amount: Float
    $type: String
    $categoryId: ID
    $date: DateTime
  ) {
    updateTransaction(
      id: $id
      title: $title
      amount: $amount
      type: $type
      categoryId: $categoryId
      date: $date
    ) {
      id
      title
      amount
      type
      date
      category {
        id
        name
      }
      updatedAt
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id)
  }
`;
