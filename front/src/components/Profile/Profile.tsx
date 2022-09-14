import React from "react";
import HeadImg from "../../back.jpg";
import "./Profile.css";

const Profile = () => {
  return (
    <>
      <div className="head">
        <img src={HeadImg} className="headimg" alt="Header" />
      </div>
      
      <div className="bodyelem">
        <div className="row">
          <div className="iconname">
            <img src={HeadImg} className="iconimage" alt="icon" />
            <div className="username">UserName</div>
          </div>
          <button className="profilebutton">プロフィール編集</button>
        </div>

        <div className="profile">
          <p className="profileintro">
            fdaffffffffffffffssssssssssssssssssssssssffffffffffafdsafsadfasf
          </p>
        </div>

        <div className="followfollower">
          <div className="follow">1234 フォロー</div>
          <div className="follower">5678 フォロワー</div>
        </div>
      </div>

      <hr></hr>
    </>
  );
};

export default Profile;
