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

function App() {
  return (
      <>
      <Navbar />
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
      <Footer />
      </>
  );
}

export default App;
