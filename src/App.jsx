import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Posts from './components/posts_components/Posts';
import Sidebar from './components/sidebar/Sidebar';
import Suggested from './components/suggested/Suggested';
import NewPost from './components/newPost/NewPost';
import './filters.css';
import UserPageLayout from './components/userPublicPage/UserPageLayout';
import FullPost from './components/fullPost/FullPost';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LoginPage from './components/auth/login/LoginPage';
import CreateAccount from './components/auth/createAccount/CreateAccount';
import EditProfile from './components/userPublicPage/EditProfile';

/* {
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
  } */

const UserContext = React.createContext(null);
const ApiContext = React.createContext(null);
const PathContext = React.createContext(null);
const ProfileContext = React.createContext(null);
const PostContext = React.createContext(null);
const TokenContext = React.createContext(null);

function App() {
  const [isNewPostModal, setIsNewPostModal] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isUserPage, setIsUserPage] = useState(false);
  const [displayPost, setDisplayPost] = useState(false);
  const [postCheckout, setPostCheckout] = useState({});
  const [postContentIsVideo, setPostContentIsVideo] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [hasAccount, setHasAccount] = useState(true);
  const [token, setToken] = useState(null);
  const [isEditProfile, setIsEditProfile] = useState(false);

  const apiURL = import.meta.env.VITE_RAILWAY_URL;
  const localURL = import.meta.env.VITE_LOCAL_URL;
  const localPath = import.meta.env.VITE_LOCAL_PATH;
  const productionPath = import.meta.env.VITE_BASE_PATH;

  /*   useEffect(() => {
    // set logged in user

    // Eldritch Feast User; Neal Morrison. 823fce52b33a845ef7554dd9
    // Modesto45 User d4b51d5d9e0e47b2aefaf89d
    // Rhea67 fe0db393eeaeaa8530a38e1d
    // Noberto Gleason e8ce217fbb667ca248d349b4
    fetchLoggedInUserData('d4b51d5d9e0e47b2aefaf89d');
  }, []); */

  async function fetchLoggedInUserData(userId, freshToken) {
    const res = await fetch(`${localURL}/api/users/${userId}`, {
      mode: 'cors',
      headers: {
        Authorization: 'Bearer' + ' ' + freshToken,
      },
    });
    const data = await res.json();

    setUserProfile(data.user);
    setLoggedInUser(data.user);
    setLoggedIn(true);
  }

  /*   const userQuery = useQuery({
    queryKey: ['users', { userId: 'd4b51d5d9e0e47b2aefaf89d' }],
    queryFn: () => fetchLoggedInUserData('d4b51d5d9e0e47b2aefaf89d'),
  });
 */
  const handleLogin = async (username, password) => {
    const userData = new URLSearchParams();
    userData.append('username', username);
    userData.append('password', password);

    const res = await fetch(`${localURL}/login`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: userData,
    });
    if (res.status === 200) {
      const data = await res.json();
      setToken(data.token);
      fetchLoggedInUserData(data.user, data.token);
    } else {
      console.log(res.status);
    }
  };
  const resetModalValues = () => {
    setIsUserPage(false);
    setIsNewPostModal(false);
    setIsRefresh(false);
    setDisplayPost(false);
  };

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
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    setPostCheckout(data.post);
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
      headers: { Authorization: 'Bearer' + ' ' + token },
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
        Authorization: 'Bearer' + ' ' + token,
      },
      mode: 'cors',
    });
  };

  async function refreshLoggedInUserData() {
    const res = await fetch(`${localURL}/api/users/${loggedInUser._id}`, {
      mode: 'cors',
      headers: {
        Authorization: 'Bearer' + ' ' + token,
      },
    });
    const data = await res.json();
    console.log('refresh user');
    setUserProfile(data.user);
    setLoggedInUser(data.user);
  }
  const goToHomePage = () => {
    // the default config is home page, so this function needs to
    // return the modals to their default configs only.
    setIsNewPostModal(false);
    setIsUserPage(false);
    setDisplayPost(false);
    setIsEditProfile(false);
  };
  const handleHasAccount = () => {
    setHasAccount(true);
  };
  const handleDoesNotHaveAccount = () => {
    setHasAccount(false);
  };
  const handleLogOut = () => {
    setLoggedIn(false);
    setHasAccount(true);
  };
  const handleOpenEditProfile = () => {
    setIsEditProfile(true);
  };
  const handleCloseEditProfile = () => {
    setIsEditProfile(false);
  };

  return (
    <div>
      <ApiContext.Provider value={localURL}>
        {loggedIn ? (
          <TokenContext.Provider value={token}>
            <PostContext.Provider value={handlePostCheckout}>
              <ProfileContext.Provider value={handleUserProfileCheckout}>
                <PathContext.Provider value={localPath}>
                  <UserContext.Provider value={loggedInUser}>
                    <div className='App'>
                      <Sidebar
                        newPostModal={newPostModal}
                        openUserPageModal={handleUserProfileCheckout}
                        goToHomePage={goToHomePage}
                        refreshLoggedInUserData={refreshLoggedInUserData}
                      />
                      {isUserPage ? (
                        isEditProfile ? (
                          <EditProfile
                            refreshLoggedInUserData={refreshLoggedInUserData}
                          />
                        ) : (
                          <UserPageLayout
                            openEditUser={handleOpenEditProfile}
                            user={userProfile}
                          />
                        )
                      ) : (
                        <>
                          <Posts
                            refresh={isRefresh}
                            refreshFn={refreshContent}
                            refreshLoggedInUserData={refreshLoggedInUserData}
                          />
                          <Suggested handleLogOut={handleLogOut} />
                        </>
                      )}
                      {isNewPostModal ? (
                        <NewPost
                          newPostModal={newPostModal}
                          refresh={setIsRefresh}
                        />
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
                  </UserContext.Provider>
                </PathContext.Provider>
              </ProfileContext.Provider>
            </PostContext.Provider>
          </TokenContext.Provider>
        ) : (
          <div>
            {hasAccount ? (
              <LoginPage
                handleDoesNotHaveAccount={handleDoesNotHaveAccount}
                handleLogIn={handleLogin}
              />
            ) : (
              <CreateAccount handleHasAccount={handleHasAccount} />
            )}
          </div>
        )}
      </ApiContext.Provider>

      <ReactQueryDevtools />
    </div>
  );
}

export {
  App,
  UserContext,
  ApiContext,
  PathContext,
  ProfileContext,
  PostContext,
  TokenContext,
};
