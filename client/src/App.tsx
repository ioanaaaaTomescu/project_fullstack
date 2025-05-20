import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InvoiceList from './components/InvoiceList';
import Login from './pages/login';
import InvoiceDetails from './components/InvoiceDetails';

//import Invoices from './pages/invoices';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/invoices" element={<InvoiceList />} />
        <Route path="/invoices/:id" element={<InvoiceDetails />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
