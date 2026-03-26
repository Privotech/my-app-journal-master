import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePosts from '../usePosts';

const AddPost = () => {
  const { addPost } = usePosts();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addPost({ title, content, image });
    if (success) {
      setTitle('');
      setContent('');
      setImage(null);
      setImagePreview(null);
      // Redirect to home page after adding post
      navigate('/');
    } else {
      alert('Failed to add post. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-teal-500">Add a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="my-2">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
          />
        </div>
        <div className="my-2">
          <label className="block text-gray-700">Content</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mt-1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Post content"
          ></textarea>
        </div>
        <div className="my-2">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            className="w-full p-2 border border-gray-300 rounded mt-1"
            onChange={handleImageChange}
          />
        </div>
        {imagePreview && (
          <div className="my-2">
            <img src={imagePreview} alt="Preview" className="w-full h-auto rounded" />
          </div>
        )}
        <button type="submit" className="bg-teal-500 text-white p-2 rounded hover:bg-teal-600 transition-colors">
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;