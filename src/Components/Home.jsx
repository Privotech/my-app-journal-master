import React, { useState, useEffect } from "react";
import Post from "./Post";
import usePosts from "../usePosts";

const Home = () => {
  const { posts, deletePost } = usePosts();
  const [searchTerm, setSearchTerm] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (searchTerm) {
      const filteredSuggestions = posts
        .filter(post => post.title.toLowerCase().startsWith(searchTerm.toLowerCase()))
        .slice(0, 5);  // Limit to 5 suggestions
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, posts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-extrabold text-teal-800">All Posts</h1>
      </div>
      <div className="mb-10 relative">
        <input
          type="text"
          placeholder="Search posts by title or content..."
          className="w-full p-4 rounded-lg shadow-md border border-teal-200 focus:outline-none focus:ring-3 focus:ring-teal-400 text-teal-800 placeholder-teal-500 transition duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-500 hover:text-teal-700"
          >
            Clear
          </button>
        )}
      </div>
      {suggestions.length > 0 && (
        <ul className="bg-white shadow-md rounded-md mt-2">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="p-3 hover:bg-teal-100 cursor-pointer"
              onClick={() => setSearchTerm(suggestion.title)}
            >
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.map((post) => (
            <Post key={post.id} post={post} deletePost={deletePost} />
          ))}
        </div>
      ) : (
        <div className="text-center text-teal-800 text-2xl">
          No posts found.
        </div>
      )}
    </div>
  );
};

export default Home;