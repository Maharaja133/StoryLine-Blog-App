import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate,Link } from 'react-router-dom';

function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray text-gray-100 px-4">
      <div className="w-full max-w-md bg-gray-100 text-gray-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-200 border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 "
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-200 border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-200 border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2 rounded-lg transition shadow-md"
          >
            Register
          </button>
        </form>
          <p className="mt-4 text-sm text-gray-500 text-center">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-gray-800 hover:underline hover:text-black transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
