import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

function NavBar() {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const tabClass = (path) => `
    px-6 py-2 text-sm font-bold transition-colors cursor-pointer border-r border-gray-300 last:border-r-0
    ${isActive(path) ? 'bg-[#222] text-white' : 'text-gray-700 hover:bg-gray-100'}
  `;

  return (
    <header className="bg-white text-gray-800 font-serif">
      <div className="max-w-4xl mx-auto px-4 pt-12 pb-6">
        
        <div className="text-center mb-6">
          <Link to="/" className="text-4xl md:text-5xl font-normal tracking-wide text-gray-900 hover:text-gray-600 transition">
            Maharaja Prabhu's Blog
          </Link>
        </div>

        <nav className="border-t border-b-3 border-b-black border-gray-300 flex justify-between items-center relative">
          
          <div className="hidden md:flex items-center">
            <Link to="/" className={tabClass('/')}>Blog Home</Link>
            <Link to="/about" className={tabClass('/about')}>About</Link>
            {isAuthenticated && (
              <Link to="/create" className={tabClass('/create')}>Create Post</Link>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4 pr-2 text-sm text-gray-600">
            {isAuthenticated ? (
              <>
                <span>Hi, {user?.username}</span>
                <button onClick={handleLogout} className="hover:text-black hover:underline transition">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-black hover:underline transition">Login</Link>
                <Link to="/register" className="hover:text-black hover:underline transition">Register</Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-gray-800 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden border-b border-gray-300 bg-gray-50 flex flex-col text-sm">
            <Link to="/" onClick={() => setMenuOpen(false)} className="px-4 py-3 border-b border-gray-200">Blog Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="px-4 py-3 border-b border-gray-200">About</Link>
            {isAuthenticated && (
              <Link to="/create" onClick={() => setMenuOpen(false)} className="px-4 py-3 border-b border-gray-200">Create Post</Link>
            )}
            {isAuthenticated ? (
              <div className="px-4 py-3 flex justify-between text-gray-600">
                <span>Hi, {user?.username}</span>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="font-bold">Logout</button>
              </div>
            ) : (
              <div className="flex flex-col">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="px-4 py-3 border-b border-gray-200">Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="px-4 py-3">Register</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default NavBar;