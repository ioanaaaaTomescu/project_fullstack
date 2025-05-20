import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface Invoice {
  id: string;
  date: string;
  payee: string;
  description: string;
  dueDate: string;
  amount: string;
  status: string;
}

const initialState: Invoice[] = [];

export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    setInvoices: (state, action: PayloadAction<Invoice[]>) => {
      return action.payload;
    },
  },
});

export const { setInvoices } = invoicesSlice.actions;
export default invoicesSlice.reducer;
