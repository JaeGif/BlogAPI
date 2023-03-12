import React, { useContext, useState, useEffect } from 'react';
import { ApiContext, PathContext, TokenContext } from '../../App';
import CommentLoadingIcon from '../comments/addComment/utility/CommentLoadingIcon';
import UserProfileAvatar from '../userProfileHead/UserProfileAvatar';
import UserSearchOverview from '../userSearchOverview/UserSearchOverview';
import style from './newpost.module.css';
import PreviewImage from './PreviewImage';
import { useQuery } from '@tanstack/react-query';
import uniqid from 'uniqid';
import AddLocation from './SubmitComponents/AddLocation';
import UserHeadName from './SubmitComponents/UserHeadName';

function SubmitPost({
  prevStep,
  submit,
  addPost,
  isSubmitting,
  changeAlt,
  images,
  imageData,
  filter,
  handleIncIndex,
  handleDecIndex,
  user,
  changeLocation,
  isVideoPreview,
  handleTagged,
  tagged,
  imageIndex,
  removeTag,
}) {
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isTagging, setIsTagging] = useState(false);
  const [userFindResults, setUserFindResults] = useState([]);
  const [changedTagged, setChangedTagged] = useState(tagged);

  const apiURL = useContext(ApiContext);
  const basePath = useContext(PathContext);
  const token = useContext(TokenContext);

  const handleA11yOpen = () => {
    isAccessibilityOpen
      ? setIsAccessibilityOpen(false)
      : setIsAccessibilityOpen(true);
  };
  const addTagToggle = () => {
    isTagging ? setIsTagging(false) : setIsTagging(true);
  };
  const findUserByUserName = async (username) => {
    console.log('finding users');
    const res = await fetch(
      `${apiURL}/api/users?username=${username}&reqLimit=${5}&skipToPage=${0}`,
      {
        mode: 'cors',
        headers: {
          Authorization: 'Bearer' + ' ' + token,
        },
      }
    );
    const data = await res.json();
    console.log(data.users);
    setUserFindResults(data.users);
    () => handleTagged(data);
    return data.users;
  };
  useEffect(() => {
    console.log('change tagged Effect');
    setChangedTagged(tagged);
  }, [tagged]);

  return (
    <>
      <span className={style.headingSubmitPost}>
        <img
          className={style.returnArrow}
          alt='back arrow'
          src={`./assets/favicons/redo.svg`}
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
          {changedTagged.length ? (
            <div className={style.tagsContainer}>
              {tagged.map((obj) => (
                <span
                  key={uniqid()}
                  className={style.taggedUsersContainer}
                  onClick={(e) => e.stopPropagation()}
                >
                  {obj.user.username}
                  <img
                    onClick={(e) => {
                      removeTag(obj.key);
                      e.stopPropagation();
                    }}
                    className={style.removeTaggedButton}
                    src={`./assets/favicons/close.svg`}
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
                      handleClick={handleTagged}
                      userData={user}
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
            imageIndex={imageIndex}
            imageData={imageData}
            handleIncIndex={handleIncIndex}
            handleDecIndex={handleDecIndex}
            images={images}
            filter={filter}
            isVideoPreview={isVideoPreview}
          />
        </div>
        <div className={style.postFormContainer}>
          <UserHeadName user={user} />
          <textarea
            className={style.postInput}
            onChange={(e) => addPost(e)}
            name='post'
            placeholder='Write a caption...'
          ></textarea>
          <span className={style.lowerInputsContainer}>
            <AddLocation changeLocation={changeLocation} />
            {/*             <span className={style.locationWrapper}>
              <input
                onChange={(e) => changeLocation(e)}
                name='location'
                type='text'
                placeholder='Add location'
                className={style.locationInput}
              />
              <img
                className={style.locationIcon}
                src={`${basePath}/assets/favicons/location.svg`}
              />
            </span> */}
            <div onClick={handleA11yOpen}>
              <span className={style.accordianContainer}>
                <p>Accessibility</p>
                {isAccessibilityOpen ? (
                  <img
                    className={style.expandChevrons}
                    src={`./assets/favicons/expandmore.svg`}
                  />
                ) : (
                  <img
                    className={style.expandChevrons}
                    src={`./assets/favicons/expandless.svg`}
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
