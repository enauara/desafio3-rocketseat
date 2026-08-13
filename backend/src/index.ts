import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";
import { verifyToken } from "./middleware/auth";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization?.replace("Bearer ", "");
      const user = token ? verifyToken(token) : null;
      return { user, req };
    },
  });

  await server.start();
  server.applyMiddleware({ app: app as any, cors: false });

  app.listen(4000, () => {
    console.log("Server running on http://localhost:4000/graphql");
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
