import {ChangeEvent, useState} from "react";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {TextField, Box , IconButton} from "@mui/material";

type Key = {
  Word: string;
  time: number | null;
}

type Props = {
  setValue?: (key: Key) => void;
};

export default function Search(props: Props){
  const [searchWordValue, setSearchWordValue] = useState<string>("");
  const [searchTimeValue, setSearchTimeValue] = useState<number | null>(null);

  

  const changeSearchedWordHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //console.log(event.target.value);
    setSearchWordValue(event.target.value);
  }
  const changeSearchedValueHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchTimeValue(parseInt(event.target.value));
  }
  const handleSearch = () => {
    const newKey: Key = {
      Word: searchWordValue,
      time: searchTimeValue,
    }
    props.setValue?.(newKey);
  }

  return (
    <div className="search">
      <div className='search__bar'>
      <Box
      >
        <div className="m-1">
          <TextField
            id="search-keyword"
            label="Search"
            variant="standard"
            value={searchWordValue}
            onChange={(event) => changeSearchedWordHandler(event)}
          />
        </div>
        <div className="m-1">
          <TextField
            id="search-keyword"
            label="所要時間"
            variant="standard"
            value={searchTimeValue}
            onChange={(event) => changeSearchedValueHandler(event)}
          />
        </div>
        <div className="m-1">
          <IconButton aria-label="Search" size="large" onClick={() => handleSearch()}>
            <SearchRoundedIcon />
          </IconButton>
        </div>
        
        
      </Box>
      </div>
    </div>
  );
}

