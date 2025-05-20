import { PrismaService } from 'prisma/prisma.service';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    validateUser(email: string, password: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
    } | null>;
}
