import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  GET_CATEGORIES,
} from "../services/graphql";
import type { Category } from "../types/index.js";

interface CategoryFormProps {
  categoryId: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const CategoryForm = ({
  categoryId,
  onClose,
  onSuccess,
}: CategoryFormProps) => {
  const [name, setName] = useState("");
  const { data: categoriesData } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    if (categoryId && categoriesData?.categories) {
      const category = categoriesData.categories.find(
        (c: Category) => c.id === categoryId
      );
      if (category) {
        setName(category.name);
      }
    }
  }, [categoryId, categoriesData]);

  const [createCategory] = useMutation(CREATE_CATEGORY, {
    onCompleted: () => {
      onSuccess();
    },
  });

  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    onCompleted: () => {
      onSuccess();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (categoryId) {
      updateCategory({ variables: { id: categoryId, name } });
    } else {
      createCategory({ variables: { name } });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {categoryId ? "Edit Category" : "New Category"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
