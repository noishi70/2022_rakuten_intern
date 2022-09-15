import { Drawer, Grid, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Style from './Footer.module.css'
import Search from './Search';
import { useState } from 'react';


type Key = {
    word: string;
    time: number;
}

type props = {
    setKey?: (key: Key) => void;
}

const Footer = (props: props) => {
    const [search, toggleSearch] = useState(false);
    const anchor = 'bottom';

    return (
        <div className={Style.footer}>
            <Grid container>
                <Grid item xs={4} className={Style.griditem}>
                    <IconButton>
                        <a href='/'>
                            <HomeIcon fontSize='large' color='primary' />
                        </a>
                    </IconButton>
                </Grid>
                <Grid item xs={4} className={Style.griditem}>
                    <IconButton>
                        <SearchIcon fontSize='large' color='primary' />
                    </IconButton>
                </Grid>
                <Grid item xs={4} className={Style.griditem}>
                    <IconButton>
                        <AddCircleOutlineIcon fontSize='large' color='primary' />
                    </IconButton>
                </Grid>
            </Grid >
            <Drawer anchor={anchor} open={search} onClose={() => toggleSearch(false)}>
                <Search setKey={props.setKey} />
            </Drawer>
        </div>
    )
}

export default Footer