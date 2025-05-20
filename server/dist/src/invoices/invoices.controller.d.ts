import { InvoicesService } from './invoices.service';
import { InvoiceDto } from './dto/invoice.dto';
export declare class InvoicesController {
    private readonly invoicesService;
    constructor(invoicesService: InvoicesService);
    getInvoices(): Promise<InvoiceDto[]>;
    getInvoiceById(id: string): Promise<InvoiceDto>;
}
