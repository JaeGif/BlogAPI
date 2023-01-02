import { useState } from 'react';
import './App.css';
import './assets/filters/filters.css';
import Posts from './components/posts_components/Posts';
import Sidebar from './components/sidebar/Sidebar';
import Suggested from './components/suggested/Suggested';
import NewPost from './components/newPost/NewPost';
import './assets/filters/filters.css';

function App() {
  const [isNewPostModal, setIsNewPostModal] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const refreshContent = () => {
    isRefresh ? setIsRefresh(false) : setIsRefresh(true);
  };
  const newPostModal = () => {
    isNewPostModal ? setIsNewPostModal(false) : setIsNewPostModal(true);
  };

  return (
    <div className='App'>
      <Sidebar newPostModal={newPostModal} />
      <Posts refresh={isRefresh} refreshFn={refreshContent} />
      <Suggested />
      {isNewPostModal ? (
        <NewPost newPostModal={newPostModal} refresh={setIsRefresh} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
