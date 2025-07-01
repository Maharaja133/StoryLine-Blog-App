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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 px-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-center">Edit Post</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Post title"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Post content"
            required
            rows={15}
            className="w-full h-[50vh] px-4 py-3 resize-none rounded-lg bg-gray-100 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPostPage;
