import { useState, useContext } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../context/PostContext';

function CreatePostPage() {
  const [form, setForm] = useState({ title: '', content: '' });
  const navigate = useNavigate();
  
  const { refreshPosts } = useContext(PostContext); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); 

      await axios.post('/posts', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      await refreshPosts(); 

      navigate('/');
    } catch (err) {
      console.error('Error creating post:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to create post');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-serif text-[#333]">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl text-black font-normal mb-2">Create New Post</h1>
        <p className="text-gray-600 text-sm italic">Share your thoughts and academic insights.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
            Post Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter a descriptive title..."
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 focus:outline-none focus:border-gray-500 bg-white font-serif text-lg text-gray-900"
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="Write your article here..."
            value={form.content}
            onChange={handleChange}
            required
            rows={12}
            className="w-full p-4 border border-gray-300 focus:outline-none focus:border-gray-500 bg-white font-serif text-base text-gray-800 leading-relaxed resize-y min-h-[300px]"
          />
        </div>
        
        <div className="pt-4 border-t border-gray-300">
          <button
            type="submit"
            className="bg-[#333] hover:bg-black text-white px-8 py-3 text-sm font-bold transition-colors cursor-pointer"
          >
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePostPage;