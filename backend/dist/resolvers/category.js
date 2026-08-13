"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryResolvers = void 0;
const auth_1 = require("../middleware/auth");
const prisma_1 = __importDefault(require("../services/prisma"));
exports.categoryResolvers = {
    Query: {
        categories: async (_, __, context) => {
            const user = (0, auth_1.requireAuth)(context);
            return prisma_1.default.category.findMany({
                where: { userId: user.userId },
            });
        },
        category: async (_, { id }, context) => {
            const user = (0, auth_1.requireAuth)(context);
            const category = await prisma_1.default.category.findUnique({
                where: { id },
            });
            if (!category || category.userId !== user.userId) {
                throw new Error("Category not found");
            }
            return category;
        },
    },
    Mutation: {
        createCategory: async (_, { name }, context) => {
            const user = (0, auth_1.requireAuth)(context);
            return prisma_1.default.category.create({
                data: {
                    name,
                    userId: user.userId,
                },
            });
        },
        updateCategory: async (_, { id, name }, context) => {
            const user = (0, auth_1.requireAuth)(context);
            const category = await prisma_1.default.category.findUnique({
                where: { id },
            });
            if (!category || category.userId !== user.userId) {
                throw new Error("Category not found");
            }
            return prisma_1.default.category.update({
                where: { id },
                data: { name },
            });
        },
        deleteCategory: async (_, { id }, context) => {
            const user = (0, auth_1.requireAuth)(context);
            const category = await prisma_1.default.category.findUnique({
                where: { id },
            });
            if (!category || category.userId !== user.userId) {
                throw new Error("Category not found");
            }
            await prisma_1.default.category.delete({ where: { id } });
            return true;
        },
    },
};
//# sourceMappingURL=category.js.map