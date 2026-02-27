import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePostPage from './pages/CreatePostPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import EditPostPage from './pages/EditPostPage';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import PostDetails from './pages/PostDetails';
import { PostProvider } from './context/PostContext';

function App() {
  return (
    <PostProvider>
      {/* 1. Flex container that takes up at least the full screen height */}
      <div className="flex flex-col min-h-screen bg-white">
        
        <Navbar />
        
        {/* 2. Main content wrapper that "grows" to fill empty space */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreatePostPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditPostPage />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/posts/:id" element={<PostDetails />} />
          </Routes>
        </main>
        
        <Footer />  

      </div>
    </PostProvider>
  );
}

export default App;