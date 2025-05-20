import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { fetchInvoiceById } from '../api/invoices';
import type { Invoice } from '../api/invoices';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Breadcrumbs,
  Link,
} from '@mui/material';

const InvoiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvoice = async () => {
      try {
        const data = await fetchInvoiceById(id!);
        setInvoice(data);
        setError('');
      } catch (err: any) {
        setError(err.message || 'Failed to fetch invoice.');
      } finally {
        setLoading(false);
      }
    };
    loadInvoice();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!invoice) return null;

  return (
    <Box p={4}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/">
          Home
        </Link>
        <Link component={RouterLink} to="/invoices">
          Invoices
        </Link>
        <Typography color="text.primary">{invoice.id}</Typography>
      </Breadcrumbs>

      <Typography variant="h4" gutterBottom>
        Invoice #{invoice.id}
      </Typography>

      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="body1">
          <strong>Payee:</strong> {invoice.payee}
        </Typography>
        <Typography variant="body1">
          <strong>Description:</strong> {invoice.description}
        </Typography>
        <Typography variant="body1">
          <strong>Date:</strong> {invoice.date}
        </Typography>
        <Typography variant="body1">
          <strong>Due Date:</strong> {invoice.due}
        </Typography>
        <Typography variant="body1">
          <strong>Amount:</strong> ${invoice.amount}
        </Typography>
        <Typography variant="body1">
          <strong>Status:</strong>{' '}
          <span style={{ color: invoice.status === 'Paid' ? 'green' : 'orange' }}>
            {invoice.status}
          </span>
        </Typography>
      </Paper>
    </Box>
  );
};

export default InvoiceDetail;
