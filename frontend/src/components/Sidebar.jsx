import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { PostContext } from '../context/PostContext';

function Sidebar() {
  const { isAuthenticated } = useContext(AuthContext);
  const { posts, loading } = useContext(PostContext);

  const recentPosts = posts.slice(0, 5);

  const recentComments = posts
    .flatMap(post => 
      (post.comments || []).map(comment => ({
        ...comment,
        postId: post._id,
        postTitle: post.title
      }))
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const formatSidebarDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <aside className="w-full md:w-1/3 font-serif space-y-10">
      
      {!isAuthenticated && (
        <div className="flex">
          <input 
            type="email" 
            placeholder="Type your email..." 
            className="w-full bg-gray-100 border border-gray-300 p-2 font-sans text-sm outline-none focus:border-gray-500"
          />
          <button className="bg-[#333] hover:bg-black text-white px-4 py-2 text-sm font-bold transition-colors">
            Register
          </button>
        </div>
      )}

      <div>
        <div className="border-t-[3px] border-b border-gray-400 py-2 mb-4">
          <h3 className="text-sm font-bold text-gray-600 uppercase tracking-widest">
            Recent Posts
          </h3>
        </div>
        
        <ul className="space-y-4">
          {loading ? (
             <li className="italic text-gray-400 text-sm">Loading posts...</li>
          ) : recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <li key={post._id} className="leading-tight">
                <Link to={`/posts/${post._id}`} className="text-[#0073aa] hover:underline font-bold text-sm">
                  {post.title}
                </Link>
                <div className="text-xs text-gray-500 mt-1">
                  {formatSidebarDate(post.createdAt)}
                </div>
              </li>
            ))
          ) : (
            <li className="italic text-gray-400 text-sm">No posts yet.</li>
          )}
        </ul>
      </div>

      <div>
        <div className="border-t-[3px] border-b border-gray-400 py-2 mb-4">
          <h3 className="text-sm font-bold text-gray-600 uppercase tracking-widest">
            Recent Comments
          </h3>
        </div>
        
        <ul className="space-y-3 text-sm text-gray-600">
          {loading ? (
             <li className="italic text-gray-400 text-sm">Loading comments...</li>
          ) : recentComments.length > 0 ? (
            recentComments.map((comment, idx) => (
              <li key={idx} className="leading-tight">
                <span className="font-bold">{comment.author?.username || 'Anonymous'}</span> on{' '}
                <Link to={`/posts/${comment.postId}`} className="text-[#0073aa] hover:underline">
                  {comment.postTitle}
                </Link>
              </li>
            ))
          ) : (
            <li className="italic text-gray-400">No comments yet.</li>
          )}
        </ul>
      </div>

    </aside>
  );
}

export default Sidebar;