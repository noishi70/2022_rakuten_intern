import { Card, Input, TextField } from '@mui/material';
import React, { useState } from 'react';
import Style from './Content.module.css';

type Props = {
  header: string;
  icon: string;
  name: string;
  comment: string;
  setValue?: (page: string) => void;
};

type Profile = {
  header: string;
  icon: string;
  name: string;
  comment: string;
};

const ProfileFix = (props:Props) => {
  const [base64Header, setBase64Header] = useState('/');
  const [base64Icon, setBase64Icon] = useState('/');

  const headerChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    const reader = new FileReader();
    files && files[0] ? (
      reader.readAsDataURL(files[0]),
      reader.onload = () => {
        setBase64Header( typeof reader.result === 'string' ?  reader.result : '');
      }
    ) : null;
  }

  const iconChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    const reader = new FileReader();
    files && files[0] ? (
      reader.readAsDataURL(files[0]),
      reader.onload = () => {
        setBase64Icon( typeof reader.result === 'string' ?  reader.result : '');
      }
    ) : null;
  }

  return (
    <div className={Style.content}>
      <Card>
        <TextField fullWidth label='名前' variant='standard' />
      </Card>
      <Card>
        <TextField fullWidth multiline rows={3} label='自己紹介' variant='standard' />
      </Card>
      <Card>
        ヘッダー
        <Input type='file' onChange={(e: React.ChangeEvent<HTMLInputElement>) => headerChange(e)} />
        <img src={base64Header} alt='preview'/>
      </Card>
      <Card>
        アイコン
        <Input type='file' onChange={(e: React.ChangeEvent<HTMLInputElement>) => iconChange(e)} />
        <img src={base64Icon} alt='preview'/>
      </Card>
    </div>
  );
}

export default ProfileFix;

