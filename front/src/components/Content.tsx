import { Grid } from '@mui/material';
import React, { useState } from 'react';
import Style from './Content.module.css';

type Props = {
  user_id: number
  name: string
  icon: string
  post_id: number
  title: string
  content: string
  url: string
  time: number
  datetime: string
}

const Content = (props:Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={Style.content}>
      <div>
        <p>{props.name}</p>
        <img src={'data:image/png;base64,' + props.icon} alt='icon' />
        <p>{props.title}</p>
        
        <div className={ open ? Style.accordionopen : Style.accordion }>
          {/*{ open ? <MultiLine line={props.content} /> : <SmallLine line={props.content} /> }*/}
          <MultiLine line={props.content} />
          <a href={props.url}>{props.url}</a>
        </div>
        { open ? <button className={Style.openbutton} onClick={() => setOpen(false)}>表示を減らす</button> : <button className={Style.openbutton} onClick={() => setOpen(true)}>続きを表示</button> }
        
      </div>
      <Grid>
      
      </Grid>
    </div>
  );
}

export default Content;

const MultiLine = ({ line }: { line: string }) => {
  const lines = line.split('\n').map((item, index) => {
    return (
      <React.Fragment key={index}>
        {item}<br />
      </React.Fragment>
    );
  });

  return <p>{lines}</p>
}

const SmallLine = ({ line }: { line: string }) => {
  const small = line.substring(0, 10);
  const lines = small.split('\n').map((item, index) => {
    return (
      <React.Fragment key={index}>
        {item}<br />
      </React.Fragment>
    );
  });

  return <p>{lines}</p>
}