import React, { useState, useContext, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import './App.css';
import Posts from './components/posts_components/Posts';
import Sidebar from './components/sidebar/Sidebar';
import Suggested from './components/suggested/Suggested';
import NewPost from './components/newPost/NewPost';
import './filters.css';
import UserPageLayout from './components/userPublicPage/UserPageLayout';
import FullPost from './components/fullPost/FullPost';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LoginPage from './components/auth/login/LoginPage';
import CreateAccount from './components/auth/createAccount/CreateAccount';
import EditProfile from './components/userPublicPage/EditProfile';
import LoadingBar from 'react-top-loading-bar';

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
  const [postContentIsVideo, setPostContentIsVideo] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [token, setToken] = useState(null);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [progress, setProgress] = useState(0);

  const apiURL = import.meta.env.VITE_RAILWAY_URL;
  const localURL = import.meta.env.VITE_LOCAL_URL;
  const localPath = import.meta.env.VITE_LOCAL_PATH;
  const productionPath = import.meta.env.VITE_BASE_PATH;

  const navigate = useNavigate();
  useEffect(() => {
    loggedIn && navigate('/', { replace: true });
  }, [loggedIn]);
  useEffect(() => {
    userProfile;
  });

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

  const handleLogin = async (username, password) => {
    setProgress(20);
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
    setProgress(70);

    if (res.status === 200) {
      const data = await res.json();
      setProgress(100);
      setToken(data.token);
      fetchLoggedInUserData(data.user, data.token);
    } else {
      setProgress(100);
      console.log(res.status);
    }
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
    setProgress(20);
    const res = await fetch(`${localURL}/api/users/${userId}`, {
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

  const handleLogOut = () => {
    setLoggedIn(false);
  };
  const handleOpenEditProfile = () => {
    setIsEditProfile(true);
  };
  const handleCloseEditProfile = () => {
    setIsEditProfile(false);
  };

  return (
    <>
      <ApiContext.Provider value={localURL}>
        <ProgressContext.Provider value={setProgress}>
          <TokenContext.Provider value={token}>
            <PostContext.Provider value={handlePostCheckout}>
              <ProfileContext.Provider value={handleUserProfileCheckout}>
                <PathContext.Provider value={localPath}>
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
                            <LoginPage handleLogIn={handleLogin} />
                          </div>
                        }
                      />
                      <Route path='/register' element={<CreateAccount />} />

                      <Route
                        path='/'
                        element={
                          <div>
                            {loggedIn ? (
                              <div className='App'>
                                <Sidebar
                                  newPostModal={newPostModal}
                                  openUserPageModal={handleUserProfileCheckout}
                                  goToHomePage={goToHomePage}
                                  refreshLoggedInUserData={
                                    refreshLoggedInUserData
                                  }
                                />
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
                                    <Posts
                                      refresh={isRefresh}
                                      refreshFn={refreshContent}
                                      refreshLoggedInUserData={
                                        refreshLoggedInUserData
                                      }
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
                    </Routes>
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
