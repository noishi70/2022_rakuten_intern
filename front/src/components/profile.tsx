import React from "react";
import "./Profile.css";
import Button from '@mui/material/Button';

type props = {
  user_id: number;
  name: string;
  icon: string;
  header: string;
  setValue?: (value: string) => void;
};

const Profile = (props: props) => {
  return (
    <>
      <div className="head">
        <img src={'data:image/png;base64,'+props.header} className="headimg" alt="Header" />
      </div>

      <div className="bodyelem">
        <div className="row">
          <div className="iconname">
            <img src={'data:image/png;base64,'+props.icon} className="iconimage" alt="icon" />
            <div className="username">{props.name}</div>
          </div>
          <Button onClick={() => props.setValue?.("send")} variant="contained" color="primary">プロフィール編集</Button>
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
