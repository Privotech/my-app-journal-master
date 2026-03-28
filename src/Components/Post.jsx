import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post, deletePost }) => {
  const truncateContent = (content) => {
    if (content.length > 150) {
      return content.substring(0, 150) + '...';
    }
    return content;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const postId = post._id || post.id;

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl">
      {post.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-2">{post.title}</h3>
          <div className="flex space-x-2 ml-4">
            <Link
              to={`/edit/${postId}`}
              className="text-blue-600 hover:text-blue-800 transition-colors"
              title="Edit post"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </Link>
            <button
              onClick={() => deletePost(postId)}
              className="text-red-600 hover:text-red-800 transition-colors"
              title="Delete post"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {truncateContent(post.content)}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {formatDate(post.createdAt)}
          </span>
          <Link
            to={`/post/${postId}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Read More
            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;