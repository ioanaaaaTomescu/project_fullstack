import { PrismaService } from 'prisma/prisma.service';
import { InvoiceDto } from './dto/invoice.dto';
export declare class InvoicesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<InvoiceDto[]>;
    findOne(id: string): Promise<InvoiceDto | null>;
}
