import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePosts from "../usePosts";

const API_BASE_URL = 'http://localhost:5001/api';

const EditPost = () => {
  const { id } = useParams();
  const { updatePost } = usePosts();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
          setTitle(data.title);
          setContent(data.content);
          setImagePreviewUrl(data.imageUrl || "");
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = {
      id: post._id,
      title,
      content,
      image: imageFile,
    };
    
    await updatePost(updatedPost);
    navigate("/");
  };

  if (loading) {
    return <div className="text-center text-teal-800 text-2xl mt-10">Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-teal-700 mb-8">Edit Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="title" className="block text-teal-700 font-bold mb-2 text-lg">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-teal-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="content" className="block text-teal-700 font-bold mb-2 text-lg">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-teal-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-500 h-32"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="imageUpload" className="block text-teal-700 font-bold mb-2 text-lg">
              Upload Image
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-teal-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
            />
            {imagePreviewUrl && (
              <div className="mt-4">
                <img src={imagePreviewUrl} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;