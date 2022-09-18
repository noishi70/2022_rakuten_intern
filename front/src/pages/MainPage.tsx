import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import Style from '../App.module.css';
import Header from '../components/Header';
import Content from '../components/Content';
import Footer from '../components/Footer';






export default function MainPage() {
    type User = {
        user_id: string;
        name: string;
        header_img: string;
        icon: string;
        comment: string;
        follows: number;
        followers: number;
        posts: [{
          id: string;
          title: string;
          content: string;
          url: string;
          time: number;
          datetime: string;
        }]
    }
    const [userMe, setUserMe] = useState<User>({
        user_id: "",
        name: "",
        header_img: "",
        icon: "",
        comment: "",
        follows: 0,
        followers: 0,
        posts: [{
          id: "",
          title: "",
          content: "",
          url: "",
          time: 0,
          datetime: ""
        }]
    });
    const [timeline, setTimeline] = useState<Post[]>([]);
    const [content, setContent] = useState({title: '', url: '', time: 0, text: ''})

    useEffect(() => {
        //console.log("effect")
        let url = process.env.REACT_APP_API + '/api/users/me';
        const API_TOKEN = sessionStorage.getItem('access_token');
        axios.get(url, { headers: { Authorization: "Bearer " + API_TOKEN } }).then((res) => {
            setUserMe(res.data)
        })
        url = process.env.REACT_APP_API + '/api/users/timeline';
        axios.get(url, { headers: { Authorization: "Bearer " + API_TOKEN } }).then((res) => {
            setTimeline(res.data);
        })
      }, []);
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
    

    return (
        <div>
            <Header user_id={userMe.user_id} icon={userMe.icon} setSearchosts={setTimeline}/>
            <Grid container className={Style.content}>
              {
                timeline.map( post => 
                  <Grid key={post.post_id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Content {...post} />
                  </Grid>
                )
              }
            </Grid>
            <Footer setSearchosts={setTimeline} setContent={setContent} />
          </div>
    );
}