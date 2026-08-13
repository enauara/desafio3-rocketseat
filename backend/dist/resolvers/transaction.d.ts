export declare const transactionResolvers: {
    Query: {
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
//# sourceMappingURL=transaction.d.ts.map