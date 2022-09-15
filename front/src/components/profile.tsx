import React, { useState } from "react";
import { Button, Drawer, Grid, IconButton } from '@mui/material';
import Style from "./Profile.module.css";
import ProfileFix from "./ProfileFix";
import { PropaneSharp } from "@mui/icons-material";

type Props = {
  user_id: number;
  header: string;
  icon: string;
  name: string;
  comment: string;
  setProfile?: (value: Profile) => void;
};

type Profile = {
  header: string;
  icon: string;
  name: string;
  comment: string;
}

const Profile = (props: Props) => {
  const [header, setHeader] = useState(props.header);
  const [icon, setIcon] = useState(props.icon);
  const [name, setName] = useState(props.name);
  const [comment, setComment] = useState(props.comment);
  const [drawer, toggleDrawer] = useState(false);
  const anchor = 'bottom';

  const changeHeader = (prop: string) => {
    setHeader(() => prop);
    props.setProfile?.({header, icon, name, comment});
  }

  const changeIcon = (prop: string) => {
    setIcon(() => prop);
    props.setProfile?.({header, icon, name, comment});
  }

  const changeName = (prop: string) => {
    console.log(prop)
    setName(() => prop);
    props.setProfile?.({header, icon, name, comment});
  }

  const changeComment = (prop: string) => {
    setComment(() => prop);
    props.setProfile?.({header, icon, name, comment});
  }

  var info = { header: props.header, icon: props.icon, name: props.name, comment: props.comment, setHeader: changeHeader, setIcon: changeIcon, setName: changeName, setComment: changeComment };

  return (
    <div>
      <div className={Style.head}>
        <img src={header} className={Style.headimg} alt="Header" />
      </div>

      <div className={Style.bodyelem}>
        <div className={Style.row}>
          <div className={Style.iconname}>
            <img src={icon} className={Style.iconimage} alt="icon" />
            <div className={Style.username}>{name}</div>
          </div>
          <Button style={{borderRadius: '20px'}} variant="contained" onClick={() => toggleDrawer(true) } >プロフィール変更</Button>
        </div>

        <div className={Style.profile}>
          <p className={Style.profileintro}>
            {comment}
          </p>
        </div>

        <div className={Style.followfollower}>
          <div className={Style.follow}>1234 フォロー</div>
          <div className={Style.follower}>5678 フォロワー</div>
        </div>
      </div>

      <Drawer anchor={anchor} open={drawer} onClose={() => toggleDrawer(false)}>
        <ProfileFix {...info} />    
      </Drawer>
    </div>
  );
}

export default Profile;