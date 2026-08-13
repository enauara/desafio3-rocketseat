export declare const generateToken: (userId: string) => string;
export declare const verifyToken: (token: string) => {
    userId: string;
} | null;
export declare const requireAuth: (context: any) => any;
//# sourceMappingURL=auth.d.ts.map