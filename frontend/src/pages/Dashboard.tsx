import { useQuery } from "@apollo/client";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { GET_TRANSACTIONS, GET_CATEGORIES } from "../services/graphql";
import type {Transaction} from "../types/index.js";

const getTransactionIcon = (categoryName: string) => {
  const icons: Record<string, { icon: string; color: string }> = {
    Salário: { icon: "💵", color: "bg-green-100" },
    Transporte: { icon: "🚗", color: "bg-purple-100" },
    Alimentação: { icon: "🍽️", color: "bg-blue-100" },
    Mercado: { icon: "🛒", color: "bg-orange-100" },
    Investimento: { icon: "💰", color: "bg-green-100" },
    Saúde: { icon: "⚕️", color: "bg-red-100" },
    Educação: { icon: "📚", color: "bg-yellow-100" },
    Lazer: { icon: "🎬", color: "bg-pink-100" },
    Utilidades: { icon: "💡", color: "bg-gray-100" },
  };
  return icons[categoryName] || { icon: "📌", color: "bg-gray-100" };
};
/*
const getTransactionIcon= (categoryName: string) => {
  const icons: Record<string, { icon: string; color: string }> = {
    icon: categoryName?.icon || "📌",
    color: categoryName?.color || "bg-gray-100 text-gray-700",
  };
  return icons[categoryName] || { icon: "📌", color: "bg-gray-100" };
};*/

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { data: transactionsData } = useQuery(GET_TRANSACTIONS);
  const { data: categoriesData } = useQuery(GET_CATEGORIES);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const transactions = transactionsData?.transactions || [];
  const categories = categoriesData?.categories || [];

  const totalBalance = transactions.reduce((acc: number, t: Transaction) => {
    return t.type === "income" ? acc + t.amount : acc - t.amount;
  }, 0);

  const monthIncome = transactions
    .filter(
      (t: Transaction) =>
        t.type === "income" &&
        new Date(t.date).getMonth() === new Date().getMonth()
    )
    .reduce((acc: number, t: Transaction) => acc + t.amount, 0);

  const monthExpense = transactions
    .filter(
      (t: Transaction) =>
        t.type === "expense" &&
        new Date(t.date).getMonth() === new Date().getMonth()
    )
    .reduce((acc: number, t: Transaction) => acc + t.amount, 0);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      timeZone: "UTC"
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">$</span>
            </div>
            <span className="text-xl font-bold text-green-600">FINANCE</span>
          </div>

          <div className="flex items-center gap-12">
            <a
              href="/dashboard"
              className="text-gray-900 font-medium hover:text-gray-700"
            >
              Dashboard
            </a>
            <a
              href="/transactions"
              className="text-gray-600 hover:text-gray-900"
            >
              Transações
            </a>
            <a href="/categories" className="text-gray-600 hover:text-gray-900">
              Categorias
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700 hover:bg-gray-400"
            >
              {getInitials(user?.name || "")}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Top 3 Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-600 tracking-wide">
                SALDO TOTAL
              </span>
              <span className="text-xl">📋</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(totalBalance)}
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-600 tracking-wide">
                RECEITAS DO MÊS
              </span>
              <span className="text-xl">⊕</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(monthIncome)}
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-gray-600 tracking-wide">
                DESPESAS DO MÊS
              </span>
              <span className="text-xl">⊖</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(monthExpense)}
            </p>
          </div>
        </div>

        {/* Main Content - Transactions and Categories */}
        <div className="grid grid-cols-3 gap-6">
          {/* Transactions Column (2/3) */}
          <div className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-semibold text-gray-600 tracking-wide">
                TRANSAÇÕES RECENTES
              </h2>
              <a href="/transactions" className="text-green-600 hover:text-green-700 text-sm font-medium">
                Ver todas &gt;
              </a>
            </div>

            <div className="space-y-0">
              {transactions.length > 0 ? (
                transactions.map((transaction: any) => {
                  const { icon, color } = getTransactionIcon(
                    transaction.category
                  );
                  return (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${color}`}>
                          {icon}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {transaction.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(transaction.date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            transaction.type === "income"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {transaction.category.name}
                        </span>
                        <p
                          className={`font-semibold text-sm ${
                            transaction.type === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "income" ? "+ " : "- "}
                          {formatCurrency(transaction.amount)}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-center py-12">
                  Nenhuma transação registrada
                </p>
              )}
            </div>

            <div className="border-t border-gray-100 mt-4 pt-4">
              <button
                onClick={() => navigate("/transactions")}
                className="w-full text-center py-3 text-green-600 hover:text-green-700 font-medium"
              >
                + Nova transação
              </button>
            </div>
          </div>

          {/* Categories Column (1/3) */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-semibold text-gray-600 tracking-wide">
                CATEGORIAS
              </h2>
              <button
                onClick={() => navigate("/categories")}
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                Gerenciar &gt;
              </button>
            </div>

            <div className="space-y-3">
              {categories.length > 0 ? (
                categories.map((category: any, index: number) => {
                  const categoryTransactions = transactions.filter(
                    (t: any) => t.category.id === category.id
                  );

                  const colors = [
                    "bg-blue-100 text-blue-700",
                    "bg-purple-100 text-purple-700",
                    "bg-orange-100 text-orange-700",
                    "bg-pink-100 text-pink-700",
                    "bg-yellow-100 text-yellow-700",
                  ];

                  const colorClass = colors[index % colors.length];

                  return (
                    <div
                      key={category.id}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}
                      >
                        {category.name}
                      </span>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">
                          {categoryTransactions.length} items
                        </p>
                        <p className="font-semibold text-sm text-gray-900">
                          {formatCurrency(
                            categoryTransactions.reduce(
                              (acc: number, t: any) => acc + t.amount,
                              0
                            )
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Nenhuma categoria
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
