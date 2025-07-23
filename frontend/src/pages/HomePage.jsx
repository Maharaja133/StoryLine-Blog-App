import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/posts');
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = (postId) => {
    navigate(`/edit/${postId}`);
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await axios.delete(`/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  return (
    <div className="max-w-4xl min-h-screen mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
        All Posts
        <div className="mt-2 h-1 w-20 bg-indigo-400 mx-auto rounded-full"></div>
      </h2>

      {posts.length === 0 ? (
        <div className=" flex items-center justify-center bg-gray-50">
          <div className="text-center p-6 max-w-md">
            <div className="animate-pulse flex justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Waking up the backend...</h3>
            <p className="text-gray-500">
              Just a moment while we wake up the server...
            </p>
            <p className="text-blue-600 text-sm mt-1">
                (Our backend is hosted on Render's free tier and may take 30-60 seconds to load)
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  {post.title}
                </h3>
                <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {post.content.length > 200 
                  ? `${post.content.substring(0, 200)}...` 
                  : post.content}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <span className="text-indigo-600 text-sm font-medium">
                      {post.author?.username?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    by {post.author?.username || 'Unknown'}
                  </p>
                </div>

                {user && post.author?._id === user.userId && (
                  <div className="space-x-3">
                    <button
                      onClick={() => handleEdit(post._id)}
                      className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                )}
                <Link
                  to={`/posts/${post._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Read More
                </Link>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
