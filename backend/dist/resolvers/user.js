"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = require("../middleware/auth");
const prisma_1 = __importDefault(require("../services/prisma"));
exports.userResolvers = {
    Query: {
        me: async (_, __, context) => {
            const user = (0, auth_1.requireAuth)(context);
            return prisma_1.default.user.findUniqueOrThrow({
                where: { id: user.userId },
            });
        },
    },
    Mutation: {
        signup: async (_, { email, name, password }) => {
            const userExists = await prisma_1.default.user.findUnique({ where: { email } });
            if (userExists) {
                throw new Error("User already exists");
            }
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            const user = await prisma_1.default.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                },
            });
            const token = (0, auth_1.generateToken)(user.id);
            return { token, user };
        },
        login: async (_, { email, password }) => {
            const user = await prisma_1.default.user.findUnique({ where: { email } });
            if (!user) {
                throw new Error("Invalid credentials");
            }
            const passwordMatch = await bcryptjs_1.default.compare(password, user.password);
            if (!passwordMatch) {
                throw new Error("Invalid credentials");
            }
            const token = (0, auth_1.generateToken)(user.id);
            return { token, user };
        },
    },
};
//# sourceMappingURL=user.js.map