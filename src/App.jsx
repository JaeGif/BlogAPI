import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import './assets/filters/filters.css';
import Posts from './components/posts_components/Posts';
import Sidebar from './components/sidebar/Sidebar';
import Suggested from './components/suggested/Suggested';
import NewPost from './components/newPost/NewPost';

function App() {
  const [isNewPostModal, setIsNewPostModal] = useState(false);

  return (
    <div className='App'>
      <Sidebar />
      <Posts />
      <Suggested />
      {isNewPostModal ? <NewPost /> : <></>}
    </div>
  );
}

export default App;
