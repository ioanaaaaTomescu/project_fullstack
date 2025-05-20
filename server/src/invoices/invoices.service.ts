import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { InvoiceDto } from './dto/invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<InvoiceDto[]> {
    try {
      const raw = await this.prisma.invoice.findMany({
        orderBy: { due_date: 'desc' },
      });
      console.log('Raw invoices from DB:', raw);

      return raw.map(inv => ({
        id: inv.id,
        vendorName: inv.vendor_name,
        description: inv.description,
        dueDate: inv.due_date.toISOString(),
        amount: `$${inv.amount.toFixed(2)}`,
        status: inv.paid ? 'Paid' : 'Open',
        userId: inv.userId,
      }));
    } catch (err) {
      console.error('Prisma error on findAll invoices:', err);
      throw new InternalServerErrorException('Could not load invoices');
    }
  }

  async findOne(id: string): Promise<InvoiceDto | null> {
    try {
      const inv = await this.prisma.invoice.findUnique({
        where: { id },
      });
      if (!inv) return null;

      return {
        id: inv.id,
        vendorName: inv.vendor_name,
        description: inv.description,
        dueDate: inv.due_date.toISOString(),
        amount: `$${inv.amount.toFixed(2)}`,
        status: inv.paid ? 'Paid' : 'Open',
        userId: inv.userId,
      };
    } catch (err) {
      console.error('Prisma error on findOne invoice:', err);
      throw new InternalServerErrorException('Could not load invoice');
    }
  }
}
