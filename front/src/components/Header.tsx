import { Grid, IconButton, Drawer } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useState } from 'react';
import Style from './Header.module.css';

type Props = {
  user_id: number;
  icon: string;
  setPage?: (arg: string) => void;
  setMode?: (arg: string) => void;
}

const Header = (props: Props) => {
  const [drawer, toggleDrawer] = useState(false);
  const anchor = 'bottom';

  return (
    <div className={Style.header}>
      <Grid container>
        <Grid item xs={6}>
          <a href={'/profile/@' + props.user_id}>
            <img src={props.icon} alt='icon' className={Style.img} onClick={() => props.setPage?.('Profile@' + props.user_id)} />
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
              <IconButton className={Style.drawerbutton} onClick={() => { props.setMode?.('timeline'); toggleDrawer(false) }}>
                <AccessTimeIcon fontSize='large' color='primary' />タイムライン
              </IconButton>
            </Grid>
            <Grid item xs={12} md={4}>
              <IconButton className={Style.drawerbutton} onClick={() => { props.setMode?.('bookmark'); toggleDrawer(false) }}>
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