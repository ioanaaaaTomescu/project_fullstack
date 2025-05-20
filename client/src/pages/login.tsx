import React, { useState } from 'react';
import { login } from '../api/auth';
//intialize component:
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      //setShowModal(true); this is my modification!!!
      navigate('/invoices');

    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="mb-4 text-2xl font-bold">Login Page</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Login
        </button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </form>

      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold text-green-600 mb-2">✅ Login Successful</h2>
            <p className="text-gray-700 mb-4">Welcome back!</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
