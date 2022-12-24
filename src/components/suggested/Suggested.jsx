import React from 'react';
import style from './suggested.module.css';
import SuggestedUserProfile from './userProfile/SuggestedUserProfile';
import uniqid from 'uniqid';

function Suggested() {
  // Return a short list of suggested users ~5 users when this element is generated
  // Here is a dummy list with the users data;
  const user1 = {
    _id: 'd3a4d0173ee7dc7dbcd3ec92',
    firstName: 'Daphney',
    lastName: 'Collins',
    email: 'Elenor_Streich66@yahoo.com',
    userName: 'Martina.Bode90',
    password: 'MgpnDUi3OTt31AQ',
    isAdmin: false,
    __v: '0',
  };
  const user2 = {
    _id: 'b82dfeccb347ccfac32eea8c',
    firstName: 'Precious',
    lastName: 'Pfannerstill',
    email: 'Felicia_Mann@hotmail.com',
    userName: 'Toni.Maggio83',
    password: 'LM4o07WA7SosYbH',
    isAdmin: false,
    __v: '0',
  };
  const user3 = {
    _id: 'cd8f1d747c84f8c3d4a3b6f8',
    firstName: 'Alexis',
    lastName: 'Medhurst',
    email: 'Aiden.OKon72@hotmail.com',
    userName: 'Alfonso94',
    password: 'llFUCHChDN5xPGD',
    isAdmin: false,
    __v: '0',
  };
  const user4 = {
    _id: '0315f845beaf697b7919e2fa',
    firstName: 'Maida',
    lastName: 'Kozey',
    email: 'Deven_Stamm21@gmail.com',
    userName: 'Moises.Lakin34',
    password: 'ibTj75Um22iGtCe',
    isAdmin: false,
    __v: '0',
  };
  const user5 = {
    _id: '435ae2803678d3fbbcd2cd01',
    firstName: 'Lucas',
    lastName: 'Hudson',
    email: 'Agustin81@hotmail.com',
    userName: 'Skye52',
    password: '5wfZeFKJXHIOYzB',
    isAdmin: false,
    __v: '0',
  };

  const suggestedUsers = [user1, user2, user3, user4, user5];

  return (
    <div>
      <div className={style.profileContainer}>
        <img alt='profile avatar'></img>
        <div>
          <p>Current User Username</p>
          <p>Current User Real Name</p>
        </div>
        <p className={style.switchUserBtn}>Switch</p>
      </div>
      <span className={style.profileContainer}>
        <p>Suggestions For You</p>
        <p>See All</p>
      </span>
      <div>
        {suggestedUsers.map((user) => (
          <SuggestedUserProfile key={uniqid()} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Suggested;
