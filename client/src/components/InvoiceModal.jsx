import React, { useState } from 'react';

const InvoiceModal = ({ invoice, onClose }) => {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl mb-4">Invoice Details</h2>
        <p><strong>Payee:</strong> {invoice.payee}</p>
        <p><strong>Description:</strong> {invoice.description}</p>
        <p><strong>Due Date:</strong> {invoice.dueDate}</p>
        <p><strong>Amount:</strong> {invoice.amount}</p>
        <p><strong>Status:</strong> {invoice.status}</p>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Close</button>
      </div>
    </div>
  );
};

export default InvoiceModal;