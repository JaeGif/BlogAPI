import { useState } from 'react';
import './App.css';
import './assets/filters/filters.css';
import Posts from './components/posts_components/Posts';
import Sidebar from './components/sidebar/Sidebar';
import Suggested from './components/suggested/Suggested';
import NewPost from './components/newPost/NewPost';
import './assets/filters/filters.css';
import UserPublished from './components/userPublicPage/UserPublished';

function App() {
  const [isNewPostModal, setIsNewPostModal] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isUserPage, setIsUserPage] = useState(false);
  const refreshContent = () => {
    isRefresh ? setIsRefresh(false) : setIsRefresh(true);
  };
  const newPostModal = () => {
    isNewPostModal ? setIsNewPostModal(false) : setIsNewPostModal(true);
  };
  const openUserPageModal = () => {
    setIsUserPage(true);
  };
  const closeUserPageModal = () => {
    if (isUserPage) {
      setIsUserPage(false);
    }
  };
  const goToHomePage = () => {
    // the default config is home page, so this function needs to
    // return the modals to their default configs only.
    setIsNewPostModal(false);
    setIsUserPage(false);
  };

  return (
    <div className='App'>
      <Sidebar
        newPostModal={newPostModal}
        openUserPageModal={openUserPageModal}
        goToHomePage={goToHomePage}
      />
      {isUserPage ? (
        <UserPublished
          isUserPage={isUserPage}
          closeUserPageModal={closeUserPageModal}
        />
      ) : (
        <>
          <Posts refresh={isRefresh} refreshFn={refreshContent} />
          <Suggested />
        </>
      )}
      {isNewPostModal ? (
        <NewPost newPostModal={newPostModal} refresh={setIsRefresh} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
