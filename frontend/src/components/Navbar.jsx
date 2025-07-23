import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

function NavBar() {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-900 text-gray-100 shadow-md">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="p-2 text-4xl font-bold text-gray-100 hover:text-white tracking-wide"
        >
         <strong className='text-5xl'>StoryLine</strong> Blog Application
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-white transition">Posts</Link>
          <Link to="/about" className="hover:text-white transition">About</Link>
          {isAuthenticated && (
            <Link to="/create" className="hover:text-white transition">Create</Link>
          )}
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-400">Hi, {user?.username}</span>
              <button
                onClick={handleLogout}
                className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-white transition">Login</Link>
              <Link to="/register" className="hover:text-white transition">Register</Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-gray-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4 space-y-3 text-sm">
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block">About</Link>
          {isAuthenticated && (
            <Link to="/create" onClick={() => setMenuOpen(false)} className="block">Create</Link>
          )}
          {isAuthenticated ? (
            <>
              <div className="text-gray-400">Hi, {user?.username}</div>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block">Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="block">Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default NavBar;
