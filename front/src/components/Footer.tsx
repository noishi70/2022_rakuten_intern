import { Drawer, Grid, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Style from './Footer.module.css'
import Search from './Search';
import { useState } from 'react';
import PostComponent from './Post';



type Content = {
    title: string;
    url: string ;
    time: number;
    text: string;
}


type props = {
    setSearchosts: any,
    setContent?:  (arg: Content) => void,
}

const Footer = (props: props) => {
    const [search, toggleSearch] = useState(false);
    const [post, togglePost] = useState(false);
    const anchor = 'bottom';

    return (
        <div className={Style.footer}>
            <Grid container>
                <Grid item xs={4} className={Style.griditem}>
                    <IconButton>
                        <a href='/home'>
                            <HomeIcon fontSize='large' color='primary' />
                        </a>
                    </IconButton>
                </Grid>
                <Grid item xs={4} className={Style.griditem}>
                    <IconButton onClick={() => toggleSearch(true)}>
                        <SearchIcon fontSize='large' color='primary' />
                    </IconButton>
                </Grid>
                <Grid item xs={4} className={Style.griditem}>
                    <IconButton onClick={() => togglePost(true)}>
                        <AddCircleOutlineIcon fontSize='large' color='primary' />
                    </IconButton>
                </Grid>
            </Grid >
            <Drawer anchor={anchor} open={search} onClose={() => toggleSearch(false)}>
                <Search setSearchosts={props.setSearchosts} />
            </Drawer>
            <Drawer anchor={anchor} open={post} onClose={() => togglePost(false)}>
                <PostComponent togglePost={togglePost} setContent={props.setContent} />
            </Drawer>
        </div>
    )
}

export default Footer