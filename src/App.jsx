import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Posts from './components/posts_components/Posts';
import Sidebar from './components/sidebar/Sidebar';
import Suggested from './components/suggested/Suggested';
import NewPost from './components/newPost/NewPost';
import './filters.css';
import UserPageLayout from './components/userPublicPage/UserPageLayout';
import FullPost from './components/fullPost/FullPost';

const UserContext = React.createContext(null);
const ApiContext = React.createContext(null);
const PathContext = React.createContext(null);
const ProfileContext = React.createContext(null);
const PostContext = React.createContext(null);

function App() {
  const [isNewPostModal, setIsNewPostModal] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isUserPage, setIsUserPage] = useState(false);
  const [displayPost, setDisplayPost] = useState(false);
  const [postCheckout, setPostCheckout] = useState();
  const [postContentIsVideo, setPostContentIsVideo] = useState(false);
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
    recentSearches: [
      'c4d010ce73f9354bf41aa72d',
      '823fce52b33a845ef7554dd9',
      'c4d010ce73f9354bf41aa72d',
      'd4b51d5d9e0e47b2aefaf89d',
      'd4b51d5d9e0e47b2aefaf89d',
      'b45cbb77f719d4ed691f1041',
    ],
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
  const openUserPageModal = () => {
    setIsUserPage(true);
  };
  const handlePostCheckout = async (postId) => {
    // needs a post id, so notifs now need a post obj
    const res = await fetch(`${localURL}/api/posts/${postId}`, {
      mode: 'cors',
    });
    const data = await res.json();
    setPostCheckout(data.post);
    console.log(data);
    if (data.post.image.contentType === 'video/mp4') {
      setPostContentIsVideo(true);
    } else {
      setPostContentIsVideo(false);
    }
    setDisplayPost(true);
  };
  const toggleDisplayFullPost = () => {
    displayPost ? setDisplayPost(false) : setDisplayPost(true);
  };
  const handleUserProfileCheckout = async (userId) => {
    const res = await fetch(`${localURL}/api/users/${userId}`, {
      mode: 'cors',
    });
    const data = await res.json();
    setUserProfile(data.user);
    addSearchToRecents(userId);
    openUserPageModal();
  };
  const addSearchToRecents = async (userId) => {
    let data = new URLSearchParams();
    data.append('searched', userId);
    const res = await fetch(`${localURL}/api/users/${loggedInUser._id}`, {
      method: 'PUT',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: 'cors',
    });
  };
  const goToHomePage = () => {
    // the default config is home page, so this function needs to
    // return the modals to their default configs only.
    setIsNewPostModal(false);
    setIsUserPage(false);
  };

  return (
    <PostContext.Provider value={handlePostCheckout}>
      <ProfileContext.Provider value={handleUserProfileCheckout}>
        <PathContext.Provider value={localPath}>
          <UserContext.Provider value={loggedInUser}>
            <ApiContext.Provider value={localURL}>
              <div className='App'>
                <Sidebar
                  newPostModal={newPostModal}
                  openUserPageModal={openUserPageModal}
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
                {displayPost ? (
                  <div>
                    <FullPost
                      postObj={postCheckout}
                      toggleFullPost={toggleDisplayFullPost}
                      isVideo={postContentIsVideo}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </ApiContext.Provider>
          </UserContext.Provider>
        </PathContext.Provider>
      </ProfileContext.Provider>
    </PostContext.Provider>
  );
}

export {
  App,
  UserContext,
  ApiContext,
  PathContext,
  ProfileContext,
  PostContext,
};
