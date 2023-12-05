import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

 
  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/sdei/user');
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/sdei/logout/');
      // Redirect or perform other actions after logout
      navigate('/Account');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  

  return (
    <div>
      <h1>User Profile</h1>
      {user && (
        <div>
          <p>Welcome, {user.username}!</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
