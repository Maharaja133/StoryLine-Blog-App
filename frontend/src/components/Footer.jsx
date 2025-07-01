import logo from '../assets/logo.jpg';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-4 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="logo" className="h-6 w-6" />
          <span className="text-sm text-gray-400">© {new Date().getFullYear()} All rights reserved</span>
        </div>
        <div className="text-sm mt-4 sm:mt-0">
          <strong className='text-xl'>StoryLine</strong> a MERN Blop-App developed by Maharaja Prabhu.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
