import { ChangeEvent, useState } from "react";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { TextField, IconButton, Stack, Container } from "@mui/material";
import Style from './Search.module.css';
import axios from 'axios';

type Key = {
  word: string;
  time: number;
}

type Post = {
  user_id: string;
  name: string;
  icon: string;
  post_id: string;
  title: string;
  content: string;
  url: string;
  time: number;
  datetime: string;
}

type Props = {
  setSearchosts: (arg: Post[]) => void
};

export default function Search(props: Props) {
  const [searchWordValue, setSearchWordValue] = useState<string>("");
  const [searchTimeValue, setSearchTimeValue] = useState<number>(0);
  const [searchosts, setSearchosts] = useState<Post[]>([]);

  



  const changeSearchedWordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(event.target.value);
    setSearchWordValue(event.target.value);
  }
  const changeSearchedValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(event.target.value))) {
      setSearchTimeValue(Number(event.target.value));
    }
  }
  const handleSearch = () => {
    let url = process.env.REACT_APP_API + '/api/posts?key_word=' + searchWordValue + '&time=' + searchTimeValue;
    const API_TOKEN = sessionStorage.getItem('access_token');
    axios.get(url, { headers: { Authorization: "Bearer " + API_TOKEN } }).then((res) => {
      props.setSearchosts(res.data)
    })
  }

  return (
    <Container maxWidth="xs" className={Style.all}>
      <Stack spacing={2}>
        <TextField
          id="search-keyword"
          label="Search"
          value={searchWordValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeSearchedWordHandler(event)}
        />
        <TextField
          id="search-keyword"
          label="所要時間"
          value={searchTimeValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeSearchedValueHandler(event)}
        />
        <IconButton aria-label="Search" size="large" onClick={() => handleSearch()}>
          <SearchRoundedIcon fontSize="large" color="primary"/>
        </IconButton>
      </Stack>
    </Container>
  );
}

