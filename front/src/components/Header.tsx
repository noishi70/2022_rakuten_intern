import { Grid, IconButton, Drawer } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import BarChartIcon from '@mui/icons-material/BarChart';
import React, { useState } from 'react';
import Style from './Header.module.css';

type Props = {
  user_id:  number;
  icon: string;
  setPage?: (page: string) => void;
  setMode?: (mode: string) => void;
}

const Header = (props:Props) => {
  const [drawer, toggleDrawer] = useState(false);
  const anchor = 'bottom';

  return (
    <div className={Style.header}>
      <Grid container>
        <Grid item xs={6}>
          <img src={props.icon} alt='icon' className={Style.img} onClick={() => props.setPage?.('Profile@' + props.user_id)} />
        </Grid>
        <Grid item xs={6} className={Style.change}>
          <IconButton onClick={() => toggleDrawer(true)}>
            <AutoAwesomeIcon />
          </IconButton>
          <Drawer anchor={anchor} open={drawer} onClose={() => toggleDrawer(false)}>
              <Grid container className={Style.drawer}>
                <Grid item xs={12}>
                  <IconButton className={Style.drawerbutton} onClick={() => {props.setMode?.('timeline'); toggleDrawer(false)}}>
                    <AccessTimeIcon />タイムライン
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <IconButton className={Style.drawerbutton} onClick={() => {props.setMode?.('bookmark'); toggleDrawer(false)}}>
                    <StarIcon />ブックマーク
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <IconButton className={Style.drawerbutton} onClick={() => {props.setMode?.('ranking'); toggleDrawer(false)}}>
                    <BarChartIcon />ランキング
                  </IconButton>
                </Grid>
              </Grid>
          </Drawer>
        </Grid>
      </Grid>
    </div>
  );
}

export default Header;