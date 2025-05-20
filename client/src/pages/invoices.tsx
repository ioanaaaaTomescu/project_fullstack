import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Invoice {
  id: string;
  vendor_name: string;
  amount: number;
  due_date: string;
  description: string;
  paid: boolean;
}

const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('/api/invoices')
      .then((response) => {
        setInvoices(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch invoices');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading invoices...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Invoices</h1>
      <ul>
        {invoices.map(invoice => (
          <li key={invoice.id}>
            <strong>{invoice.vendor_name}</strong> - ${invoice.amount.toFixed(2)} - Due: {new Date(invoice.due_date).toLocaleDateString()} - {invoice.paid ? 'Paid' : 'Unpaid'}
            <p>{invoice.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Invoices;
