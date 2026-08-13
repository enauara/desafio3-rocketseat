import bcrypt from "bcryptjs";
import { generateToken, requireAuth } from "../middleware/auth";
import prisma from "../services/prisma";

export const userResolvers = {
  Query: {
    me: async (_: any, __: any, context: any) => {
      const user = requireAuth(context);
      return prisma.user.findUniqueOrThrow({
        where: { id: user.userId },
      });
    },
  },
  Mutation: {
    signup: async (_: any, { email, name, password }: any) => {
      const userExists = await prisma.user.findUnique({ where: { email } });
      if (userExists) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      const token = generateToken(user.id);
      return { token, user };
    },

    login: async (_: any, { email, password }: any) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new Error("Invalid credentials");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("Invalid credentials");
      }

      const token = generateToken(user.id);
      return { token, user };
    },
  },
};
