"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./schema");
const auth_1 = require("./middleware/auth");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
}));
app.use(express_1.default.json());
const startServer = async () => {
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: schema_1.schema.typeDefs,
        resolvers: schema_1.schema.resolvers,
        context: ({ req }) => {
            const token = req.headers.authorization?.replace("Bearer ", "");
            const user = token ? (0, auth_1.verifyToken)(token) : null;
            return { user, req };
        },
    });
    await server.start();
    server.applyMiddleware({ app: app, cors: false });
    app.listen(4000, () => {
        console.log("Server running on http://localhost:4000/graphql");
    });
};
startServer().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map