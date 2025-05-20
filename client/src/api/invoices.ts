import axios from 'axios';

export interface Invoice {
  id: string;
  date: string;         
  payee: string;
  description: string;
  due: string;         
  amount: string;       
  status: string;       
}

export const fetchInvoices = async (): Promise<Invoice[]> => {
  const response = await axios.get('/api/invoices');

  return response.data.map((inv: any) => {
    return {
      id: inv.id,
      date: inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : 'N/A',
      payee: inv.vendorName ?? 'Unknown',
      description: inv.description ?? '',
      due: inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : 'N/A',
      amount: parseFloat(inv.amount.replace('$', '')).toFixed(2),
      status: inv.status === 'Paid' ? 'Paid' : 'Unpaid',
    };
  });
};

export const fetchInvoiceById = async (id: string): Promise<Invoice> => {
  try {
    const response = await axios.get(`/api/invoices/${id}`);
    const inv = response.data;
    
    return {
      id: inv.id,
      date: inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : 'N/A',
      payee: inv.vendorName ?? 'Unknown',
      description: inv.description ?? '',
      due: inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : 'N/A',
      amount: parseFloat(inv.amount.replace('$', '')).toFixed(2),
      status: inv.status === 'Paid' ? 'Paid' : 'Unpaid',
    };
  } catch (err: any) {
    console.error('Error fetching invoice by ID:', err);
    throw new Error(err.response?.data?.message || 'Invoice not found');
  }
};

