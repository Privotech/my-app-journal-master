import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Post from "./Post";
import usePosts from "../usePosts";
import { useAuth } from "../useAuth";

const Home = () => {
  const { posts, deletePost } = usePosts();
  const { user } = useAuth();
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
        .slice(0, 5); 
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, posts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to Your Journal</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Hello, {user?.username}! Capture your thoughts, preserve your memories, and track your personal growth journey.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                View All Posts ({posts.length})
              </button>
              <Link
                to="/add"
                className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors inline-flex items-center"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Write New Entry
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20 text-white opacity-20" fill="currentColor" viewBox="0 0 1440 320">
            <path fill="currentColor" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,133.3C960,128,1056,96,1152,90.7C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search your journal entries..."
              className="w-full p-4 rounded-xl shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-500 transition duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                Clear
              </button>
            )}
          </div>
          {suggestions.length > 0 && (
            <ul className="bg-white shadow-lg rounded-xl mt-2 overflow-hidden">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="p-3 hover:bg-blue-50 cursor-pointer transition-colors"
                  onClick={() => setSearchTerm(suggestion.title)}
                >
                  {suggestion.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Posts Section */}
        {filteredPosts.length > 0 ? (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Journal Entries</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Post key={post.id} post={post} deletePost={deletePost} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-8">
              <svg className="h-24 w-24 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              {searchTerm ? "No entries found matching your search" : "No journal entries yet"}
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              {searchTerm 
                ? "Try adjusting your search terms or browse all your entries."
                : "Start documenting your journey by writing your first journal entry."}
            </p>
            {!searchTerm && (
              <Link
                to="/add"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-colors inline-flex items-center"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Write Your First Entry
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;