import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Breadcrumbs,
  Link,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { fetchInvoices } from '../api/invoices';
import type { Invoice } from '../api/invoices';

const menuItems = ['Home', 'Invoices', 'Bills', 'Expenses', 'Reports'];
const headers = ['Date', 'Payee', 'Description', 'Due Date', 'Amount', 'Status'];

const InvoiceList = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const data = await fetchInvoices();
        setInvoices(data);
        setError('');
      } catch (err: any) {
        setError(err.message || 'Failed to fetch invoices.');
        setInvoices([]);
      }
    };
    loadInvoices();
  }, []);

  const handleRowClick = (id: string) => {
    navigate(`/invoices/${id}`);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      
      <Box
        sx={{
          flex: '0 0 240px',
          backgroundColor: '#eef2ff',
          padding: 3,
          borderRight: '1px solid #ccc',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'black',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            textAlign: 'center',
            padding: 4,
            mb: 4,
          }}
        >
          LOGO
        </Box>
        {menuItems.map((item) => (
          <Box
            key={item}
            sx={{ pl: 1, fontSize: '1.25rem', fontWeight: 500, mb: 2 }}
          >
            {item}
          </Box>
        ))}
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, padding: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb" sx={{ ml: 1 }}>
            <Link underline="hover" color="inherit" href="#">
              Home
            </Link>
            <Typography color="text.primary">Invoices</Typography>
          </Breadcrumbs>
        </Box>

        <Typography variant="h3" fontWeight="bold" mb={4}>
          Invoices
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TableContainer component={Paper} sx={{ height: '100%', boxShadow: 3 }}>
          <Table sx={{ minWidth: '1400px' }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#eef2ff' }}>
                {headers.map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      padding: '20px 40px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow
                  key={invoice.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleRowClick(invoice.id)}
                >
                  <TableCell sx={{ padding: '20px 40px', fontSize: '1.1rem' }}>
                    {invoice.date}
                  </TableCell>
                  <TableCell sx={{ padding: '20px 40px', fontSize: '1.1rem' }}>
                    {invoice.payee}
                  </TableCell>
                  <TableCell sx={{ padding: '20px 40px', fontSize: '1.1rem' }}>
                    {invoice.description}
                  </TableCell>
                  <TableCell sx={{ padding: '20px 40px', fontSize: '1.1rem' }}>
                    {invoice.due}
                  </TableCell>
                  <TableCell sx={{ padding: '20px 40px', fontSize: '1.1rem' }}>
                    ${invoice.amount}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: '20px 40px',
                      fontSize: '1.1rem',
                      color: invoice.status === 'Paid' ? 'green' : 'orange',
                      fontWeight: 'bold',
                    }}
                  >
                    {invoice.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default InvoiceList;
