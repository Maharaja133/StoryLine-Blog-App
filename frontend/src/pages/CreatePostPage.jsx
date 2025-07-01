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
    <div className="min-h-screen flex items-center justify-center bg-gray text-gray-100 px-4">
      <div className="max-w-2xl w-full bg-gray-100 text-gray-900 p-8 rounded-2xl shadow-lg mt-20">
        <h2 className="text-3xl font-semibold mb-6 text-center">Create New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Post Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-200 border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <textarea
            name="content"
            placeholder="Write your content here..."
            value={form.content}
            onChange={handleChange}
            required
            rows={10}
            className="w-full px-4 py-2 rounded-lg bg-gray-200 border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
          />
          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2 rounded-lg transition"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostPage;
