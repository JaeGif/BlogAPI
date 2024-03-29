import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import Posts from './components/posts_components/Posts';
import Sidebar from './components/sidebar/Sidebar';
import MobileBar from './components/sidebar/MobileBar';
import Suggested from './components/suggested/Suggested';
import NewPost from './components/newPost/NewPost';
import './filters.css';
import UserPageLayout from './components/userPublicPage/UserPageLayout';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LoginPage from './components/auth/login/LoginPage';
import CreateAccount from './components/auth/createAccount/CreateAccount';
import EditProfile from './components/userPublicPage/EditProfile';
import LoadingBar from 'react-top-loading-bar';
import FullPost from './components/fullPost/FullPost';
import MobileFullPost from './components/fullPost/MobileFullPost';
import Status from './status/Status';

import { useQueryClient } from '@tanstack/react-query';

const UserContext = React.createContext(null);
const ApiContext = React.createContext(null);
const PathContext = React.createContext(null);
const ProfileContext = React.createContext(null);
const PostContext = React.createContext(null);
const TokenContext = React.createContext(null);
const ProgressContext = React.createContext(null);

function App() {
  const [isNewPostModal, setIsNewPostModal] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isUserPage, setIsUserPage] = useState(false);
  const [displayPost, setDisplayPost] = useState(false);
  const [postCheckout, setPostCheckout] = useState({});
  const [postCheckoutUser, setPostCheckoutUser] = useState({});
  const [postContentIsVideo, setPostContentIsVideo] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [token, setToken] = useState(null);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [progress, setProgress] = useState(0);
  const [media1000, setMedia1000] = useState(true);
  const [mediaMobile, setMediaMobile] = useState(false);
  const [HTTPCode, setHTTPCode] = useState(0);
  const [showStatus, setShowStatus] = useState(false);
  const queryClient = useQueryClient();

  const apiURL = import.meta.env.VITE_RAILWAY_URL;
  const localURL = import.meta.env.VITE_LOCAL_URL;
  const localPath = import.meta.env.VITE_LOCAL_PATH;
  const productionPath = import.meta.env.VITE_BASE_PATH;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');

    if (loggedUserJSON) {
      const data = JSON.parse(loggedUserJSON);
      console.log(data);
      parseJwt(data);
    } else {
      navigate('/login', { replace: true });
    }
  }, []);

  const parseJwt = (data) => {
    const decode = JSON.parse(atob(data.token.split('.')[1]));
    if (decode.expire * 1000 < new Date().getTime()) {
      clearExpiredData();
      console.log('Token Expired');
      navigate('/login', { replace: true });
    } else {
      console.log('setting');
      setUserProfile(data);
      setLoggedInUser(data);
      setProgress(100);
      setLoggedIn(true);
      setToken(data.token);
    }
  };
  const clearExpiredData = () => {
    localStorage.clear();
  };
  /*  */
  useEffect(() => {
    const width = window.innerWidth;
    if (width >= 1000) {
      setMedia1000(true);
    }
    if (width < 1000) {
      setMedia1000(false);
    }
    if (width <= 750) {
      setMediaMobile(true);
    } else {
      setMedia1000(true);
      setMediaMobile(false);
    }
  });

  const navigate = useNavigate();
  useEffect(() => {
    loggedIn && navigate('/', { replace: true });
  }, [loggedIn]);

  async function fetchLoggedInUserData(userId, freshToken) {
    const res = await fetch(`${apiURL}/api/users/${userId}`, {
      mode: 'cors',
      headers: {
        Authorization: 'Bearer' + ' ' + freshToken,
      },
    });
    const data = await res.json();
    setUserProfile(data.user);
    setLoggedInUser(data.user);
    window.localStorage.setItem(
      'user',
      JSON.stringify({ ...data.user, token: freshToken })
    );

    setProgress(100);
    setLoggedIn(true);
  }

  const handleLogin = async (username, password) => {
    setProgress(20);
    const userData = new URLSearchParams();
    userData.append('username', username);
    userData.append('password', password);

    const res = await fetch(`${apiURL}/login`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: userData,
    });
    setProgress(70);
    setHTTPCode(res.status);
    if (res.status === 200) {
      const data = await res.json();
      setToken(data.token);
      fetchLoggedInUserData(data.user, data.token);

      return true;
    } else {
      setProgress(100);
      return false;
    }
  };
  const handleGuestLogin = async () => {
    setProgress(20);
    const userData = new URLSearchParams();
    userData.append('username', 'thisIsGuest');
    userData.append('password', 'gyZqXZPw3JmLAjW');

    const res = await fetch(`${apiURL}/login`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: userData,
    });
    setProgress(70);
    setHTTPCode(res.status);

    if (res.status === 200) {
      const data = await res.json();
      setProgress(100);
      setToken(data.token);
      fetchLoggedInUserData(data.user, data.token);
      return true;
    } else {
      setProgress(100);
      return false;
    }
  };
  useEffect(() => {
    if (HTTPCode !== 0) {
      setShowStatus(true);
    } else {
      setShowStatus(false);
    }
  }, [HTTPCode]);
  const refreshContent = () => {
    isRefresh ? setIsRefresh(false) : setIsRefresh(true);
  };
  const newPostModal = (close) => {
    if (close === 'close') {
      setIsNewPostModal(false);
      return;
    } else {
      isNewPostModal ? setIsNewPostModal(false) : setIsNewPostModal(true);
    }
  };
  const openUserPageModal = () => {
    setIsUserPage(true);
  };
  const handlePostCheckout = async (postId) => {
    // needs a post id, so notifs now need a post obj
    setProgress(20);

    const res = await fetch(`${apiURL}/api/posts/${postId}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    setProgress(50);

    setPostCheckout(data.post);
    setProgress(70);

    const resUser = await fetch(`${apiURL}/api/users/${data.post.user}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    setProgress(90);

    const userData = await resUser.json();
    setPostCheckoutUser(userData.user);
    setProgress(100);

    setDisplayPost(true);
  };

  const toggleDisplayFullPost = () => {
    displayPost ? setDisplayPost(false) : setDisplayPost(true);
  };
  const handleUserProfileCheckout = async (userId) => {
    setProgress(20);
    const res = await fetch(`${apiURL}/api/users/${userId}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    setProgress(50);
    const data = await res.json();
    setUserProfile(data.user);
    setProgress(70);
    addSearchToRecents(userId);
    navigate(`/${data.user.username}`);
    openUserPageModal();
    setProgress(100);
  };
  const addSearchToRecents = async (userId) => {
    let data = new URLSearchParams();
    data.append('searched', userId);
    const res = await fetch(`${apiURL}/api/users/${loggedInUser._id}`, {
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
    const res = await fetch(`${apiURL}/api/users/${loggedInUser._id}`, {
      mode: 'cors',
      headers: {
        Authorization: 'Bearer' + ' ' + token,
      },
    });
    const data = await res.json();
    setUserProfile(data.user);
    setLoggedInUser(data.user);
  }
  const goToHomePage = () => {
    // the default config is home page, so this function needs to
    // return the modals to their default configs only.
    queryClient.invalidateQueries({
      queryKey: ['posts', { u: loggedInUser._id }],
    });
    setIsNewPostModal(false);
    setIsUserPage(false);
    setDisplayPost(false);
    setIsEditProfile(false);
    navigate('/');
  };

  const handleLogOut = () => {
    window.localStorage.clear();
    setLoggedIn(false);
  };
  const handleOpenEditProfile = () => {
    setIsEditProfile(true);
  };

  return (
    <>
      <ApiContext.Provider value={apiURL}>
        <ProgressContext.Provider value={setProgress}>
          <TokenContext.Provider value={token}>
            <PostContext.Provider value={handlePostCheckout}>
              <ProfileContext.Provider value={handleUserProfileCheckout}>
                <PathContext.Provider value={productionPath}>
                  <UserContext.Provider value={loggedInUser}>
                    <LoadingBar
                      color='#dc140a'
                      progress={progress}
                      onLoaderFinished={() => setProgress(0)}
                    />
                    <Routes>
                      <Route
                        path='/login'
                        element={
                          <div>
                            <LoginPage
                              handleLogIn={handleLogin}
                              handleGuestLogin={handleGuestLogin}
                            />
                          </div>
                        }
                      />
                      <Route path='/register' element={<CreateAccount />} />

                      <Route
                        path='/'
                        element={
                          <div>
                            {loggedIn ? (
                              <div className={`App`}>
                                {mediaMobile ? (
                                  <MobileBar
                                    newPostModal={newPostModal}
                                    openUserPageModal={
                                      handleUserProfileCheckout
                                    }
                                    goToHomePage={goToHomePage}
                                    refreshLoggedInUserData={
                                      refreshLoggedInUserData
                                    }
                                  />
                                ) : (
                                  <Sidebar
                                    newPostModal={newPostModal}
                                    openUserPageModal={
                                      handleUserProfileCheckout
                                    }
                                    goToHomePage={goToHomePage}
                                    refreshLoggedInUserData={
                                      refreshLoggedInUserData
                                    }
                                  />
                                )}
                                {isUserPage ? (
                                  isEditProfile ? (
                                    <EditProfile
                                      refreshLoggedInUserData={
                                        refreshLoggedInUserData
                                      }
                                      handleLogOut={handleLogOut}
                                    />
                                  ) : (
                                    <UserPageLayout
                                      openEditUser={handleOpenEditProfile}
                                      user={userProfile}
                                    />
                                  )
                                ) : (
                                  <>
                                    {displayPost && !mediaMobile && (
                                      <FullPost
                                        postObj={postCheckout}
                                        toggleFullPost={toggleDisplayFullPost}
                                        userData={postCheckoutUser}
                                      />
                                    )}
                                    {displayPost && mediaMobile && (
                                      <MobileFullPost
                                        postObj={postCheckout}
                                        toggleFullPost={toggleDisplayFullPost}
                                        userData={postCheckoutUser}
                                      />
                                    )}
                                    <Posts
                                      refresh={isRefresh}
                                      refreshFn={refreshContent}
                                      refreshLoggedInUserData={
                                        refreshLoggedInUserData
                                      }
                                    />
                                    {media1000 && (
                                      <Suggested handleLogOut={handleLogOut} />
                                    )}
                                  </>
                                )}
                                {isNewPostModal && (
                                  <NewPost
                                    newPostModal={newPostModal}
                                    refresh={setIsRefresh}
                                  />
                                )}
                              </div>
                            ) : (
                              <Navigate to={'/login'} replace />
                            )}
                          </div>
                        }
                      >
                        <Route
                          path=':id'
                          element={
                            <UserPageLayout
                              openEditUser={handleOpenEditProfile}
                              user={userProfile}
                            />
                          }
                        />
                      </Route>
                      <Route path='*' element={<Navigate to={'/'} />} />
                    </Routes>
                    <>
                      {showStatus && (
                        <Status setHTTPCode={setHTTPCode} HTTPCode={HTTPCode} />
                      )}
                    </>
                  </UserContext.Provider>
                </PathContext.Provider>
              </ProfileContext.Provider>
            </PostContext.Provider>
          </TokenContext.Provider>
        </ProgressContext.Provider>
      </ApiContext.Provider>
      <ReactQueryDevtools />
    </>
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
  ProgressContext,
};
