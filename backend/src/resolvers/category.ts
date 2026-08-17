import { requireAuth } from "../middleware/auth";
import prisma from "../services/prisma";

export const categoryResolvers = {
  Query: {
    categories: async (_: any, __: any, context: any) => {
      const user = requireAuth(context);
      return prisma.category.findMany({
        where: { userId: user.userId },
      });
    },

    category: async (_: any, { id }: any, context: any) => {
      const user = requireAuth(context);
      const category = await prisma.category.findUnique({
        where: { id },
      });

      if (!category || category.userId !== user.userId) {
        throw new Error("Category not found");
      }

      return category;
    },
  },

  Mutation: {
    createCategory: async (_: any, { name, description, icon, color }: any, context: any) => {
      const user = requireAuth(context);
      return prisma.category.create({
        data: {
          name,
          userId: user.userId,
          description,
          icon,
          color
        },
      });
    },

    updateCategory: async (_: any, { id, name, description, icon, color }: any, context: any) => {
      const user = requireAuth(context);
      const category = await prisma.category.findUnique({
        where: { id },
      });

      if (!category || category.userId !== user.userId) {
        throw new Error("Category not found");
      }

      return prisma.category.update({
        where: { id },
        data: { name, description, icon, color },
      });
    },

    deleteCategory: async (_: any, { id }: any, context: any) => {
      const user = requireAuth(context);
      const category = await prisma.category.findUnique({
        where: { id },
      });

      if (!category || category.userId !== user.userId) {
        throw new Error("Category not found");
      }

      await prisma.category.delete({ where: { id } });
      return true;
    },
  },
};
