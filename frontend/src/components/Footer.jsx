import logo from '../assets/logo.png';

function Footer() {
  return (
    <footer className="bg-white text-gray-600 py-10 px-4 mt-16  font-serif">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <span>© {new Date().getFullYear()} Maharaja Prabhu's Blog</span>
        </div>

        <div className="text-gray-500">
          Developed by <strong>Maharaja Prabhu</strong>
        </div>

      </div>
    </footer>
  );
}

export default Footer;