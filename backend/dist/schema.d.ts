export declare const schema: {
    typeDefs: string;
    resolvers: {
        DateTime: {
            __serialize: (value: any) => any;
            __parseValue: (value: any) => Date;
            __parseLiteral: (ast: any) => Date;
        };
        Query: {
            me: (_: any, __: any, context: any) => Promise<{
                id: string;
                email: string;
                name: string;
                password: string;
                createdAt: Date;
                updatedAt: Date;
            }>;
            categories: (_: any, __: any, context: any) => Promise<{
                id: string;
                name: string;
                userId: string;
                createdAt: Date;
                updatedAt: Date;
            }[]>;
            category: (_: any, { id }: any, context: any) => Promise<{
                id: string;
                name: string;
                userId: string;
                createdAt: Date;
                updatedAt: Date;
            }>;
            transactions: (_: any, __: any, context: any) => Promise<({
                category: {
                    id: string;
                    name: string;
                    userId: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                id: string;
                title: string;
                amount: number;
                type: string;
                userId: string;
                categoryId: string;
                date: Date;
                createdAt: Date;
                updatedAt: Date;
            })[]>;
            transaction: (_: any, { id }: any, context: any) => Promise<{
                category: {
                    id: string;
                    name: string;
                    userId: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                id: string;
                title: string;
                amount: number;
                type: string;
                userId: string;
                categoryId: string;
                date: Date;
                createdAt: Date;
                updatedAt: Date;
            }>;
        };
        Mutation: {
            signup: (_: any, { email, name, password }: any) => Promise<{
                token: string;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    password: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }>;
            login: (_: any, { email, password }: any) => Promise<{
                token: string;
                user: {
                    id: string;
                    email: string;
                    name: string;
                    password: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
            }>;
            createCategory: (_: any, { name }: any, context: any) => Promise<{
                id: string;
                name: string;
                userId: string;
                createdAt: Date;
                updatedAt: Date;
            }>;
            updateCategory: (_: any, { id, name }: any, context: any) => Promise<{
                id: string;
                name: string;
                userId: string;
                createdAt: Date;
                updatedAt: Date;
            }>;
            deleteCategory: (_: any, { id }: any, context: any) => Promise<boolean>;
            createTransaction: (_: any, { title, amount, type, categoryId, date }: any, context: any) => Promise<{
                category: {
                    id: string;
                    name: string;
                    userId: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                id: string;
                title: string;
                amount: number;
                type: string;
                userId: string;
                categoryId: string;
                date: Date;
                createdAt: Date;
                updatedAt: Date;
            }>;
            updateTransaction: (_: any, { id, title, amount, type, categoryId, date }: any, context: any) => Promise<{
                category: {
                    id: string;
                    name: string;
                    userId: string;
                    createdAt: Date;
                    updatedAt: Date;
                };
            } & {
                id: string;
                title: string;
                amount: number;
                type: string;
                userId: string;
                categoryId: string;
                date: Date;
                createdAt: Date;
                updatedAt: Date;
            }>;
            deleteTransaction: (_: any, { id }: any, context: any) => Promise<boolean>;
        };
    };
};
//# sourceMappingURL=schema.d.ts.map