import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const PostDetails = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useContext(AuthContext);
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setPost(res.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch post', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`/posts/${id}/comments`, 
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setPost(res.data);
      setCommentText('');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-20 font-serif text-gray-500 italic min-h-screen">
      <p>Loading post...</p>
    </div>
  );

  if (error || !post) return (
    <div className="max-w-4xl mx-auto px-4 py-20 font-serif text-[#333]">
      <h3 className="text-2xl mb-4 text-black">{error || 'Post not found'}</h3>
      <button onClick={() => window.location.reload()} className="bg-[#333] text-white px-6 py-2 text-sm font-bold">Try Again</button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-[#333] min-h-screen">
      <article>
        <header className="mb-10">
          <h1 className="text-3xl md:text-5xl font-normal text-black mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="text-sm text-gray-500">
            <p>
              Posted on <strong>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong> by <strong>{post.author?.username || 'Anonymous'}</strong>
            </p>
          </div>
        </header>

        <div className="text-lg text-gray-800 leading-relaxed mb-12 ">
          {post.content.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-6">{paragraph}</p>
          ))}
        </div>

        <hr className="border-t border-gray-200 mb-6" />

        {post.comments && post.comments.length > 0 && (
          <div className="mb-10">
            <h3 className="text-lg text-gray-800 mb-6 font-bold">Comments ({post.comments.length})</h3>
            <div className="space-y-6">
              {post.comments.map((comment) => (
                <div key={comment._id} className="bg-gray-50 p-4 border border-gray-200">
                  <p className="text-gray-800 mb-2">{comment.text}</p>
                  <p className="text-xs text-gray-500">
                    — <strong>{comment.author?.username || 'Unknown'}</strong> on {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-12">
          <div className="border-t-[3px] border-b border-gray-400 py-2 mb-6">
            <h3 className="text-lg text-gray-600 uppercase tracking-widest font-normal">Leave a Comment</h3>
          </div>
          
          {isAuthenticated ? (
            <form onSubmit={handleCommentSubmit} className="border border-gray-300 bg-white p-4">
              <textarea 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
                className="w-full min-h-[100px] resize-y outline-none font-serif text-gray-800 placeholder-gray-400"
                placeholder="Write a comment..."
              ></textarea>
              <div className="flex justify-end mt-2">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="border border-gray-300 px-6 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Posting...' : 'Comment'}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-gray-50 p-6 text-center border border-gray-200">
              <p className="text-gray-600 mb-2">You must be logged in to leave a comment.</p>
              <Link to="/login" className="text-[#0073aa] font-bold hover:underline">Log in here</Link>
            </div>
          )}
        </div>

      </article>
    </div>
  );
};

export default PostDetails;