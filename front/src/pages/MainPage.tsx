import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import Style from '../App.module.css';
import Header from '../components/Header';
import Content from '../components/Content';
import Profile from '../components/Profile';
import Login from '../components/Login';
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
    const [header, setHeader] = useState();
    const [page, setPage] = useState('/');
    const [mode, setMode] = useState('/');
    const [search, setSearch] = useState({word: '', time: 0});
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
    
    const header_info = {
        user_id: "0",
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAABzCAYAAACrQz3mAAAAAXNSR0IArs4c6QAAA9Z0RVh0bXhmaWxlACUzQ214ZmlsZSUyMGhvc3QlM0QlMjJhcHAuZGlhZ3JhbXMubmV0JTIyJTIwbW9kaWZpZWQlM0QlMjIyMDIyLTA5LTEzVDA0JTNBMzElM0EzNC43MzBaJTIyJTIwYWdlbnQlM0QlMjI1LjAlMjAoV2luZG93cyUyME5UJTIwMTAuMCUzQiUyMFdpbjY0JTNCJTIweDY0KSUyMEFwcGxlV2ViS2l0JTJGNTM3LjM2JTIwKEtIVE1MJTJDJTIwbGlrZSUyMEdlY2tvKSUyMENocm9tZSUyRjEwNS4wLjAuMCUyMFNhZmFyaSUyRjUzNy4zNiUyMEVkZyUyRjEwNS4wLjEzNDMuMzMlMjIlMjB2ZXJzaW9uJTNEJTIyMjAuMy4wJTIyJTIwZXRhZyUzRCUyMjNQVDhVNzdJQmU2Ml94STJNNllYJTIyJTIwdHlwZSUzRCUyMmRldmljZSUyMiUzRSUzQ2RpYWdyYW0lMjBpZCUzRCUyMkVjaGY0UjJwdzhKZjVVYWN1LV96JTIyJTNFalpQZlQ4SXdFTWYlMkZtajFLMkNvSWp6cEJIelFod2NSSFU3WmphJTJCeDZTM2ZBOEslMkIzWlZlMnhaRElFdEolMkI3a2Z2ZTcxR0lxM2FGeXZyOGgxejBGRXl6ZHRJUEVkSmNoOHYzTDhINXc2SVpObUJ3cXE4UTNFUHR1b0hHRTZaSGxRT3pjaVJFRFdwZWd3ek5BWXlHakZwTFo3R2JudlU0MU5yV2NBZnNNMmslMkZrcyUyRlZVNWxSeGZKUTg5ZlFSVmxPRG1lczc1S0JtZFcwcFF5eDlNQWlWVWtVb3RJM2FwcVU5QyUyQmQ2RXZYZHo2aHZWYW1BVkQlMkZ3bEl1b0NqMUFmV3huWFJPWWc5Z2lYbHRMJTJGSkhlZ05Ob29VR21mYUlSRldrWGdLRG85YUZkNUFXRHRhVXFYZEpuWkxKN0wyeWFxMjhPTXcyY2xHWlpPOWxSVjhaV2dOV09kMEdZNTRPWm43QUNQckQ5eWd1b2lZT3JKWFdxZW8wVjVxRXVuYWY1NmpvUUh2Zmo0RFdmeUdZREZvZ0pOc1daZzhFRHJrQ3NvVjlEbllFMnVaS2ZMVE9mT25XeVRKcXU5aU1YT0UyJTJCYVVRM3V6OWZIMVF0MURBS3lBN05tNWNJQ1k4d3p3STRqRCUyRmpRWUtVYmxZSm9Da3p6RXhUVnpmODl1d1ZjZHR2MUlYV3lEZHlsV3Z3JTNEJTNEJTNDJTJGZGlhZ3JhbSUzRSUzQyUyRm14ZmlsZSUzRc76F3gAAALbSURBVHhe7d3LcdtQEETRhyAUhVZgBE5CCtJOQhEQK0WhIKCCy6Yp68cP8Gbm8mLJzWP3UUNcEMWheWEaGDBJDNLEBP0RiCkmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVCUYb/f3w3DcN8z0ziOTz3PizhrmqYfPc+d5/n59232D+hja+2u0xt4HsfxV6ezuh8zTdNDa63XQF7mef652+1eDv8zBV3HPApyefdvPgAJeh1oJOQ7TG+5l2NGQ36IKej5oBkgP8UU9HTQLJBfYgr6PWgmyG8xBf0cNBvkSZiCvgfNCHkypqD/QLNCnoUpaGuZIc/GvGXQ7JAXYd4iaAXIizFvCbQK5FWYtwBaCfJqTDJoNchVMImgFSFXwySBVoVcFZMAWhlydczKoNUhN8GsCEqA3AyzEigFclPMCqAkyM0xM4PSILtgZgQlQnbDzARKheyKmQGUDNkdMxKUDhmCGQUa8ezHkrXnFfZ8ZsCjED16PTzE0+Ow/88Iwwxa6JYdh0KG3WaPG4UsNBwyBSZgoSkg02AWBk0DmQqzIGgqyHSYhUDTQabELACaEjItZmLQtJCpMROCpoZMj5kIND1kCcwEoCUgy2AGgpaBLIUZAFoKshxmR9BykCUxO4CWhCyLuSFoWcjSmBuAloYsj7kiaHlIBOYKoAhIDOYVoBhIFOYFoChIHOYZoDhIJOYJoEhILOYXoFhINOYHoGhIPOYx6N+fi1heo16h32jvVeryRevldz96nRd1zivJX5MRtAF7OgAAAABJRU5ErkJggg==',
        setPage: setPage,
        setMode: setMode,
      }
    
    const footer_info = {
        setKey: setSearch,
        setContent: setContent,
      }

    return (
        <div>
            <Header user_id={userMe.user_id} icon={userMe.icon}/>
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