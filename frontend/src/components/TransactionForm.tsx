import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
  GET_TRANSACTIONS,
} from "../services/graphql";
import type { Category, Transaction } from "../types/index.js";

interface TransactionFormProps {
  transactionId: string | null;
  categories: Category[];
  onClose: () => void;
  onSuccess: () => void;
}

export const TransactionForm = ({
  transactionId,
  categories,
  onClose,
  onSuccess,
}: TransactionFormProps) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("0,00");
  const [type, setType] = useState("expense");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState("");

  const { data: transactionsData } = useQuery(GET_TRANSACTIONS);

  useEffect(() => {
    if (transactionId && transactionsData?.transactions) {
      const transaction = transactionsData.transactions.find(
        (t: Transaction) => t.id === transactionId
      );
      if (transaction) {
        setTitle(transaction.title);
        setAmount(transaction.amount.toFixed(2).replace(".", ","));
        setType(transaction.type);
        setCategoryId(transaction.category.id);
        //setDate(transaction.date.split("T")[0]);
        setDate(parseLocalDateToISO(transaction.date.split("T")[0])); //todo conferir
      }
    }
  }, [transactionId, transactionsData]);

  function parseLocalDateToISO(dateString: string): string {
    const [day, month, year] = dateString.split("-").map(Number);
    console.log("dateString1: ",dateString)
    const localDate = new Date(day, month - 1, year, 12, 0, 0);
    console.log("localDate: ",localDate)
    console.log("localDateIsoString: ",localDate.toISOString())
    return localDate.toISOString().split("T")[0];
  }

  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    onCompleted: () => {
      onSuccess();
    },
  });

  const [updateTransaction] = useMutation(UPDATE_TRANSACTION, {
    onCompleted: () => {
      onSuccess();
    },
  });

  const handleAmountChange = (value: string) => {
    const numeric = value.replace(/\D/g, "");
    if (numeric === "") {
      setAmount("0,00");
    } else {
      const paddedNumeric = numeric.padStart(3, "0");
      const formatted = (
        parseInt(paddedNumeric) / 100
      ).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setAmount(formatted);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let numericAmount = amount.replace(/[^\d.,]/g, "");
    numericAmount = numericAmount.replace(/\./g, "");
    numericAmount = numericAmount.replace(",", ".");
    const numericAmountParsed = parseFloat(numericAmount);

    const variables = {
      title,
      amount: numericAmountParsed,
      type,
      categoryId,
      //date: new Date(date).toISOString(),
      date: new Date(parseLocalDateToISO(date)).toISOString() //todo conferir
    };

    if (transactionId) {
      updateTransaction({
        variables: { id: transactionId, ...variables },
      });
    } else {
      createTransaction({
        variables,
      });
    }
  };

  // @ts-ignore
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Nova transação</h2>
            <p className="text-sm text-gray-500 mt-1">
              Registre sua despesa ou receita
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setType("expense")}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                type === "expense"
                  ? "border-2 border-red-500 bg-white text-red-500"
                  : "border-2 border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300"
              }`}
            >
              ⊘ Despesa
            </button>
            <button
              type="button"
              onClick={() => setType("income")}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${
                type === "income"
                  ? "border-2 border-green-500 bg-white text-green-500"
                  : "border-2 border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300"
              }`}
            >
              ⊕ Receita
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex. Almoço no restaurante"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor
              </label>
              <div className="relative">
                <span className="absolute left-4 top-2 text-gray-600 font-medium">
                  R$
                </span>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="w-full px-4 py-2 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-right"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-600"
              required
            >
              <option value="">Selecione</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
};
