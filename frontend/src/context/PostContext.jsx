import { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts, setPosts, loading, refreshPosts }}>
      {children}
    </PostContext.Provider>
  );
};