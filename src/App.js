import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import AddPost from './Components/AddPost';
import EditPost from './Components/EditPost';
import PostDetail from './Components/PostDetail';
import { useEffect } from 'react';

function App() {
    useEffect(() => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      })
    })
  }
}, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post/:id' element={<PostDetail />} />
        <Route path='/add' element={<AddPost />} />
        <Route path='/edit/:id' element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;