import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../services/graphql";
import type { Transaction } from "../types/index.js";

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (id: string) => void;
  onRefresh: () => void;
}

export const TransactionList = ({
  transactions,
  onEdit,
  onRefresh,
}: TransactionListProps) => {
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    onCompleted: () => {
      onRefresh();
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure?")) {
      deleteTransaction({ variables: { id } });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Amount</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Type</th>
            <th className="px-6 py-3 text-left text-sm font-medium">
              Category
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-t">
              <td className="px-6 py-3">{transaction.title}</td>
              <td className="px-6 py-3">{formatCurrency(transaction.amount)}</td>
              <td className="px-6 py-3">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    transaction.type === "income"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {transaction.type}
                </span>
              </td>
              <td className="px-6 py-3">{transaction.category.name}</td>
              <td className="px-6 py-3">{formatDate(transaction.date)}</td>
              <td className="px-6 py-3 flex gap-2">
                <button
                  onClick={() => onEdit(transaction.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(transaction.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
