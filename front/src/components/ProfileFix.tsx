import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import Style from './ProfileFix.module.css';
import axios from 'axios';
import {Navigate} from 'react-router-dom';

type Props = {
  header: string;
  icon: string;
  name: string;
  comment: string;
  setHeader: (arg: string) => void;
  setIcon: (arg: string) => void;
  setName: (arg: string) => void;
  setComment: (arg: string) => void;
};

const ProfileFix = (props: Props) => {
  const [header, setHeader] = useState(props.header);
  const [icon, setIcon] = useState(props.icon);
  const [name, setName] = useState(props.name);
  const [comment, setComment] = useState(props.comment);

  const nameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(() => event.target.value);
    props.setName(event.target.value);
  }

  const commentChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setComment(() => event.target.value);
    props.setComment(event.target.value);
  }

  const headerChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    const reader = new FileReader();
    if (files && files[0]) {
      reader.readAsDataURL(files[0]);
    }
    reader.onload = () => {
      setHeader(typeof reader.result === 'string' ? reader.result : '');
      props.setHeader(typeof reader.result === 'string' ? reader.result : '');
    }
  }

  const iconChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    const reader = new FileReader();
    if (files && files[0]) {
      reader.readAsDataURL(files[0]);
    }
    reader.onload = () => {
      setIcon(typeof reader.result === 'string' ? reader.result : '');
      props.setIcon(typeof reader.result === 'string' ? reader.result : '');
    }
  }

  const completion = () => {
    let url = process.env.REACT_APP_API + '/api/users/me';
    const API_TOKEN = sessionStorage.getItem('access_token');
    const back_icon = icon.replace("data:image/png;base64,", "");
    const back_head = header.replace("data:image/png;base64,", "");
    const data = {
      "name": name,
      "header_img": back_head,
      "icon": back_icon,
      "comment": comment
    };
    axios.patch(url, data, { headers: { Authorization: "Bearer " + API_TOKEN } }).then((res) => {
      console.log(res.data);
    });
    window.location.reload()
  }

  return (
    <Grid container className={Style.profileFix}>
      <Grid item xs={12} className={Style.griditem}>
        <TextField fullWidth label='名前' value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => nameChange(e)} />
      </Grid>
      <Grid item xs={12} className={Style.griditem}>
        <TextField fullWidth multiline rows={3} value={comment} label='自己紹介' onChange={(e: React.ChangeEvent<HTMLInputElement>) => commentChange(e)} />
      </Grid>
      <Grid container>
        <Grid item xs={12} className={Style.griditem}>
          <Button variant="contained" component="label">
            ヘッダー
            <input hidden accept="image/*" multiple type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => headerChange(e)}/>
          </Button>
        </Grid>
        <Grid item xs={12} className={header === '' ? Style.beforeupload : Style.griditem}>
          {header === '' ? null : <img src={header} alt='preview' className={Style.thumbnail} />}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} className={icon === '' ? Style.beforeupload : Style.griditem}>
          <Button variant="contained" component="label">
            アイコン
            <input hidden accept="image/*" multiple type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => iconChange(e)}/>
          </Button>
        </Grid>
        <Grid item xs={12} className={Style.griditem}>
          {icon === '' ? null : <img src={icon} alt='preview' className={Style.thumbnail} />}
        </Grid>
      </Grid>
      <Button onClick={() => completion()}>完了</Button>
    </Grid >
  );
}

export default ProfileFix;

