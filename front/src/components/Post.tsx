import React, { useState } from 'react';
import {TextField, Button , IconButton, Stack} from "@mui/material";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Style from './Post.module.css';

type Content = {
  title: string;
  url: string ;
  time: number;
  text: string;
}

type Props = {
  setContent:  (arg:Content) => void,
}

export default function Search(props: Props){
  const [tweet, setTweet] = useState<Content>({title: "", url: "", time: 0, text: ""});


  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet({...tweet, title: event.target.value})
  }
  const handleURLChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet({...tweet, url: event.target.value})
  }
  const handleTimeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if(!isNaN(Number(event.target.value))){
      setTweet({...tweet, time:  Number(event.target.value)})
    }
  }
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet({...tweet, text: event.target.value})
  }
  const output = () => {
    props.setContent(tweet);
  }

  return(
    <>

    <div className={Style.div.Wrapper}>
      <div className={Style.div.Head}>
        <div className={Style.div.IconWrapper}>
          <IconButton  aria-label="Search" size="large" className={Style.button.CloseButton}>
            <CancelOutlinedIcon className={Style.button.CloseButton.svg} />
          </IconButton>
        </div>
      </div>
      <div className={Style.div.Body}>
        <div className={Style.div.User}>
          <img src="https://placehold.jp/3d4070/ffffff/150x150.png" className={Style.div.User.img} />
        </div>
        <div className={Style.div.Form}>
          <Stack spacing={2} className={Style.div.Form}>
            <TextField
                      className={Style.div.FormText}
                      id="search-keyword"
                      label="タイトル"
                      variant="standard"
                      value={tweet.title}
                      rows = {1}
                      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleTitleChange(event)}
            />
            <TextField
                      id="search-keyword"
                      label="内容"
                      variant="standard"
                      value={tweet.text}
                      multiline = {true}
                      rows = {5}
                      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleTextChange(event)}
                      
            />
            <TextField
                      id="search-keyword"
                      label="URL"
                      variant="standard"
                      value={tweet.url}
                      rows = {1}
                      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleURLChange(event)}
            />
            <TextField
                      id="search-keyword"
                      label="所用時間"
                      variant="standard"
                      value={tweet.time}
                      rows = {1}
                      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleTimeChange(event)}
            />
          </Stack>
          <div className={Style.div.FormTail}>
            <button className={Style.button.ButtonWrapper}>
              <Button variant="text" onClick={() => output()}> 投稿 </Button>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
}