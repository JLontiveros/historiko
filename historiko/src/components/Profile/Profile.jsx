import React, { useState } from 'react';
import './Profile.css';
import girlicon from '../../assets/girlicon.png';
import pen2 from '../../assets/pen2.png'
import uploadarea from '../../assets/uploadareacropped.png'

const Profile = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  const handleEditClick = () => {
    setFormVisible(!isFormVisible); // Toggle the visibility of the form
  }

  return (
    <>
    <div className="profile">
      <div className="profile-container">
        <div className="user">
          <img src={girlicon} alt='girlicon' />
          <div className="user-info">
            <span>User 1</span>
            <span>Ako ay estudyante</span>
          </div>
        </div>
        <div className="btnright">
          <button>Log Out</button>
          <button onClick={handleEditClick}>Edit<img src={pen2} alt='pen'/></button>
        </div>
      </div>

      <div className={`edit-form ${isFormVisible ? 'visible' : ''}`}>
          <form>
            <div className="upload-pic flex-col">
              <label htmlFor="image">
                <img src={uploadarea} alt='' />
              </label>
            </div>
            <div className='user-tag'>
              <h1>User 1</h1>
            </div>
            <div className='edit-user'>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" />
            </div>
            <div className='edit-pass'>
              <label htmlFor="pass">Change Password:</label>
              <input type="text" id="pass" name="pass" />
            </div>
            <div className='edit-bio'>
              <label htmlFor="bio">Bio:</label>
              <input type="text" id="bio" name="bio" />
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
