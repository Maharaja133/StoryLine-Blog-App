import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';

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
    <div className="max-w-4xl mx-auto mt-10 px-4 text-gray-100">
      <h2 className="text-3xl text-gray-900 font-bold mb-6 text-center">All Posts</h2>
      {posts.length === 0 ? (
        <p className="text-center text-gray-400">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-gray-100 rounded-xl p-6 mb-6 shadow-md"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 ">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <p className="text-sm text-gray-700 mb-4 italic">
              by {post.author?.username || 'Unknown'}
            </p>

            {user && post.author?._id === user.userId && (
              <div className="space-x-4">
                <button
                  onClick={() => handleEdit(post._id)}
                  className="px-4 py-1 bg-gray-700 hover:bg-gray-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="px-4 py-1 bg-gray-700 hover:bg-gray-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default HomePage;
