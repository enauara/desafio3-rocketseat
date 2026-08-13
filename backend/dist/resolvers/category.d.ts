export declare const categoryResolvers: {
    Query: {
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
    };
    Mutation: {
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
    };
};
//# sourceMappingURL=category.d.ts.map