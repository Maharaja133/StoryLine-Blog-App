import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { PostContext } from '../context/PostContext';
import Sidebar from '../components/Sidebar';

function HomePage() {
  const { user } = useContext(AuthContext);
  const { posts, setPosts, loading } = useContext(PostContext);
  const navigate = useNavigate();

  const handleEdit = (postId) => navigate(`/edit/${postId}`);

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await axios.delete(`/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 font-serif text-[#333]">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
        
        <div className="w-full md:w-2/3">
          {loading ? (
            <div className="text-gray-500 italic">
              <p>Loading posts...</p>
            </div>
          ) : (
            <div className="space-y-16">
              {posts.map((post) => (
                <article key={post._id} className="post-preview">
                  
                  <h2 className="text-3xl md:text-4xl text-black mb-4 font-normal leading-tight">
                    <Link to={`/posts/${post._id}`} className="hover:text-gray-600 transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  
                  <div className="text-lg text-gray-800 leading-relaxed mb-4">
                    {post.content.length > 250 
                      ? `${post.content.substring(0, 250)}... ` 
                      : `${post.content} `}
                    
                    {post.content.length > 250 && (
                      <Link to={`/posts/${post._id}`} className="text-[#0073aa] font-bold hover:underline text-base whitespace-nowrap">
                        Continue reading
                      </Link>
                    )}
                  </div>
                  
                  <div className="w-8 border-t border-gray-300 my-4"></div>

                  <div className="text-xs text-gray-500">
                    <p>
                      Posted on <strong>{formatDate(post.createdAt)}</strong> by <strong>{post.author?.username || 'Unknown'}</strong>
                    </p>
                    <p>
                      Tagged <span className="italic">Engineering, Education, Tech</span>
                      <span className="mx-2">|</span>
                      <Link to={`/posts/${post._id}`} className="hover:underline">Leave a comment</Link>
                    </p>
                    
                    {user && post.author?._id === user.userId && (
                      <div className="mt-2 space-x-4">
                        <button onClick={() => handleEdit(post._id)} className="text-[#0073aa] hover:underline">Edit</button>
                        <button onClick={() => handleDelete(post._id)} className="text-red-700 hover:underline">Delete</button>
                      </div>
                    )}
                  </div>

                </article>
              ))}
            </div>
          )}
        </div>

        <Sidebar />

      </div>
    </div>
  );
}

export default HomePage;