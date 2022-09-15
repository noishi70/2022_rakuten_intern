import React, { useState } from 'react';
import { TextField, Button, Stack, Container } from "@mui/material";
import Style from './Post.module.css';

type Content = {
  title: string;
  url: string;
  time: number;
  text: string;
}

type Props = {
  togglePost?: (arg: boolean) => void;
  setContent?: (arg: Content) => void;
}

export default function Search(props: Props) {
  const [tweet, setTweet] = useState<Content>({ title: "", url: "", time: 0, text: "" });


  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet({ ...tweet, title: event.target.value })
  }
  const handleURLChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet({ ...tweet, url: event.target.value })
  }
  const handleTimeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isNaN(Number(event.target.value))) {
      setTweet({ ...tweet, time: Number(event.target.value) })
    }
  }
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet({ ...tweet, text: event.target.value })
  }
  const output = () => {
    props.setContent?.(tweet);
    props.togglePost?.(false);
  }

  return (
    <>
      <Container maxWidth="xs" className={Style.all}>
        <Stack spacing={2}>
          <TextField
            id="search-keyword"
            label="タイトル"
            value={tweet.title}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleTitleChange(event)}
          />
          <TextField
            id="search-keyword"
            label="内容"
            value={tweet.text}
            multiline={true}
            rows={5}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleTextChange(event)}
          />
          <TextField
            id="search-keyword"
            label="URL"
            value={tweet.url}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleURLChange(event)}
          />
          <TextField
            id="search-keyword"
            label="所用時間"
            value={tweet.time}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleTimeChange(event)}
          />
          <Button variant="contained" onClick={() => output()} style={{borderRadius: '20px'}}> 投稿 </Button>
        </Stack>
      </Container>
    </>

  );
}