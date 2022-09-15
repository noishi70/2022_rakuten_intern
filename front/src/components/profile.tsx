import { useState } from "react";
import { Button, Drawer } from '@mui/material';
import Style from "./Profile.module.css";
import ProfileFix from "./ProfileFix";
import axios from 'axios';
import  Link  from "react-router-dom"

type Props = {
  my_id: string;
  user_id: string;
  header: string;
  icon: string;
  name: string;
  comment: string;
  follow: number;
  follower: number;
  is_follow: boolean;
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
  const [isfollow, setIsfollow] = useState(props.is_follow);
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

  const dofollow = () => {
    let url = process.env.REACT_APP_API + '/api/users/follow';
    const API_TOKEN = sessionStorage.getItem('access_token');
    const data = {
      "followee_id": props.user_id
    };
    axios.post(url, data, { headers: { Authorization: "Bearer " + API_TOKEN } }).then((res) => {
      console.log(res.data);
    });
    setIsfollow(true);
    window.location.reload()
  }

  const delfollow = () => {
    let url = process.env.REACT_APP_API + '/api/users/follow';
    const API_TOKEN = sessionStorage.getItem('access_token');
    axios.delete(url, { headers: { Authorization: "Bearer " + API_TOKEN }, data: {"followee_id": props.user_id}}).then((res) => {
      console.log(res.data);
    });
    setIsfollow(false);
    window.location.reload()
  }

  var info = { header: props.header, icon: props.icon, name: props.name, comment: props.comment, setHeader: changeHeader, setIcon: changeIcon, setName: changeName, setComment: changeComment };

  return (
    <div>
      <div className={Style.head}>
        <img src={'data:image/png;base64,' + props.header} className={Style.headimg} alt="Header" />
      </div>

      <div className={Style.bodyelem}>
        <div className={Style.row}>
          <div className={Style.iconname}>
            <img src={'data:image/png;base64,' + props.icon} className={Style.iconimage} alt="icon" />
            <div className={Style.username}>{props.name}</div>
          </div>
          {(() => {
            if (props.my_id === props.user_id) {
              return <Button style={{borderRadius: '20px'}} variant="contained" onClick={() => toggleDrawer(true) } >プロフィール変更</Button>;
            } else if(props.is_follow) {
              return <Button style={{borderRadius: '20px'}} variant="contained" onClick={() =>delfollow() } >フォロー解除</Button>;
            } else {
              return <Button style={{borderRadius: '20px'}} variant="contained" onClick={() => dofollow() } >フォローする</Button>;
            }
          })()}
          
        </div>

        <div className={Style.profile}>
          <p className={Style.profileintro}>
            {comment}
          </p>
        </div>

        <div className={Style.followfollower}>
          <div className={Style.follow}>{props.follow} フォロー</div>
          <div className={Style.follower}>{props.follower} フォロワー</div>
        </div>
      </div>

      <Drawer anchor={anchor} open={drawer} onClose={() => toggleDrawer(false)}>
        <ProfileFix {...info} />    
      </Drawer>
    </div>
  );
}

export default Profile;