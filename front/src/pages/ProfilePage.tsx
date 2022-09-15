import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import Style from '../App.module.css';
import Header from '../components/Header';
import Content from '../components/Content';
import Profile from '../components/Profile';
import Login from '../components/Login';
import Footer from '../components/Footer';
import {useLocation} from 'react-router-dom';


export default function ProfilePage() {


    let path = useLocation().pathname.replace("/profile/", "")

    type User = {
        user_id: string;
        name: string;
        header_img: string;
        icon: string;
        comment: string;
        follows: number;
        followers: number;
        is_follow: boolean
        posts: [{
          id: string;
          title: string;
          content: string;
          url: string;
          time: number;
          datetime: string;
        }]
    }
    type Post = {
        user_id: string;
        name: string;
        icon: string;
        post_id: number;
        title: string;
        content: string;
        url: string;
        time: number;
        datetime: string;
      }

    const [user, setUser] = useState<User>(
        {
            user_id: "",
            name: "",
            header_img: "",
            icon: "",
            comment: "",
            follows: 0,
            followers: 0,
            is_follow: false,
            posts: [{
              id: "",
              title: "",
              content: "",
              url: "",
              time: 0,
              datetime: ""
            }]
        }
    );
    const [searchosts, setSearchosts] = useState<Post[]>();
    const [profile, setProfile] = useState({header: '', icon: '', name: '', comment: ''});
    const [userid, setUserid] = useState<string>("");
    const [content, setContent] = useState({title: '', url: '', time: 0, text: ''})

    useEffect(() => {
        let url = process.env.REACT_APP_API + '/api/users/' + path;
        const API_TOKEN = sessionStorage.getItem('access_token');
        axios.get(url, { headers: { Authorization: "Bearer " + API_TOKEN } }).then((res) => {
            console.log(res.data.name)
            setUser(res.data)
        })
        url = process.env.REACT_APP_API + '/api/users/me';
        axios.get(url, { headers: { Authorization: "Bearer " + API_TOKEN } }).then((res) => {
            setUserid(res.data.user_id)
        })
      }, []);
    
    
    return (
        <div>
            <Profile my_id={userid} user_id={user.user_id} header={user.header_img} icon={user.icon} name={user.name} comment={user.comment} follow={user.follows} follower={user.followers} is_follow={user.is_follow} setProfile={setProfile}/>
            <Grid container className={Style.content}>
              {
                user.posts.map( post => 
                  <Grid key={post.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Content user_id={user.user_id} name={user.name} icon={user.icon} post_id={post.id} title={post.title} content={post.content} url={post.url} time={post.time} datetime={post.datetime} />
                  </Grid>
                )
              }
            </Grid>
            <Footer setSearchosts={setSearchosts} setContent={setContent} />
          </div>
    );
}