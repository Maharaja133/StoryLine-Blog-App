import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';

function EditPostPage() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setForm({ title: res.data.title, content: res.data.content });
      })
      .catch((err) => {
        alert('Failed to load post');
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/posts/${id}`, form);
      navigate('/');
    } catch (err) {
      alert('Failed to update post');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Edit Post</h2>
          <p className="text-gray-500">Update your story below</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Post Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter post title"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition duration-200 placeholder-gray-400 text-gray-700"
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write your content here..."
              required
              rows={15}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition duration-200 placeholder-gray-400 text-gray-700 resize-y min-h-[300px]"
            />
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPostPage;
