import React from 'react';
import { useEffect, useState, useRef } from 'react';

function User() {
  const apiURL = import.meta.env.VITE_RAILWAY_URL;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`${apiURL}/api/users`, { mode: 'cors' })
      .then(console.log('success'))
      .then((response) => response.json())
      .then(setUsers);
  }, []);
  console.log(users);

  return <div>{users[0]}</div>;
}

export default User;
