"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionResolvers = void 0;
const auth_1 = require("../middleware/auth");
const prisma_1 = __importDefault(require("../services/prisma"));
exports.transactionResolvers = {
    Query: {
        transactions: async (_, __, context) => {
            const user = (0, auth_1.requireAuth)(context);
            return prisma_1.default.transaction.findMany({
                where: { userId: user.userId },
                include: { category: true },
            });
        },
        transaction: async (_, { id }, context) => {
            const user = (0, auth_1.requireAuth)(context);
            const transaction = await prisma_1.default.transaction.findUnique({
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
        createTransaction: async (_, { title, amount, type, categoryId, date }, context) => {
            const user = (0, auth_1.requireAuth)(context);
            const category = await prisma_1.default.category.findUnique({
                where: { id: categoryId },
            });
            if (!category || category.userId !== user.userId) {
                throw new Error("Category not found");
            }
            return prisma_1.default.transaction.create({
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
        updateTransaction: async (_, { id, title, amount, type, categoryId, date }, context) => {
            const user = (0, auth_1.requireAuth)(context);
            const transaction = await prisma_1.default.transaction.findUnique({
                where: { id },
            });
            if (!transaction || transaction.userId !== user.userId) {
                throw new Error("Transaction not found");
            }
            if (categoryId) {
                const category = await prisma_1.default.category.findUnique({
                    where: { id: categoryId },
                });
                if (!category || category.userId !== user.userId) {
                    throw new Error("Category not found");
                }
            }
            return prisma_1.default.transaction.update({
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
        deleteTransaction: async (_, { id }, context) => {
            const user = (0, auth_1.requireAuth)(context);
            const transaction = await prisma_1.default.transaction.findUnique({
                where: { id },
            });
            if (!transaction || transaction.userId !== user.userId) {
                throw new Error("Transaction not found");
            }
            await prisma_1.default.transaction.delete({ where: { id } });
            return true;
        },
    },
};
//# sourceMappingURL=transaction.js.map