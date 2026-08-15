export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: string;
  date: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
}
