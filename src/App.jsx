import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Posts from './components/posts_components/Posts';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  return (
    <div className='App'>
      <Sidebar />
      <Posts />
    </div>
  );
}

export default App;
