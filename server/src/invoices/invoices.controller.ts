
import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoiceDto } from './dto/invoice.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  async getInvoices(): Promise<InvoiceDto[]> {
    console.log('GET /invoices called');
    return this.invoicesService.findAll();
  }

  @Get(':id')
  async getInvoiceById(@Param('id') id: string): Promise<InvoiceDto> {
    console.log(`GET /invoices/${id} called`);
    const invoice = await this.invoicesService.findOne(id);
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }
    return invoice;
  }
}
