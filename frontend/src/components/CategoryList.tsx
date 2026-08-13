import { useMutation } from "@apollo/client";
import { DELETE_CATEGORY } from "../services/graphql";
import type { Category } from "../types/index.js";

interface CategoryListProps {
  categories: Category[];
  onEdit: (id: string) => void;
  onRefresh: () => void;
}

export const CategoryList = ({
  categories,
  onEdit,
  onRefresh,
}: CategoryListProps) => {
  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    onCompleted: () => {
      onRefresh();
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure?")) {
      deleteCategory({ variables: { id } });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-t">
              <td className="px-6 py-3">{category.name}</td>
              <td className="px-6 py-3 flex gap-2">
                <button
                  onClick={() => onEdit(category.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
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
