import { useState, useContext } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', form);
      login(res.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 font-serif text-[#333]">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl text-black font-normal mb-2">Welcome Back</h2>
        <p className="text-gray-600 text-sm italic">Sign in to your account.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 focus:outline-none focus:border-gray-500 bg-white font-serif text-lg text-gray-900"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 focus:outline-none focus:border-gray-500 bg-white font-serif text-lg text-gray-900"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-[#333] hover:bg-black text-white py-3 px-4 text-sm font-bold transition-colors cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-300 text-sm text-gray-600">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="font-bold text-[#0073aa] hover:underline transition-colors"
        >
          Create account
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;