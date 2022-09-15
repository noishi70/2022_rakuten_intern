import { Grid, IconButton, Drawer } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useState } from 'react';
import Style from './Header.module.css';
import axios from 'axios';

type Props = {
  user_id: string;
  icon: string;
  setSearchosts: any;
  setPage?: (arg: string) => void;
  setMode?: (arg: string) => void;
}

const Header = (props: Props) => {
  const [drawer, toggleDrawer] = useState(false);
  const anchor = 'bottom';
  const showtimeline = () => {
    let url = process.env.REACT_APP_API + '/api/users/timeline';
    const API_TOKEN = sessionStorage.getItem('access_token');
    axios.get(url, { headers: { Authorization: "Bearer " + API_TOKEN } }).then((res) => {
      props.setSearchosts(res.data);
    });
  }
  const showbookmark = () => {
    let url = process.env.REACT_APP_API + '/api/users/favorites';
    const API_TOKEN = sessionStorage.getItem('access_token');
    axios.get(url, { headers: { Authorization: "Bearer " + API_TOKEN } }).then((res) => {
      props.setSearchosts(res.data);
    });
  }

  return (
    <div className={Style.header}>
      <Grid container>
        <Grid item xs={6}>
          <a href={'/profile/' + props.user_id}>
            <img src={'data:image/png;base64,' + props.icon} alt='icon' className={Style.img} onClick={() => props.setPage?.('Profile@' + props.user_id)} />
          </a>
        </Grid>
        <Grid item xs={6} className={Style.change}>
          <IconButton onClick={() => toggleDrawer(true)}>
            <AutoAwesomeIcon fontSize='large' color='primary' />
          </IconButton>
        </Grid>
        <Drawer anchor={anchor} open={drawer} onClose={() => toggleDrawer(false)}>
          <Grid container className={Style.drawer}>
            <Grid item xs={12} md={4}>
              <IconButton className={Style.drawerbutton} onClick={() => showtimeline()}>
                <AccessTimeIcon fontSize='large' color='primary' />タイムライン
              </IconButton>
            </Grid>
            <Grid item xs={12} md={4}>
              <IconButton className={Style.drawerbutton} onClick={() => showbookmark()}>
                <StarIcon fontSize='large' color='primary' />ブックマーク
              </IconButton>
            </Grid>
            <Grid item xs={12} md={4}>
              <IconButton className={Style.drawerbutton} onClick={() => { props.setMode?.('ranking'); toggleDrawer(false) }}>
                <BarChartIcon fontSize='large' color='primary' />ランキング
              </IconButton>
            </Grid>
          </Grid>
        </Drawer>
      </Grid>
    </div>
  );
}

export default Header;