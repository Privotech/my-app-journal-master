import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5001/api';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.imageUrl) {
            data.imageUrl = `http://localhost:5001${data.imageUrl}`;
          }
          setPost(data);
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

  if (loading) {
    return <div className="text-center text-teal-800 text-2xl mt-10">Loading...</div>;
  }

  if (!post) {
    return <div className="text-center text-teal-800 text-2xl mt-10">Post not found.</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {post.imageUrl && (
          <img src={post.imageUrl} alt={post.title} className="w-full h-96 object-cover" />
        )}
        <div className="p-8">
          <h1 className="text-4xl font-bold text-teal-800 mb-4">{post.title}</h1>
          <p className='text-gray-500 text-sm mb-2'>By Privilege oyegbile</p>
          <p className='text-gray-500 text-sm mb-2'>{formatDate(post.createdAt)}</p>
          <p className="text-gray-700 text-lg leading-relaxed">{post.content}</p>
          <div className="mt-8">
            <Link
              to="/"
              className="text-teal-500 hover:text-teal-700 transition-colors"
            >
              &larr; Back to all posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;