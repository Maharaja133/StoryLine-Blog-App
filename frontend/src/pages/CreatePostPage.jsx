import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

function CreatePostPage() {
  const [form, setForm] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token'); // or useContext if you store it there

    await axios.post('/posts', form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    navigate('/');
  } catch (err) {
    console.error('Error creating post:', err.response?.data || err.message);
    alert(err.response?.data?.message || 'Failed to create post');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create New Post</h2>
          <p className="text-gray-500">Share your thoughts with the world</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Post Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="What's your post about?"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition duration-200 placeholder-gray-400 text-gray-700"
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="Write your amazing content here..."
              value={form.content}
              onChange={handleChange}
              required
              rows={10}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition duration-200 placeholder-gray-400 text-gray-700 resize-y min-h-[200px]"
            />
          </div>
          
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
              </svg>
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePostPage;
