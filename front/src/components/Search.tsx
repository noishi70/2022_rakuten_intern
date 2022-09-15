import { ChangeEvent, useState } from "react";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { TextField, IconButton, Stack, Container } from "@mui/material";
import Style from './Search.module.css';

type Key = {
  word: string;
  time: number;
}

type Props = {
  setKey?: (arg: Key) => void;
  toggleSearch?: (arg: boolean) => void;
};

export default function Search(props: Props) {
  const [searchWordValue, setSearchWordValue] = useState<string>("");
  const [searchTimeValue, setSearchTimeValue] = useState<number>(0);



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
    const newKey: Key = {
      word: searchWordValue,
      time: searchTimeValue,
    }
    props.setKey?.(newKey);
    props.toggleSearch?.(false);
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

