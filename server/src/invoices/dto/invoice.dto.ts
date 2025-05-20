export class InvoiceDto {
  id: string;           
  vendorName: string;
  description: string;
  dueDate: string;      
  amount: string;       
  status: 'Paid' | 'Open';
  userId: string;
}
