import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5001/api';

const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/posts`);
      const data = await response.json();
      const postsWithFullUrls = data.map(post => ({
        ...post,
        imageUrl: post.imageUrl ? `http://localhost:5001${post.imageUrl}` : ''
      }));
      setPosts(postsWithFullUrls);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (post) => {
    try {
      setLoading(true);
      console.log('Adding post with data:', { title: post.title, content: post.content, hasImage: !!post.image });
      
      const formData = new FormData();
      formData.append('title', post.title);
      formData.append('content', post.content);
      if (post.image) {
        formData.append('image', post.image);
        console.log('Image file details:', {
          name: post.image.name,
          size: post.image.size,
          type: post.image.type
        });
      }

      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        body: formData,
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        const newPost = await response.json();
        if (newPost.imageUrl) {
          newPost.imageUrl = `http://localhost:5001${newPost.imageUrl}`;
        }
        setPosts([newPost, ...posts]);
        console.log('Post added successfully:', newPost);
        return true;
      } else {
        const errorText = await response.text();
        console.error('Failed to add post. Status:', response.status);
        console.error('Error response:', errorText);
        return false;
      }
    } catch (error) {
      console.error('Error adding post:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (updatedPost) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', updatedPost.title);
      formData.append('content', updatedPost.content);
      if (updatedPost.image instanceof File) {
        formData.append('image', updatedPost.image);
      }

      const response = await fetch(`${API_BASE_URL}/posts/${updatedPost.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const updated = await response.json();
        if (updated.imageUrl) {
          updated.imageUrl = `http://localhost:5001${updated.imageUrl}`;
        }
        setPosts(posts.map((post) => (post.id === updated.id ? updated : post)));
      }
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return { posts, addPost, deletePost, updatePost, loading };
};

export default usePosts;