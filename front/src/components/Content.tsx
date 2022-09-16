import { Grid } from '@mui/material';
import React, { useState } from 'react';
import Style from './Content.module.css';

type Props = {
  user_id: string
  name: string
  icon: string
  post_id: string
  title: string
  content: string
  url: string
  time: number
  datetime: string
}

const Content = (props:Props) => {
  const [open, setOpen] = useState(false);
  const text = props.content;
  const minText = text.substring(0, 21);

  return (
    <div className={Style.content}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Grid style={{ height: "100%" }}>
            <a href={'/profile/' + props.user_id}>
              <img src={'data:image/png;base64,' + props.icon} alt='icon' className={Style.img} />
            </a>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={1} alignItems={'center'}>
            <Grid item xs={5} className={Style.user_info}>
              <p className={Style.name}>{props.name.substring(0,10) + '...'}</p>
              <p className={Style.user_id}>@{props.user_id.substring(0,10) + '...'}</p>
            </Grid>
            <Grid item xs={7} className={Style.datetime}>
              <p>{props.datetime}</p>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <p className={Style.title}>{props.title}</p>
            <Grid item xs={12} className={ text.length > 21 ? ( open ? Style.accordionopen : Style.accordion ) : '' }>
              <MultiLine line={ text.length > 21 || minText.indexOf('\n') != -1 ? ( open ? text : ( minText.indexOf('\n') == -1 ? minText + '...' : minText.split('\n')[0] + '...' )) : minText }/>
              <Grid item xs={1}>
                { text.length > 21 || minText.indexOf('\n') != -1 ? ( open ? <a href={props.url} className={Style.url}>{props.url}</a> : null ) : <a href={props.url} className={Style.urlshort}>{props.url}</a> }
              </Grid>
            </Grid>
            <Grid item xs={12}>
              { text.length > 21
                ? ( open ? <button className={Style.closebutton} onClick={() => setOpen(false)}>表示を減ら�?</button> : <button className={Style.openbutton} onClick={() => setOpen(true)}>続きを表示</button> )
                : null 
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Content;

const MultiLine = ({ line }: { line: string }) => {
  const lines = line.split('\n').map((item, index) => {
    return (
      <React.Fragment key={index}>
        <p>{item}</p>
      </React.Fragment>
    );
  });

  return (
    <div className={Style.text}>{lines}</div>
  );
}