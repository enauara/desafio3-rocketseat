export declare const userResolvers: {
    Query: {
        me: (_: any, __: any, context: any) => Promise<{
            id: string;
            email: string;
            name: string;
            password: string;
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
    };
};
//# sourceMappingURL=user.d.ts.map