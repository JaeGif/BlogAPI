import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Posts from './components/posts_components/Posts';
import Sidebar from './components/sidebar/Sidebar';
import Suggested from './components/suggested/Suggested';
import NewPost from './components/newPost/NewPost';
import './filters.css';
import UserPageLayout from './components/userPublicPage/UserPageLayout';
const UserContext = React.createContext(null);
const ApiContext = React.createContext(null);
const PathContext = React.createContext(null);
const ProfileContext = React.createContext(null);

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
  const [userProfile, setUserProfile] = useState(loggedInUser);
  const apiURL = import.meta.env.VITE_RAILWAY_URL;
  const localURL = import.meta.env.VITE_LOCAL_URL;
  const localPath = import.meta.env.VITE_LOCAL_PATH;
  const productionPath = import.meta.env.VITE_BASE_PATH;

  const refreshContent = () => {
    isRefresh ? setIsRefresh(false) : setIsRefresh(true);
  };
  const newPostModal = () => {
    isNewPostModal ? setIsNewPostModal(false) : setIsNewPostModal(true);
  };
  const toggleUserPageModal = () => {
    isUserPage ? setIsUserPage(false) : setIsUserPage(true);
  };
  const handleUserProfileCheckout = async (userId) => {
    console.log(localURL);
    const res = await fetch(`${localURL}/api/users/${userId}`, {
      mode: 'cors',
    });
    const data = await res.json();
    setUserProfile(data.user);
    toggleUserPageModal();
  };
  const goToHomePage = () => {
    // the default config is home page, so this function needs to
    // return the modals to their default configs only.
    setIsNewPostModal(false);
    setIsUserPage(false);
  };

  return (
    <ProfileContext.Provider value={handleUserProfileCheckout}>
      <PathContext.Provider value={localPath}>
        <UserContext.Provider value={loggedInUser}>
          <ApiContext.Provider value={localURL}>
            <div className='App'>
              <Sidebar
                newPostModal={newPostModal}
                openUserPageModal={toggleUserPageModal}
                goToHomePage={goToHomePage}
              />
              {isUserPage ? (
                <UserPageLayout isUserPage={isUserPage} user={userProfile} />
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
          </ApiContext.Provider>
        </UserContext.Provider>
      </PathContext.Provider>
    </ProfileContext.Provider>
  );
}

export { App, UserContext, ApiContext, PathContext, ProfileContext };
