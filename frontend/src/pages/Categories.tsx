import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  GET_CATEGORIES,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "../services/graphql";

const ICONS = [
  "🍽️", "🚗", "🛒", "💰", "💵", "⚕️", "📚", "🎬",
  "💡", "🏠", "👕", "🎮", "✈️", "🏥", "🎓", "🍕",
  "☕", "🎵", "📱", "💻", "🏋️", "🧘", "🚀", "⚡",
];

const COLORS = [
  "bg-green-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
];

export const Categories = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("📌");
  const [selectedColor, setSelectedColor] = useState("bg-green-500");

  const { data: categoriesData, refetch } = useQuery(GET_CATEGORIES);
  const [createCategory] = useMutation(CREATE_CATEGORY);
  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  const categories = categoriesData?.categories || [];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const openModal = (categoryId?: string) => {
    if (categoryId) {
      const category = categories.find((c: any) => c.id === categoryId);
      if (category) {
        setEditingId(categoryId);
        setName(category.name);
        setDescription(category.description || "");
        setSelectedIcon(category.icon || "📌");
        setSelectedColor(category.color || "bg-green-500");
      }
    } else {
      setEditingId(null);
      setName("");
      setDescription("");
      setSelectedIcon("📌");
      setSelectedColor("bg-green-500");
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setName("");
    setDescription("");
    setSelectedIcon("📌");
    setSelectedColor("bg-green-500");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateCategory({
          variables: { id: editingId, name, description: description, icon: selectedIcon, color: selectedColor },
        });
      } else {
        await createCategory({
          variables: { name, description: description, icon: selectedIcon, color: selectedColor },
        });
      }
      refetch();
      closeModal();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar essa categoria?")) {
      try {
        await deleteCategory({ variables: { id } });
        refetch();
      } catch (error) {
        console.error("Erro ao deletar categoria:", error);
      }
    }
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">$</span>
            </div>
            <span className="text-xl font-bold text-green-600">FINANCE</span>
          </div>

          <div className="flex items-center gap-12">
            <a href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </a>
            <a href="/transactions" className="text-gray-600 hover:text-gray-900">
              Transações
            </a>
            <a
              href="/categories"
              className="text-gray-900 font-medium hover:text-gray-700"
            >
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Categorias
            </h1>
            <p className="text-gray-600">
              Organize suas transações por categorias
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2"
          >
            + Nova categoria
          </button>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8 w-full max-w-xs">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🏷️</span>
            <span className="text-3xl font-bold text-gray-900">
              {categories.length}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            Total de categorias
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category: any) => (
            <div
              key={category.id}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{category.icon || "📌"}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(category.id)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {category.name}
              </h3>
              {}
              {category.description && (
                  <p className="text-sm text-gray-500 mb-3 whitespace-pre-line">
                    {category.description}
                  </p>
              )}
              <p className="text-sm text-gray-600">
                Criada em{" "}
                {new Date(category.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhuma categoria criada</p>
            <p className="text-gray-400">
              Crie sua primeira categoria clicando no botão acima
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {editingId ? "Editar categoria" : "Nova categoria"}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Organize suas transações com categorias
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Nome/Título */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex. Alimentação"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descrição da categoria"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={2}
                />
                <p className="text-xs text-gray-500 mt-1">Opcional</p>
              </div>

              {/* Ícone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ícone
                </label>
                <div className="grid grid-cols-8 gap-2">
                  {ICONS.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setSelectedIcon(icon)}
                      className={`p-2 text-xl rounded border-2 transition ${
                        selectedIcon === icon
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cor
                </label>
                <div className="flex gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded border-2 transition ${color} ${
                        selectedColor === color
                          ? "border-gray-800"
                          : "border-gray-300"
                      }`}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Botão Salvar */}
              <button
                type="submit"
                className="w-full px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition mt-6"
              >
                Salvar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
