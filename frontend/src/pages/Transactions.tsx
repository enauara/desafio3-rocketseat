import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  GET_TRANSACTIONS,
  GET_CATEGORIES,
  DELETE_TRANSACTION,
} from "../services/graphql";
import { TransactionForm } from "../components/TransactionForm";

const categoryIcons: Record<string, string> = {
  Alimentação: "🍽️",
  Transporte: "🚗",
  Mercado: "🛒",
  Investimento: "💰",
  Salário: "💵",
  Saúde: "⚕️",
  Educação: "📚",
  Lazer: "🎬",
  Utilidades: "💡",
};

export const Transactions = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("todos");
  const [categoryFilter, setCategoryFilter] = useState("todas");
  const [periodFilter, setPeriodFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: transactionsData, refetch: refetchTransactions } = useQuery(
    GET_TRANSACTIONS
  );
  const { data: categoriesData } = useQuery(GET_CATEGORIES);
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar essa transação?")) {
      try {
        await deleteTransaction({
          variables: { id },
        });
        refetchTransactions();
      } catch (error) {
        alert("Erro ao deletar transação");
      }
    }
  };

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
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(date));
  };

  let filteredTransactions = transactionsData?.transactions || [];

  if (searchTerm) {
    filteredTransactions = filteredTransactions.filter((t: any) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (typeFilter !== "todos") {
    filteredTransactions = filteredTransactions.filter(
      (t: any) => t.type === typeFilter
    );
  }

  if (categoryFilter !== "todas") {
    filteredTransactions = filteredTransactions.filter(
      (t: any) => t.category.id === categoryFilter
    );
  }

  if (periodFilter) {
    const [month, year] = periodFilter.split("/");
    filteredTransactions = filteredTransactions.filter((t: any) => {
      const date = new Date(t.date);
      return (
        date.getMonth() === parseInt(month) - 1 &&
        date.getFullYear() === parseInt(year)
      );
    });
  }

  const categories = categoriesData?.categories || [];

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

          <div className="flex items-center gap-8">
            <a
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Dashboard
            </a>
            <a href="/transactions" className="text-green-600 font-medium hover:text-green-700">
              Transações
            </a>
            <a href="/categories" className="text-gray-600 hover:text-gray-900">
              Categorias
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              🚪
            </button>
            <button className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700 hover:bg-gray-400">
              {getInitials(user?.name || "")}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Transações</h1>
          <p className="text-gray-600">
            Gerencie todas as suas transações financeiras
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4 flex-1">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar por descrição"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="todos">Todos</option>
              <option value="income">Entrada</option>
              <option value="expense">Saída</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="todas">Todas</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              type="month"
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            onClick={() => {
              setEditingId(null);
              setShowForm(true);
            }}
            className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            + Nova transação
          </button>
        </div>

        {showForm && (
          <TransactionForm
            transactionId={editingId}
            categories={categories}
            onClose={() => {
              setShowForm(false);
              setEditingId(null);
            }}
            onSuccess={() => {
              refetchTransactions();
              setShowForm(false);
              setEditingId(null);
            }}
          />
        )}

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Descrição
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Data
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Categoria
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Tipo
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">
                  Valor
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction: any) => {
                  const categoryName = transaction.category.name;
                  const icon = categoryIcons[categoryName] || "📌";
                  const categoryColors: Record<string, string> = {
                    Alimentação: "bg-blue-100 text-blue-700",
                    Transporte: "bg-purple-100 text-purple-700",
                    Mercado: "bg-orange-100 text-orange-700",
                    Investimento: "bg-green-100 text-green-700",
                    Salário: "bg-green-100 text-green-700",
                    Saúde: "bg-red-100 text-red-700",
                    Educação: "bg-yellow-100 text-yellow-700",
                    Lazer: "bg-pink-100 text-pink-700",
                    Utilidades: "bg-gray-100 text-gray-700",
                  };
                  const colorClass =
                    categoryColors[categoryName] ||
                    "bg-gray-100 text-gray-700";

                  return (
                    <tr
                      key={transaction.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{icon}</span>
                          <span className="font-medium text-gray-900">
                            {transaction.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}
                        >
                          {categoryName}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                              transaction.type === "income"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {transaction.type === "income" ? "✓" : "✕"}
                          </span>
                          <span
                            className={
                              transaction.type === "income"
                                ? "text-green-700 font-medium"
                                : "text-red-700 font-medium"
                            }
                          >
                            {transaction.type === "income" ? "Entrada" : "Saída"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={`font-semibold ${
                            transaction.type === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}{" "}
                          {formatCurrency(transaction.amount)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingId(transaction.id);
                              setShowForm(true);
                            }}
                            className="p-1 text-gray-400 hover:text-gray-600"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(transaction.id)}
                            className="p-1 text-gray-400 hover:text-red-600"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <p className="text-gray-500">Nenhuma transação encontrada</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
