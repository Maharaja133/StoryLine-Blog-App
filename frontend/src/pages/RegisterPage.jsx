import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

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
      alert(err.response?.data?.message || 'Registration Error');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 font-serif text-[#333]">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl text-black font-normal mb-2">Create Account</h2>
        <p className="text-gray-600 text-sm italic">Join the community to start writing and commenting.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 focus:outline-none focus:border-gray-500 bg-white font-serif text-lg text-gray-900"
          />
        </div>

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
            Register
          </button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-300 text-sm text-gray-600">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-bold text-[#0073aa] hover:underline transition-colors"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;