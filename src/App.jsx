import { useState } from 'react';
import './App.css';
import './assets/filters/filters.css';
import Posts from './components/posts_components/Posts';
import Sidebar from './components/sidebar/Sidebar';
import Suggested from './components/suggested/Suggested';
import NewPost from './components/newPost/NewPost';

function App() {
  const [isNewPostModal, setIsNewPostModal] = useState(false);
  const newPostModal = () => {
    isNewPostModal ? setIsNewPostModal(false) : setIsNewPostModal(true);
  };

  return (
    <div className='App'>
      <Sidebar newPostModal={newPostModal} />
      <Posts />
      <Suggested />
      {isNewPostModal ? <NewPost newPostModal={newPostModal} /> : <></>}
    </div>
  );
}

export default App;
