import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post, deletePost }) => {
  const truncateContent = (content) => {
    if (content.length > 100) {
      return content.substring(0, 100) + '...';
    }
    return content;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const postId = post._id || post.id;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
      {post.imageUrl && (
        <Link to={`/post/${postId}`}>
          <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
        </Link>
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-teal-800 mb-2">{post.title}</h2>
        <p className='text-gray-500 text-sm mb-2'>By Privilege oyegbile</p>
        <p className='text-gray-500 text-sm mb-2'>{formatDate(post.createdAt)}</p>
        <p className="text-gray-700 mb-4">{truncateContent(post.content)}</p>
        <div className="flex justify-between items-center">
          <Link to={`/post/${postId}`} className="text-teal-500 hover:text-teal-700 font-semibold">Read More &rarr;</Link>
          <div>
            <Link to={`/edit/${postId}`} className="text-blue-500 hover:text-blue-700 mr-4">Edit</Link>
            <button onClick={() => deletePost(postId)} className="text-red-500 hover:text-red-700">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;