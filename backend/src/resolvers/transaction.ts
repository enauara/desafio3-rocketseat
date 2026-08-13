import { requireAuth } from "../middleware/auth";
import prisma from "../services/prisma";

export const transactionResolvers = {
  Query: {
    transactions: async (_: any, __: any, context: any) => {
      const user = requireAuth(context);
      return prisma.transaction.findMany({
        where: { userId: user.userId },
        include: { category: true },
      });
    },

    transaction: async (_: any, { id }: any, context: any) => {
      const user = requireAuth(context);
      const transaction = await prisma.transaction.findUnique({
        where: { id },
        include: { category: true },
      });

      if (!transaction || transaction.userId !== user.userId) {
        throw new Error("Transaction not found");
      }

      return transaction;
    },
  },

  Mutation: {
    createTransaction: async (
      _: any,
      { title, amount, type, categoryId, date }: any,
      context: any
    ) => {
      const user = requireAuth(context);

      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category || category.userId !== user.userId) {
        throw new Error("Category not found");
      }

      return prisma.transaction.create({
        data: {
          title,
          amount,
          type,
          categoryId,
          userId: user.userId,
          date: new Date(date),
        },
        include: { category: true },
      });
    },

    updateTransaction: async (
      _: any,
      { id, title, amount, type, categoryId, date }: any,
      context: any
    ) => {
      const user = requireAuth(context);
      const transaction = await prisma.transaction.findUnique({
        where: { id },
      });

      if (!transaction || transaction.userId !== user.userId) {
        throw new Error("Transaction not found");
      }

      if (categoryId) {
        const category = await prisma.category.findUnique({
          where: { id: categoryId },
        });

        if (!category || category.userId !== user.userId) {
          throw new Error("Category not found");
        }
      }

      return prisma.transaction.update({
        where: { id },
        data: {
          title: title ?? transaction.title,
          amount: amount ?? transaction.amount,
          type: type ?? transaction.type,
          categoryId: categoryId ?? transaction.categoryId,
          date: date ? new Date(date) : transaction.date,
        },
        include: { category: true },
      });
    },

    deleteTransaction: async (_: any, { id }: any, context: any) => {
      const user = requireAuth(context);
      const transaction = await prisma.transaction.findUnique({
        where: { id },
      });

      if (!transaction || transaction.userId !== user.userId) {
        throw new Error("Transaction not found");
      }

      await prisma.transaction.delete({ where: { id } });
      return true;
    },
  },
};
