import React, { useState, useContext } from 'react';
import './App.css';
import './assets/filters/filters.css';
import Posts from './components/posts_components/Posts';
import Sidebar from './components/sidebar/Sidebar';
import Suggested from './components/suggested/Suggested';
import NewPost from './components/newPost/NewPost';
import './assets/filters/filters.css';
import UserPageLayout from './components/userPublicPage/UserPageLayout';
const UserContext = React.createContext(null);

function App() {
  const [isNewPostModal, setIsNewPostModal] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isUserPage, setIsUserPage] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({
    avatar: {
      id: '9263f45c70879dbc56faa5c4',
      url: 'https://instaapi-production.up.railway.app/uploads/823fce52b33a845ef7554dd9/avatar.jpg',
    },
    _id: '823fce52b33a845ef7554dd9',
    firstName: 'Neal',
    lastName: 'Morissette',
    email: 'Tia_Kris@hotmail.com',
    userName: 'Eldridge_Feest40',
    isAdmin: false,
  });

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
    <UserContext.Provider value={loggedInUser}>
      <div className='App'>
        <Sidebar
          newPostModal={newPostModal}
          openUserPageModal={openUserPageModal}
          goToHomePage={goToHomePage}
        />
        {isUserPage ? (
          <UserPageLayout
            isUserPage={isUserPage}
            closeUserPageModal={closeUserPageModal}
            user={loggedInUser}
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
    </UserContext.Provider>
  );
}

export { App, UserContext };
