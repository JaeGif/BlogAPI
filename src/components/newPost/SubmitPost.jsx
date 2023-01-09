import React, { useContext, useState } from 'react';
import { ApiContext } from '../../App';
import CommentLoadingIcon from '../comments/addComment/utility/CommentLoadingIcon';
import UserProfileAvatar from '../userProfileHead/UserProfileAvatar';
import UserSearchOverview from '../userSearchOverview/UserSearchOverview';
import style from './newpost.module.css';
import PreviewImage from './PreviewImage';
import uniqid from 'uniqid';

function SubmitPost({
  prevStep,
  submit,
  addPost,
  isSubmitting,
  changeAlt,
  images,
  filter,
  user,
  changeLocation,
  isVideoPreview,
  handleTagged,
  tagged,
}) {
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isTagging, setIsTagging] = useState(false);
  const [userFindResults, setUserFindResults] = useState([]);

  const apiURL = useContext(ApiContext);
  const handleA11yOpen = () => {
    isAccessibilityOpen
      ? setIsAccessibilityOpen(false)
      : setIsAccessibilityOpen(true);
  };
  const addTagToggle = () => {
    isTagging ? setIsTagging(false) : setIsTagging(true);
  };
  const findUserByUserName = async (userName) => {
    const res = await fetch(
      `${apiURL}/api/users?username=${userName}&reqLimit=${5}&skipToPage=${0}`,
      {
        mode: 'cors',
      }
    );
    const data = await res.json();
    setUserFindResults(data.users);
    () => handleTagged(data);
  };

  return (
    <>
      <span className={style.headingSubmitPost}>
        <img
          className={style.returnArrow}
          alt='back arrow'
          src='./src/assets/favicons/redo.svg'
          onClick={() => prevStep()}
        ></img>
        <p>Create new post</p>
        <div>
          {isSubmitting ? (
            <CommentLoadingIcon />
          ) : (
            <p
              onClick={() => {
                submit();
              }}
              className={style.continueNewPostText}
            >
              Submit
            </p>
          )}
        </div>
      </span>
      <div className={style.innerSubmitContainer}>
        <div className={style.tagWrapper} onClick={addTagToggle}>
          {tagged.length ? (
            <div className={style.tagsContainer}>
              {tagged.map((user) => (
                <span className={style.taggedUsersContainer}>
                  {user.userName}
                  <img
                    className={style.removeTaggedButton}
                    src='./src/assets/favicons/close.svg'
                  />
                </span>
              ))}
            </div>
          ) : (
            <></>
          )}
          {isTagging ? (
            <div className={style.taggingModal}>
              <span
                className={style.tagSearchWrapper}
                onClick={(e) => e.stopPropagation()}
              >
                <h3>Tag:</h3>
                <input
                  onChange={(e) => findUserByUserName(e.target.value)}
                  className={style.searchUsersInput}
                  placeholder='Search'
                />
              </span>
              {userFindResults.length ? (
                <div className={style.usersResultsContainer}>
                  {userFindResults.map((user) => (
                    <UserSearchOverview
                      key={uniqid()}
                      handleClick={() => handleTagged(user)}
                      user={user}
                    />
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
          <PreviewImage
            images={images}
            filter={filter}
            isVideoPreview={isVideoPreview}
          />
        </div>
        <div className={style.postFormContainer}>
          <span className={style.userHeadSubmit}>
            <UserProfileAvatar user={user} />
            <p className={`${style.textSizing} ${style.userName}`}>
              {user.userName}
            </p>
          </span>
          <textarea
            className={style.postInput}
            onChange={(e) => addPost(e)}
            name='post'
            placeholder='Write a caption...'
          ></textarea>
          <span className={style.lowerInputsContainer}>
            <span className={style.locationWrapper}>
              <input
                onChange={(e) => changeLocation(e)}
                name='location'
                type='text'
                placeholder='Add location'
                className={style.locationInput}
              />
              <img
                className={style.locationIcon}
                src='./src/assets/favicons/location.svg'
              />
            </span>
            <div onClick={handleA11yOpen}>
              <span className={style.accordianContainer}>
                <p>Accessibility</p>
                {isAccessibilityOpen ? (
                  <img
                    className={style.expandChevrons}
                    src='./src/assets/favicons/expandmore.svg'
                  />
                ) : (
                  <img
                    className={style.expandChevrons}
                    src='./src/assets/favicons/expandless.svg'
                  />
                )}
              </span>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={style.a11yContainer}
                style={
                  isAccessibilityOpen
                    ? { display: 'flex' }
                    : { display: 'none' }
                }
              >
                <p className={style.a11yLabel}>
                  Alt text describes your photos <br />
                  for people with visual impairments.
                </p>
                <input
                  className={style.altInput}
                  onChange={(e) => changeAlt(e)}
                  name='altText'
                  type='text'
                  placeholder='alt-text'
                />
              </div>
            </div>
          </span>
        </div>
      </div>
    </>
  );
}

export default SubmitPost;
