import { Grid } from '@mui/material';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Style from './App.module.css';

import Header from './components/Header';
import Content from './components/Content'
import Profile from './components/Profile';
import Footer from './components/Footer';
import axios from 'axios';

const App: any = () => {
  type User = {
    user_id: number;
    name: string;
    header_img: string;
    icon: string;
    comment: string;
    follows: number;
    followers: number;
    posts: [{
      id: number;
      title: string;
      content: string;
      url: string;
      time: number;
      datatime: string;
    }]
  }

  type Post = {
    user_id: number;
    name: string;
    icon: string;
    post_id: number;
    title: string;
    content: string;
    url: string;
    time: number;
    datatime: string;
  }

  {/* API用hooks */ }
  const [userMe, setUserMe] = useState<User>();
  const [userID, setUserID] = useState<User>();
  const [timeline, setTimeline] = useState<Array<Post>>();
  const [favorite, setFavorite] = useState<Array<Post>>();
  const [ranking, setRanking] = useState<Array<Post>>();

  const [page, setPage] = useState('/');
  const [mode, setMode] = useState('/');
  const [profile, setProfile] = useState({ header: '', icon: '', name: '', comment: '' });
  const [search, setSearch] = useState({ word: '', time: 0 });
  const [content, setContent] = useState({ title: '', url: '', time: 0, text: '' })

  const apiurl = 'http://0.0.0.0:4000';

  {/* APIによるデータ取得 */ }
  const usermeget = () => {
    axios.get(apiurl).then((res) => {
      setUserMe(res.data);
    })
  }

  const userIDget = () => {
    axios.get(apiurl).then((res) => {
      setUserID(res.data);
    })
  }

  const timelineget = () => {
    axios.get(apiurl).then((res) => {
      setTimeline(res.data);
    })
  }

  const favoriteget = () => {
    axios.get(apiurl).then((res) => {
      setFavorite(res.data);
    })
  }

  const rankingget = () => {
    axios.get(apiurl).then((res) => {
      setRanking(res.data);
    })
  }

  const userme_test = {
    user_id: 0,
    name: 'name',
    header: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAABzCAYAAACrQz3mAAAAAXNSR0IArs4c6QAAA9Z0RVh0bXhmaWxlACUzQ214ZmlsZSUyMGhvc3QlM0QlMjJhcHAuZGlhZ3JhbXMubmV0JTIyJTIwbW9kaWZpZWQlM0QlMjIyMDIyLTA5LTEzVDA0JTNBMzElM0EzNC43MzBaJTIyJTIwYWdlbnQlM0QlMjI1LjAlMjAoV2luZG93cyUyME5UJTIwMTAuMCUzQiUyMFdpbjY0JTNCJTIweDY0KSUyMEFwcGxlV2ViS2l0JTJGNTM3LjM2JTIwKEtIVE1MJTJDJTIwbGlrZSUyMEdlY2tvKSUyMENocm9tZSUyRjEwNS4wLjAuMCUyMFNhZmFyaSUyRjUzNy4zNiUyMEVkZyUyRjEwNS4wLjEzNDMuMzMlMjIlMjB2ZXJzaW9uJTNEJTIyMjAuMy4wJTIyJTIwZXRhZyUzRCUyMjNQVDhVNzdJQmU2Ml94STJNNllYJTIyJTIwdHlwZSUzRCUyMmRldmljZSUyMiUzRSUzQ2RpYWdyYW0lMjBpZCUzRCUyMkVjaGY0UjJwdzhKZjVVYWN1LV96JTIyJTNFalpQZlQ4SXdFTWYlMkZtajFLMkNvSWp6cEJIelFod2NSSFU3WmphJTJCeDZTM2ZBOEslMkIzWlZlMnhaRElFdEolMkI3a2Z2ZTcxR0lxM2FGeXZyOGgxejBGRXl6ZHRJUEVkSmNoOHYzTDhINXc2SVpObUJ3cXE4UTNFUHR1b0hHRTZaSGxRT3pjaVJFRFdwZWd3ek5BWXlHakZwTFo3R2JudlU0MU5yV2NBZnNNMmslMkZrcyUyRlZVNWxSeGZKUTg5ZlFSVmxPRG1lczc1S0JtZFcwcFF5eDlNQWlWVWtVb3RJM2FwcVU5QyUyQmQ2RXZYZHo2aHZWYW1BVkQlMkZ3bEl1b0NqMUFmV3huWFJPWWc5Z2lYbHRMJTJGSkhlZ05Ob29VR21mYUlSRldrWGdLRG85YUZkNUFXRHRhVXFYZEpuWkxKN0wyeWFxMjhPTXcyY2xHWlpPOWxSVjhaV2dOV09kMEdZNTRPWm43QUNQckQ5eWd1b2lZT3JKWFdxZW8wVjVxRXVuYWY1NmpvUUh2Zmo0RFdmeUdZREZvZ0pOc1daZzhFRHJrQ3NvVjlEbllFMnVaS2ZMVE9mT25XeVRKcXU5aU1YT0UyJTJCYVVRM3V6OWZIMVF0MURBS3lBN05tNWNJQ1k4d3p3STRqRCUyRmpRWUtVYmxZSm9Da3p6RXhUVnpmODl1d1ZjZHR2MUlYV3lEZHlsV3Z3JTNEJTNEJTNDJTJGZGlhZ3JhbSUzRSUzQyUyRm14ZmlsZSUzRc76F3gAAALbSURBVHhe7d3LcdtQEETRhyAUhVZgBE5CCtJOQhEQK0WhIKCCy6Yp68cP8Gbm8mLJzWP3UUNcEMWheWEaGDBJDNLEBP0RiCkmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVCUYb/f3w3DcN8z0ziOTz3PizhrmqYfPc+d5/n59232D+hja+2u0xt4HsfxV6ezuh8zTdNDa63XQF7mef652+1eDv8zBV3HPApyefdvPgAJeh1oJOQ7TG+5l2NGQ36IKej5oBkgP8UU9HTQLJBfYgr6PWgmyG8xBf0cNBvkSZiCvgfNCHkypqD/QLNCnoUpaGuZIc/GvGXQ7JAXYd4iaAXIizFvCbQK5FWYtwBaCfJqTDJoNchVMImgFSFXwySBVoVcFZMAWhlydczKoNUhN8GsCEqA3AyzEigFclPMCqAkyM0xM4PSILtgZgQlQnbDzARKheyKmQGUDNkdMxKUDhmCGQUa8ezHkrXnFfZ8ZsCjED16PTzE0+Ow/88Iwwxa6JYdh0KG3WaPG4UsNBwyBSZgoSkg02AWBk0DmQqzIGgqyHSYhUDTQabELACaEjItZmLQtJCpMROCpoZMj5kIND1kCcwEoCUgy2AGgpaBLIUZAFoKshxmR9BykCUxO4CWhCyLuSFoWcjSmBuAloYsj7kiaHlIBOYKoAhIDOYVoBhIFOYFoChIHOYZoDhIJOYJoEhILOYXoFhINOYHoGhIPOYx6N+fi1heo16h32jvVeryRevldz96nRd1zivJX5MRtAF7OgAAAABJRU5ErkJggg==',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAABzCAYAAACrQz3mAAAAAXNSR0IArs4c6QAAA9Z0RVh0bXhmaWxlACUzQ214ZmlsZSUyMGhvc3QlM0QlMjJhcHAuZGlhZ3JhbXMubmV0JTIyJTIwbW9kaWZpZWQlM0QlMjIyMDIyLTA5LTEzVDA0JTNBMzElM0EzNC43MzBaJTIyJTIwYWdlbnQlM0QlMjI1LjAlMjAoV2luZG93cyUyME5UJTIwMTAuMCUzQiUyMFdpbjY0JTNCJTIweDY0KSUyMEFwcGxlV2ViS2l0JTJGNTM3LjM2JTIwKEtIVE1MJTJDJTIwbGlrZSUyMEdlY2tvKSUyMENocm9tZSUyRjEwNS4wLjAuMCUyMFNhZmFyaSUyRjUzNy4zNiUyMEVkZyUyRjEwNS4wLjEzNDMuMzMlMjIlMjB2ZXJzaW9uJTNEJTIyMjAuMy4wJTIyJTIwZXRhZyUzRCUyMjNQVDhVNzdJQmU2Ml94STJNNllYJTIyJTIwdHlwZSUzRCUyMmRldmljZSUyMiUzRSUzQ2RpYWdyYW0lMjBpZCUzRCUyMkVjaGY0UjJwdzhKZjVVYWN1LV96JTIyJTNFalpQZlQ4SXdFTWYlMkZtajFLMkNvSWp6cEJIelFod2NSSFU3WmphJTJCeDZTM2ZBOEslMkIzWlZlMnhaRElFdEolMkI3a2Z2ZTcxR0lxM2FGeXZyOGgxejBGRXl6ZHRJUEVkSmNoOHYzTDhINXc2SVpObUJ3cXE4UTNFUHR1b0hHRTZaSGxRT3pjaVJFRFdwZWd3ek5BWXlHakZwTFo3R2JudlU0MU5yV2NBZnNNMmslMkZrcyUyRlZVNWxSeGZKUTg5ZlFSVmxPRG1lczc1S0JtZFcwcFF5eDlNQWlWVWtVb3RJM2FwcVU5QyUyQmQ2RXZYZHo2aHZWYW1BVkQlMkZ3bEl1b0NqMUFmV3huWFJPWWc5Z2lYbHRMJTJGSkhlZ05Ob29VR21mYUlSRldrWGdLRG85YUZkNUFXRHRhVXFYZEpuWkxKN0wyeWFxMjhPTXcyY2xHWlpPOWxSVjhaV2dOV09kMEdZNTRPWm43QUNQckQ5eWd1b2lZT3JKWFdxZW8wVjVxRXVuYWY1NmpvUUh2Zmo0RFdmeUdZREZvZ0pOc1daZzhFRHJrQ3NvVjlEbllFMnVaS2ZMVE9mT25XeVRKcXU5aU1YT0UyJTJCYVVRM3V6OWZIMVF0MURBS3lBN05tNWNJQ1k4d3p3STRqRCUyRmpRWUtVYmxZSm9Da3p6RXhUVnpmODl1d1ZjZHR2MUlYV3lEZHlsV3Z3JTNEJTNEJTNDJTJGZGlhZ3JhbSUzRSUzQyUyRm14ZmlsZSUzRc76F3gAAALbSURBVHhe7d3LcdtQEETRhyAUhVZgBE5CCtJOQhEQK0WhIKCCy6Yp68cP8Gbm8mLJzWP3UUNcEMWheWEaGDBJDNLEBP0RiCkmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVCUYb/f3w3DcN8z0ziOTz3PizhrmqYfPc+d5/n59232D+hja+2u0xt4HsfxV6ezuh8zTdNDa63XQF7mef652+1eDv8zBV3HPApyefdvPgAJeh1oJOQ7TG+5l2NGQ36IKej5oBkgP8UU9HTQLJBfYgr6PWgmyG8xBf0cNBvkSZiCvgfNCHkypqD/QLNCnoUpaGuZIc/GvGXQ7JAXYd4iaAXIizFvCbQK5FWYtwBaCfJqTDJoNchVMImgFSFXwySBVoVcFZMAWhlydczKoNUhN8GsCEqA3AyzEigFclPMCqAkyM0xM4PSILtgZgQlQnbDzARKheyKmQGUDNkdMxKUDhmCGQUa8ezHkrXnFfZ8ZsCjED16PTzE0+Ow/88Iwwxa6JYdh0KG3WaPG4UsNBwyBSZgoSkg02AWBk0DmQqzIGgqyHSYhUDTQabELACaEjItZmLQtJCpMROCpoZMj5kIND1kCcwEoCUgy2AGgpaBLIUZAFoKshxmR9BykCUxO4CWhCyLuSFoWcjSmBuAloYsj7kiaHlIBOYKoAhIDOYVoBhIFOYFoChIHOYZoDhIJOYJoEhILOYXoFhINOYHoGhIPOYx6N+fi1heo16h32jvVeryRevldz96nRd1zivJX5MRtAF7OgAAAABJRU5ErkJggg==',
    comment: 'comment',
    follows: 0,
    followers: 0,
    posts: [
      {
        id: 0,
        title: 'title0',
        content: 'content0',
        url: 'url0',
        time: 0,
        datatime: '2022/09/15'
      },
      {
        id: 1,
        title: 'title1',
        content: 'content1',
        url: 'url1',
        time: 1,
        datatime: '2022/09/16'
      },
    ]
  }

  const userID_test = {
    user_id: 1,
    name: 'user1',
    header: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAABzCAYAAACrQz3mAAAAAXNSR0IArs4c6QAAA9Z0RVh0bXhmaWxlACUzQ214ZmlsZSUyMGhvc3QlM0QlMjJhcHAuZGlhZ3JhbXMubmV0JTIyJTIwbW9kaWZpZWQlM0QlMjIyMDIyLTA5LTEzVDA0JTNBMzElM0EzNC43MzBaJTIyJTIwYWdlbnQlM0QlMjI1LjAlMjAoV2luZG93cyUyME5UJTIwMTAuMCUzQiUyMFdpbjY0JTNCJTIweDY0KSUyMEFwcGxlV2ViS2l0JTJGNTM3LjM2JTIwKEtIVE1MJTJDJTIwbGlrZSUyMEdlY2tvKSUyMENocm9tZSUyRjEwNS4wLjAuMCUyMFNhZmFyaSUyRjUzNy4zNiUyMEVkZyUyRjEwNS4wLjEzNDMuMzMlMjIlMjB2ZXJzaW9uJTNEJTIyMjAuMy4wJTIyJTIwZXRhZyUzRCUyMjNQVDhVNzdJQmU2Ml94STJNNllYJTIyJTIwdHlwZSUzRCUyMmRldmljZSUyMiUzRSUzQ2RpYWdyYW0lMjBpZCUzRCUyMkVjaGY0UjJwdzhKZjVVYWN1LV96JTIyJTNFalpQZlQ4SXdFTWYlMkZtajFLMkNvSWp6cEJIelFod2NSSFU3WmphJTJCeDZTM2ZBOEslMkIzWlZlMnhaRElFdEolMkI3a2Z2ZTcxR0lxM2FGeXZyOGgxejBGRXl6ZHRJUEVkSmNoOHYzTDhINXc2SVpObUJ3cXE4UTNFUHR1b0hHRTZaSGxRT3pjaVJFRFdwZWd3ek5BWXlHakZwTFo3R2JudlU0MU5yV2NBZnNNMmslMkZrcyUyRlZVNWxSeGZKUTg5ZlFSVmxPRG1lczc1S0JtZFcwcFF5eDlNQWlWVWtVb3RJM2FwcVU5QyUyQmQ2RXZYZHo2aHZWYW1BVkQlMkZ3bEl1b0NqMUFmV3huWFJPWWc5Z2lYbHRMJTJGSkhlZ05Ob29VR21mYUlSRldrWGdLRG85YUZkNUFXRHRhVXFYZEpuWkxKN0wyeWFxMjhPTXcyY2xHWlpPOWxSVjhaV2dOV09kMEdZNTRPWm43QUNQckQ5eWd1b2lZT3JKWFdxZW8wVjVxRXVuYWY1NmpvUUh2Zmo0RFdmeUdZREZvZ0pOc1daZzhFRHJrQ3NvVjlEbllFMnVaS2ZMVE9mT25XeVRKcXU5aU1YT0UyJTJCYVVRM3V6OWZIMVF0MURBS3lBN05tNWNJQ1k4d3p3STRqRCUyRmpRWUtVYmxZSm9Da3p6RXhUVnpmODl1d1ZjZHR2MUlYV3lEZHlsV3Z3JTNEJTNEJTNDJTJGZGlhZ3JhbSUzRSUzQyUyRm14ZmlsZSUzRc76F3gAAALbSURBVHhe7d3LcdtQEETRhyAUhVZgBE5CCtJOQhEQK0WhIKCCy6Yp68cP8Gbm8mLJzWP3UUNcEMWheWEaGDBJDNLEBP0RiCkmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVCUYb/f3w3DcN8z0ziOTz3PizhrmqYfPc+d5/n59232D+hja+2u0xt4HsfxV6ezuh8zTdNDa63XQF7mef652+1eDv8zBV3HPApyefdvPgAJeh1oJOQ7TG+5l2NGQ36IKej5oBkgP8UU9HTQLJBfYgr6PWgmyG8xBf0cNBvkSZiCvgfNCHkypqD/QLNCnoUpaGuZIc/GvGXQ7JAXYd4iaAXIizFvCbQK5FWYtwBaCfJqTDJoNchVMImgFSFXwySBVoVcFZMAWhlydczKoNUhN8GsCEqA3AyzEigFclPMCqAkyM0xM4PSILtgZgQlQnbDzARKheyKmQGUDNkdMxKUDhmCGQUa8ezHkrXnFfZ8ZsCjED16PTzE0+Ow/88Iwwxa6JYdh0KG3WaPG4UsNBwyBSZgoSkg02AWBk0DmQqzIGgqyHSYhUDTQabELACaEjItZmLQtJCpMROCpoZMj5kIND1kCcwEoCUgy2AGgpaBLIUZAFoKshxmR9BykCUxO4CWhCyLuSFoWcjSmBuAloYsj7kiaHlIBOYKoAhIDOYVoBhIFOYFoChIHOYZoDhIJOYJoEhILOYXoFhINOYHoGhIPOYx6N+fi1heo16h32jvVeryRevldz96nRd1zivJX5MRtAF7OgAAAABJRU5ErkJggg==',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAABzCAYAAACrQz3mAAAAAXNSR0IArs4c6QAAA9Z0RVh0bXhmaWxlACUzQ214ZmlsZSUyMGhvc3QlM0QlMjJhcHAuZGlhZ3JhbXMubmV0JTIyJTIwbW9kaWZpZWQlM0QlMjIyMDIyLTA5LTEzVDA0JTNBMzElM0EzNC43MzBaJTIyJTIwYWdlbnQlM0QlMjI1LjAlMjAoV2luZG93cyUyME5UJTIwMTAuMCUzQiUyMFdpbjY0JTNCJTIweDY0KSUyMEFwcGxlV2ViS2l0JTJGNTM3LjM2JTIwKEtIVE1MJTJDJTIwbGlrZSUyMEdlY2tvKSUyMENocm9tZSUyRjEwNS4wLjAuMCUyMFNhZmFyaSUyRjUzNy4zNiUyMEVkZyUyRjEwNS4wLjEzNDMuMzMlMjIlMjB2ZXJzaW9uJTNEJTIyMjAuMy4wJTIyJTIwZXRhZyUzRCUyMjNQVDhVNzdJQmU2Ml94STJNNllYJTIyJTIwdHlwZSUzRCUyMmRldmljZSUyMiUzRSUzQ2RpYWdyYW0lMjBpZCUzRCUyMkVjaGY0UjJwdzhKZjVVYWN1LV96JTIyJTNFalpQZlQ4SXdFTWYlMkZtajFLMkNvSWp6cEJIelFod2NSSFU3WmphJTJCeDZTM2ZBOEslMkIzWlZlMnhaRElFdEolMkI3a2Z2ZTcxR0lxM2FGeXZyOGgxejBGRXl6ZHRJUEVkSmNoOHYzTDhINXc2SVpObUJ3cXE4UTNFUHR1b0hHRTZaSGxRT3pjaVJFRFdwZWd3ek5BWXlHakZwTFo3R2JudlU0MU5yV2NBZnNNMmslMkZrcyUyRlZVNWxSeGZKUTg5ZlFSVmxPRG1lczc1S0JtZFcwcFF5eDlNQWlWVWtVb3RJM2FwcVU5QyUyQmQ2RXZYZHo2aHZWYW1BVkQlMkZ3bEl1b0NqMUFmV3huWFJPWWc5Z2lYbHRMJTJGSkhlZ05Ob29VR21mYUlSRldrWGdLRG85YUZkNUFXRHRhVXFYZEpuWkxKN0wyeWFxMjhPTXcyY2xHWlpPOWxSVjhaV2dOV09kMEdZNTRPWm43QUNQckQ5eWd1b2lZT3JKWFdxZW8wVjVxRXVuYWY1NmpvUUh2Zmo0RFdmeUdZREZvZ0pOc1daZzhFRHJrQ3NvVjlEbllFMnVaS2ZMVE9mT25XeVRKcXU5aU1YT0UyJTJCYVVRM3V6OWZIMVF0MURBS3lBN05tNWNJQ1k4d3p3STRqRCUyRmpRWUtVYmxZSm9Da3p6RXhUVnpmODl1d1ZjZHR2MUlYV3lEZHlsV3Z3JTNEJTNEJTNDJTJGZGlhZ3JhbSUzRSUzQyUyRm14ZmlsZSUzRc76F3gAAALbSURBVHhe7d3LcdtQEETRhyAUhVZgBE5CCtJOQhEQK0WhIKCCy6Yp68cP8Gbm8mLJzWP3UUNcEMWheWEaGDBJDNLEBP0RiCkmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVCUYb/f3w3DcN8z0ziOTz3PizhrmqYfPc+d5/n59232D+hja+2u0xt4HsfxV6ezuh8zTdNDa63XQF7mef652+1eDv8zBV3HPApyefdvPgAJeh1oJOQ7TG+5l2NGQ36IKej5oBkgP8UU9HTQLJBfYgr6PWgmyG8xBf0cNBvkSZiCvgfNCHkypqD/QLNCnoUpaGuZIc/GvGXQ7JAXYd4iaAXIizFvCbQK5FWYtwBaCfJqTDJoNchVMImgFSFXwySBVoVcFZMAWhlydczKoNUhN8GsCEqA3AyzEigFclPMCqAkyM0xM4PSILtgZgQlQnbDzARKheyKmQGUDNkdMxKUDhmCGQUa8ezHkrXnFfZ8ZsCjED16PTzE0+Ow/88Iwwxa6JYdh0KG3WaPG4UsNBwyBSZgoSkg02AWBk0DmQqzIGgqyHSYhUDTQabELACaEjItZmLQtJCpMROCpoZMj5kIND1kCcwEoCUgy2AGgpaBLIUZAFoKshxmR9BykCUxO4CWhCyLuSFoWcjSmBuAloYsj7kiaHlIBOYKoAhIDOYVoBhIFOYFoChIHOYZoDhIJOYJoEhILOYXoFhINOYHoGhIPOYx6N+fi1heo16h32jvVeryRevldz96nRd1zivJX5MRtAF7OgAAAABJRU5ErkJggg==',
    comment: 'comment',
    follows: 2,
    followers: 3,
    posts: [
      {
        id: 0,
        title: 'title0',
        content: 'content0',
        url: 'url0',
        time: 0,
        datatime: '2022/09/15'
      },
      {
        id: 1,
        title: 'title1',
        content: 'content1',
        url: 'url1',
        time: 1,
        datatime: '2022/09/16'
      },
    ]
  }

  const timeline_test: Array<Post> = [
    {
      user_id: 0,
      name: 'user0',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAABzCAYAAACrQz3mAAAAAXNSR0IArs4c6QAAA9Z0RVh0bXhmaWxlACUzQ214ZmlsZSUyMGhvc3QlM0QlMjJhcHAuZGlhZ3JhbXMubmV0JTIyJTIwbW9kaWZpZWQlM0QlMjIyMDIyLTA5LTEzVDA0JTNBMzElM0EzNC43MzBaJTIyJTIwYWdlbnQlM0QlMjI1LjAlMjAoV2luZG93cyUyME5UJTIwMTAuMCUzQiUyMFdpbjY0JTNCJTIweDY0KSUyMEFwcGxlV2ViS2l0JTJGNTM3LjM2JTIwKEtIVE1MJTJDJTIwbGlrZSUyMEdlY2tvKSUyMENocm9tZSUyRjEwNS4wLjAuMCUyMFNhZmFyaSUyRjUzNy4zNiUyMEVkZyUyRjEwNS4wLjEzNDMuMzMlMjIlMjB2ZXJzaW9uJTNEJTIyMjAuMy4wJTIyJTIwZXRhZyUzRCUyMjNQVDhVNzdJQmU2Ml94STJNNllYJTIyJTIwdHlwZSUzRCUyMmRldmljZSUyMiUzRSUzQ2RpYWdyYW0lMjBpZCUzRCUyMkVjaGY0UjJwdzhKZjVVYWN1LV96JTIyJTNFalpQZlQ4SXdFTWYlMkZtajFLMkNvSWp6cEJIelFod2NSSFU3WmphJTJCeDZTM2ZBOEslMkIzWlZlMnhaRElFdEolMkI3a2Z2ZTcxR0lxM2FGeXZyOGgxejBGRXl6ZHRJUEVkSmNoOHYzTDhINXc2SVpObUJ3cXE4UTNFUHR1b0hHRTZaSGxRT3pjaVJFRFdwZWd3ek5BWXlHakZwTFo3R2JudlU0MU5yV2NBZnNNMmslMkZrcyUyRlZVNWxSeGZKUTg5ZlFSVmxPRG1lczc1S0JtZFcwcFF5eDlNQWlWVWtVb3RJM2FwcVU5QyUyQmQ2RXZYZHo2aHZWYW1BVkQlMkZ3bEl1b0NqMUFmV3huWFJPWWc5Z2lYbHRMJTJGSkhlZ05Ob29VR21mYUlSRldrWGdLRG85YUZkNUFXRHRhVXFYZEpuWkxKN0wyeWFxMjhPTXcyY2xHWlpPOWxSVjhaV2dOV09kMEdZNTRPWm43QUNQckQ5eWd1b2lZT3JKWFdxZW8wVjVxRXVuYWY1NmpvUUh2Zmo0RFdmeUdZREZvZ0pOc1daZzhFRHJrQ3NvVjlEbllFMnVaS2ZMVE9mT25XeVRKcXU5aU1YT0UyJTJCYVVRM3V6OWZIMVF0MURBS3lBN05tNWNJQ1k4d3p3STRqRCUyRmpRWUtVYmxZSm9Da3p6RXhUVnpmODl1d1ZjZHR2MUlYV3lEZHlsV3Z3JTNEJTNEJTNDJTJGZGlhZ3JhbSUzRSUzQyUyRm14ZmlsZSUzRc76F3gAAALbSURBVHhe7d3LcdtQEETRhyAUhVZgBE5CCtJOQhEQK0WhIKCCy6Yp68cP8Gbm8mLJzWP3UUNcEMWheWEaGDBJDNLEBP0RiCkmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVCUYb/f3w3DcN8z0ziOTz3PizhrmqYfPc+d5/n59232D+hja+2u0xt4HsfxV6ezuh8zTdNDa63XQF7mef652+1eDv8zBV3HPApyefdvPgAJeh1oJOQ7TG+5l2NGQ36IKej5oBkgP8UU9HTQLJBfYgr6PWgmyG8xBf0cNBvkSZiCvgfNCHkypqD/QLNCnoUpaGuZIc/GvGXQ7JAXYd4iaAXIizFvCbQK5FWYtwBaCfJqTDJoNchVMImgFSFXwySBVoVcFZMAWhlydczKoNUhN8GsCEqA3AyzEigFclPMCqAkyM0xM4PSILtgZgQlQnbDzARKheyKmQGUDNkdMxKUDhmCGQUa8ezHkrXnFfZ8ZsCjED16PTzE0+Ow/88Iwwxa6JYdh0KG3WaPG4UsNBwyBSZgoSkg02AWBk0DmQqzIGgqyHSYhUDTQabELACaEjItZmLQtJCpMROCpoZMj5kIND1kCcwEoCUgy2AGgpaBLIUZAFoKshxmR9BykCUxO4CWhCyLuSFoWcjSmBuAloYsj7kiaHlIBOYKoAhIDOYVoBhIFOYFoChIHOYZoDhIJOYJoEhILOYXoFhINOYHoGhIPOYx6N+fi1heo16h32jvVeryRevldz96nRd1zivJX5MRtAF7OgAAAABJRU5ErkJggg==',
      post_id: 0,
      title: 'title0',
      content: 'content0content0content0content0',
      url: 'url0',
      time: 0,
      datatime: '2022/09/15'
    },
    {
      user_id: 1,
      name: 'user1',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAABzCAYAAACrQz3mAAAAAXNSR0IArs4c6QAAA9Z0RVh0bXhmaWxlACUzQ214ZmlsZSUyMGhvc3QlM0QlMjJhcHAuZGlhZ3JhbXMubmV0JTIyJTIwbW9kaWZpZWQlM0QlMjIyMDIyLTA5LTEzVDA0JTNBMzElM0EzNC43MzBaJTIyJTIwYWdlbnQlM0QlMjI1LjAlMjAoV2luZG93cyUyME5UJTIwMTAuMCUzQiUyMFdpbjY0JTNCJTIweDY0KSUyMEFwcGxlV2ViS2l0JTJGNTM3LjM2JTIwKEtIVE1MJTJDJTIwbGlrZSUyMEdlY2tvKSUyMENocm9tZSUyRjEwNS4wLjAuMCUyMFNhZmFyaSUyRjUzNy4zNiUyMEVkZyUyRjEwNS4wLjEzNDMuMzMlMjIlMjB2ZXJzaW9uJTNEJTIyMjAuMy4wJTIyJTIwZXRhZyUzRCUyMjNQVDhVNzdJQmU2Ml94STJNNllYJTIyJTIwdHlwZSUzRCUyMmRldmljZSUyMiUzRSUzQ2RpYWdyYW0lMjBpZCUzRCUyMkVjaGY0UjJwdzhKZjVVYWN1LV96JTIyJTNFalpQZlQ4SXdFTWYlMkZtajFLMkNvSWp6cEJIelFod2NSSFU3WmphJTJCeDZTM2ZBOEslMkIzWlZlMnhaRElFdEolMkI3a2Z2ZTcxR0lxM2FGeXZyOGgxejBGRXl6ZHRJUEVkSmNoOHYzTDhINXc2SVpObUJ3cXE4UTNFUHR1b0hHRTZaSGxRT3pjaVJFRFdwZWd3ek5BWXlHakZwTFo3R2JudlU0MU5yV2NBZnNNMmslMkZrcyUyRlZVNWxSeGZKUTg5ZlFSVmxPRG1lczc1S0JtZFcwcFF5eDlNQWlWVWtVb3RJM2FwcVU5QyUyQmQ2RXZYZHo2aHZWYW1BVkQlMkZ3bEl1b0NqMUFmV3huWFJPWWc5Z2lYbHRMJTJGSkhlZ05Ob29VR21mYUlSRldrWGdLRG85YUZkNUFXRHRhVXFYZEpuWkxKN0wyeWFxMjhPTXcyY2xHWlpPOWxSVjhaV2dOV09kMEdZNTRPWm43QUNQckQ5eWd1b2lZT3JKWFdxZW8wVjVxRXVuYWY1NmpvUUh2Zmo0RFdmeUdZREZvZ0pOc1daZzhFRHJrQ3NvVjlEbllFMnVaS2ZMVE9mT25XeVRKcXU5aU1YT0UyJTJCYVVRM3V6OWZIMVF0MURBS3lBN05tNWNJQ1k4d3p3STRqRCUyRmpRWUtVYmxZSm9Da3p6RXhUVnpmODl1d1ZjZHR2MUlYV3lEZHlsV3Z3JTNEJTNEJTNDJTJGZGlhZ3JhbSUzRSUzQyUyRm14ZmlsZSUzRc76F3gAAALbSURBVHhe7d3LcdtQEETRhyAUhVZgBE5CCtJOQhEQK0WhIKCCy6Yp68cP8Gbm8mLJzWP3UUNcEMWheWEaGDBJDNLEBP0RiCkmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVCUYb/f3w3DcN8z0ziOTz3PizhrmqYfPc+d5/n59232D+hja+2u0xt4HsfxV6ezuh8zTdNDa63XQF7mef652+1eDv8zBV3HPApyefdvPgAJeh1oJOQ7TG+5l2NGQ36IKej5oBkgP8UU9HTQLJBfYgr6PWgmyG8xBf0cNBvkSZiCvgfNCHkypqD/QLNCnoUpaGuZIc/GvGXQ7JAXYd4iaAXIizFvCbQK5FWYtwBaCfJqTDJoNchVMImgFSFXwySBVoVcFZMAWhlydczKoNUhN8GsCEqA3AyzEigFclPMCqAkyM0xM4PSILtgZgQlQnbDzARKheyKmQGUDNkdMxKUDhmCGQUa8ezHkrXnFfZ8ZsCjED16PTzE0+Ow/88Iwwxa6JYdh0KG3WaPG4UsNBwyBSZgoSkg02AWBk0DmQqzIGgqyHSYhUDTQabELACaEjItZmLQtJCpMROCpoZMj5kIND1kCcwEoCUgy2AGgpaBLIUZAFoKshxmR9BykCUxO4CWhCyLuSFoWcjSmBuAloYsj7kiaHlIBOYKoAhIDOYVoBhIFOYFoChIHOYZoDhIJOYJoEhILOYXoFhINOYHoGhIPOYx6N+fi1heo16h32jvVeryRevldz96nRd1zivJX5MRtAF7OgAAAABJRU5ErkJggg==',
      post_id: 1,
      title: 'title1',
      content: 'content1',
      url: 'url1',
      time: 0,
      datatime: '2022/09/16'
    },
  ]

const content_info = {
  user_id: 0,
  name: 'name',
  icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAABzCAYAAACrQz3mAAAAAXNSR0IArs4c6QAAA9Z0RVh0bXhmaWxlACUzQ214ZmlsZSUyMGhvc3QlM0QlMjJhcHAuZGlhZ3JhbXMubmV0JTIyJTIwbW9kaWZpZWQlM0QlMjIyMDIyLTA5LTEzVDA0JTNBMzElM0EzNC43MzBaJTIyJTIwYWdlbnQlM0QlMjI1LjAlMjAoV2luZG93cyUyME5UJTIwMTAuMCUzQiUyMFdpbjY0JTNCJTIweDY0KSUyMEFwcGxlV2ViS2l0JTJGNTM3LjM2JTIwKEtIVE1MJTJDJTIwbGlrZSUyMEdlY2tvKSUyMENocm9tZSUyRjEwNS4wLjAuMCUyMFNhZmFyaSUyRjUzNy4zNiUyMEVkZyUyRjEwNS4wLjEzNDMuMzMlMjIlMjB2ZXJzaW9uJTNEJTIyMjAuMy4wJTIyJTIwZXRhZyUzRCUyMjNQVDhVNzdJQmU2Ml94STJNNllYJTIyJTIwdHlwZSUzRCUyMmRldmljZSUyMiUzRSUzQ2RpYWdyYW0lMjBpZCUzRCUyMkVjaGY0UjJwdzhKZjVVYWN1LV96JTIyJTNFalpQZlQ4SXdFTWYlMkZtajFLMkNvSWp6cEJIelFod2NSSFU3WmphJTJCeDZTM2ZBOEslMkIzWlZlMnhaRElFdEolMkI3a2Z2ZTcxR0lxM2FGeXZyOGgxejBGRXl6ZHRJUEVkSmNoOHYzTDhINXc2SVpObUJ3cXE4UTNFUHR1b0hHRTZaSGxRT3pjaVJFRFdwZWd3ek5BWXlHakZwTFo3R2JudlU0MU5yV2NBZnNNMmslMkZrcyUyRlZVNWxSeGZKUTg5ZlFSVmxPRG1lczc1S0JtZFcwcFF5eDlNQWlWVWtVb3RJM2FwcVU5QyUyQmQ2RXZYZHo2aHZWYW1BVkQlMkZ3bEl1b0NqMUFmV3huWFJPWWc5Z2lYbHRMJTJGSkhlZ05Ob29VR21mYUlSRldrWGdLRG85YUZkNUFXRHRhVXFYZEpuWkxKN0wyeWFxMjhPTXcyY2xHWlpPOWxSVjhaV2dOV09kMEdZNTRPWm43QUNQckQ5eWd1b2lZT3JKWFdxZW8wVjVxRXVuYWY1NmpvUUh2Zmo0RFdmeUdZREZvZ0pOc1daZzhFRHJrQ3NvVjlEbllFMnVaS2ZMVE9mT25XeVRKcXU5aU1YT0UyJTJCYVVRM3V6OWZIMVF0MURBS3lBN05tNWNJQ1k4d3p3STRqRCUyRmpRWUtVYmxZSm9Da3p6RXhUVnpmODl1d1ZjZHR2MUlYV3lEZHlsV3Z3JTNEJTNEJTNDJTJGZGlhZ3JhbSUzRSUzQyUyRm14ZmlsZSUzRc76F3gAAALbSURBVHhe7d3LcdtQEETRhyAUhVZgBE5CCtJOQhEQK0WhIKCCy6Yp68cP8Gbm8mLJzWP3UUNcEMWheWEaGDBJDNLEBP0RiCkmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVCUYb/f3w3DcN8z0ziOTz3PizhrmqYfPc+d5/n59232D+hja+2u0xt4HsfxV6ezuh8zTdNDa63XQF7mef652+1eDv8zBV3HPApyefdvPgAJeh1oJOQ7TG+5l2NGQ36IKej5oBkgP8UU9HTQLJBfYgr6PWgmyG8xBf0cNBvkSZiCvgfNCHkypqD/QLNCnoUpaGuZIc/GvGXQ7JAXYd4iaAXIizFvCbQK5FWYtwBaCfJqTDJoNchVMImgFSFXwySBVoVcFZMAWhlydczKoNUhN8GsCEqA3AyzEigFclPMCqAkyM0xM4PSILtgZgQlQnbDzARKheyKmQGUDNkdMxKUDhmCGQUa8ezHkrXnFfZ8ZsCjED16PTzE0+Ow/88Iwwxa6JYdh0KG3WaPG4UsNBwyBSZgoSkg02AWBk0DmQqzIGgqyHSYhUDTQabELACaEjItZmLQtJCpMROCpoZMj5kIND1kCcwEoCUgy2AGgpaBLIUZAFoKshxmR9BykCUxO4CWhCyLuSFoWcjSmBuAloYsj7kiaHlIBOYKoAhIDOYVoBhIFOYFoChIHOYZoDhIJOYJoEhILOYXoFhINOYHoGhIPOYx6N+fi1heo16h32jvVeryRevldz96nRd1zivJX5MRtAF7OgAAAABJRU5ErkJggg==',
  post_id: 1,
  title: 'title',
  content: 'contentcontent\ncontent',
  url: 'urlurlurlurl',
  time: 2,
  datatime: '2022/09/13',
}

const header_info = {
  user_id: 0,
  icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAABzCAYAAACrQz3mAAAAAXNSR0IArs4c6QAAA9Z0RVh0bXhmaWxlACUzQ214ZmlsZSUyMGhvc3QlM0QlMjJhcHAuZGlhZ3JhbXMubmV0JTIyJTIwbW9kaWZpZWQlM0QlMjIyMDIyLTA5LTEzVDA0JTNBMzElM0EzNC43MzBaJTIyJTIwYWdlbnQlM0QlMjI1LjAlMjAoV2luZG93cyUyME5UJTIwMTAuMCUzQiUyMFdpbjY0JTNCJTIweDY0KSUyMEFwcGxlV2ViS2l0JTJGNTM3LjM2JTIwKEtIVE1MJTJDJTIwbGlrZSUyMEdlY2tvKSUyMENocm9tZSUyRjEwNS4wLjAuMCUyMFNhZmFyaSUyRjUzNy4zNiUyMEVkZyUyRjEwNS4wLjEzNDMuMzMlMjIlMjB2ZXJzaW9uJTNEJTIyMjAuMy4wJTIyJTIwZXRhZyUzRCUyMjNQVDhVNzdJQmU2Ml94STJNNllYJTIyJTIwdHlwZSUzRCUyMmRldmljZSUyMiUzRSUzQ2RpYWdyYW0lMjBpZCUzRCUyMkVjaGY0UjJwdzhKZjVVYWN1LV96JTIyJTNFalpQZlQ4SXdFTWYlMkZtajFLMkNvSWp6cEJIelFod2NSSFU3WmphJTJCeDZTM2ZBOEslMkIzWlZlMnhaRElFdEolMkI3a2Z2ZTcxR0lxM2FGeXZyOGgxejBGRXl6ZHRJUEVkSmNoOHYzTDhINXc2SVpObUJ3cXE4UTNFUHR1b0hHRTZaSGxRT3pjaVJFRFdwZWd3ek5BWXlHakZwTFo3R2JudlU0MU5yV2NBZnNNMmslMkZrcyUyRlZVNWxSeGZKUTg5ZlFSVmxPRG1lczc1S0JtZFcwcFF5eDlNQWlWVWtVb3RJM2FwcVU5QyUyQmQ2RXZYZHo2aHZWYW1BVkQlMkZ3bEl1b0NqMUFmV3huWFJPWWc5Z2lYbHRMJTJGSkhlZ05Ob29VR21mYUlSRldrWGdLRG85YUZkNUFXRHRhVXFYZEpuWkxKN0wyeWFxMjhPTXcyY2xHWlpPOWxSVjhaV2dOV09kMEdZNTRPWm43QUNQckQ5eWd1b2lZT3JKWFdxZW8wVjVxRXVuYWY1NmpvUUh2Zmo0RFdmeUdZREZvZ0pOc1daZzhFRHJrQ3NvVjlEbllFMnVaS2ZMVE9mT25XeVRKcXU5aU1YT0UyJTJCYVVRM3V6OWZIMVF0MURBS3lBN05tNWNJQ1k4d3p3STRqRCUyRmpRWUtVYmxZSm9Da3p6RXhUVnpmODl1d1ZjZHR2MUlYV3lEZHlsV3Z3JTNEJTNEJTNDJTJGZGlhZ3JhbSUzRSUzQyUyRm14ZmlsZSUzRc76F3gAAALbSURBVHhe7d3LcdtQEETRhyAUhVZgBE5CCtJOQhEQK0WhIKCCy6Yp68cP8Gbm8mLJzWP3UUNcEMWheWEaGDBJDNLEBP0RiCkmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVCUYb/f3w3DcN8z0ziOTz3PizhrmqYfPc+d5/n59232D+hja+2u0xt4HsfxV6ezuh8zTdNDa63XQF7mef652+1eDv8zBV3HPApyefdvPgAJeh1oJOQ7TG+5l2NGQ36IKej5oBkgP8UU9HTQLJBfYgr6PWgmyG8xBf0cNBvkSZiCvgfNCHkypqD/QLNCnoUpaGuZIc/GvGXQ7JAXYd4iaAXIizFvCbQK5FWYtwBaCfJqTDJoNchVMImgFSFXwySBVoVcFZMAWhlydczKoNUhN8GsCEqA3AyzEigFclPMCqAkyM0xM4PSILtgZgQlQnbDzARKheyKmQGUDNkdMxKUDhmCGQUa8ezHkrXnFfZ8ZsCjED16PTzE0+Ow/88Iwwxa6JYdh0KG3WaPG4UsNBwyBSZgoSkg02AWBk0DmQqzIGgqyHSYhUDTQabELACaEjItZmLQtJCpMROCpoZMj5kIND1kCcwEoCUgy2AGgpaBLIUZAFoKshxmR9BykCUxO4CWhCyLuSFoWcjSmBuAloYsj7kiaHlIBOYKoAhIDOYVoBhIFOYFoChIHOYZoDhIJOYJoEhILOYXoFhINOYHoGhIPOYx6N+fi1heo16h32jvVeryRevldz96nRd1zivJX5MRtAF7OgAAAABJRU5ErkJggg==',
  setPage: setPage,
  setMode: setMode,
}

const profile_info = {
  user_id: 0,
  header: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAABzCAYAAACrQz3mAAAAAXNSR0IArs4c6QAAA9Z0RVh0bXhmaWxlACUzQ214ZmlsZSUyMGhvc3QlM0QlMjJhcHAuZGlhZ3JhbXMubmV0JTIyJTIwbW9kaWZpZWQlM0QlMjIyMDIyLTA5LTEzVDA0JTNBMzElM0EzNC43MzBaJTIyJTIwYWdlbnQlM0QlMjI1LjAlMjAoV2luZG93cyUyME5UJTIwMTAuMCUzQiUyMFdpbjY0JTNCJTIweDY0KSUyMEFwcGxlV2ViS2l0JTJGNTM3LjM2JTIwKEtIVE1MJTJDJTIwbGlrZSUyMEdlY2tvKSUyMENocm9tZSUyRjEwNS4wLjAuMCUyMFNhZmFyaSUyRjUzNy4zNiUyMEVkZyUyRjEwNS4wLjEzNDMuMzMlMjIlMjB2ZXJzaW9uJTNEJTIyMjAuMy4wJTIyJTIwZXRhZyUzRCUyMjNQVDhVNzdJQmU2Ml94STJNNllYJTIyJTIwdHlwZSUzRCUyMmRldmljZSUyMiUzRSUzQ2RpYWdyYW0lMjBpZCUzRCUyMkVjaGY0UjJwdzhKZjVVYWN1LV96JTIyJTNFalpQZlQ4SXdFTWYlMkZtajFLMkNvSWp6cEJIelFod2NSSFU3WmphJTJCeDZTM2ZBOEslMkIzWlZlMnhaRElFdEolMkI3a2Z2ZTcxR0lxM2FGeXZyOGgxejBGRXl6ZHRJUEVkSmNoOHYzTDhINXc2SVpObUJ3cXE4UTNFUHR1b0hHRTZaSGxRT3pjaVJFRFdwZWd3ek5BWXlHakZwTFo3R2JudlU0MU5yV2NBZnNNMmslMkZrcyUyRlZVNWxSeGZKUTg5ZlFSVmxPRG1lczc1S0JtZFcwcFF5eDlNQWlWVWtVb3RJM2FwcVU5QyUyQmQ2RXZYZHo2aHZWYW1BVkQlMkZ3bEl1b0NqMUFmV3huWFJPWWc5Z2lYbHRMJTJGSkhlZ05Ob29VR21mYUlSRldrWGdLRG85YUZkNUFXRHRhVXFYZEpuWkxKN0wyeWFxMjhPTXcyY2xHWlpPOWxSVjhaV2dOV09kMEdZNTRPWm43QUNQckQ5eWd1b2lZT3JKWFdxZW8wVjVxRXVuYWY1NmpvUUh2Zmo0RFdmeUdZREZvZ0pOc1daZzhFRHJrQ3NvVjlEbllFMnVaS2ZMVE9mT25XeVRKcXU5aU1YT0UyJTJCYVVRM3V6OWZIMVF0MURBS3lBN05tNWNJQ1k4d3p3STRqRCUyRmpRWUtVYmxZSm9Da3p6RXhUVnpmODl1d1ZjZHR2MUlYV3lEZHlsV3Z3JTNEJTNEJTNDJTJGZGlhZ3JhbSUzRSUzQyUyRm14ZmlsZSUzRc76F3gAAALbSURBVHhe7d3LcdtQEETRhyAUhVZgBE5CCtJOQhEQK0WhIKCCy6Yp68cP8Gbm8mLJzWP3UUNcEMWheWEaGDBJDNLEBP0RiCkmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVCUYb/f3w3DcN8z0ziOTz3PizhrmqYfPc+d5/n59232D+hja+2u0xt4HsfxV6ezuh8zTdNDa63XQF7mef652+1eDv8zBV3HPApyefdvPgAJeh1oJOQ7TG+5l2NGQ36IKej5oBkgP8UU9HTQLJBfYgr6PWgmyG8xBf0cNBvkSZiCvgfNCHkypqD/QLNCnoUpaGuZIc/GvGXQ7JAXYd4iaAXIizFvCbQK5FWYtwBaCfJqTDJoNchVMImgFSFXwySBVoVcFZMAWhlydczKoNUhN8GsCEqA3AyzEigFclPMCqAkyM0xM4PSILtgZgQlQnbDzARKheyKmQGUDNkdMxKUDhmCGQUa8ezHkrXnFfZ8ZsCjED16PTzE0+Ow/88Iwwxa6JYdh0KG3WaPG4UsNBwyBSZgoSkg02AWBk0DmQqzIGgqyHSYhUDTQabELACaEjItZmLQtJCpMROCpoZMj5kIND1kCcwEoCUgy2AGgpaBLIUZAFoKshxmR9BykCUxO4CWhCyLuSFoWcjSmBuAloYsj7kiaHlIBOYKoAhIDOYVoBhIFOYFoChIHOYZoDhIJOYJoEhILOYXoFhINOYHoGhIPOYx6N+fi1heo16h32jvVeryRevldz96nRd1zivJX5MRtAF7OgAAAABJRU5ErkJggg==',
  icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAABzCAYAAACrQz3mAAAAAXNSR0IArs4c6QAAA9Z0RVh0bXhmaWxlACUzQ214ZmlsZSUyMGhvc3QlM0QlMjJhcHAuZGlhZ3JhbXMubmV0JTIyJTIwbW9kaWZpZWQlM0QlMjIyMDIyLTA5LTEzVDA0JTNBMzElM0EzNC43MzBaJTIyJTIwYWdlbnQlM0QlMjI1LjAlMjAoV2luZG93cyUyME5UJTIwMTAuMCUzQiUyMFdpbjY0JTNCJTIweDY0KSUyMEFwcGxlV2ViS2l0JTJGNTM3LjM2JTIwKEtIVE1MJTJDJTIwbGlrZSUyMEdlY2tvKSUyMENocm9tZSUyRjEwNS4wLjAuMCUyMFNhZmFyaSUyRjUzNy4zNiUyMEVkZyUyRjEwNS4wLjEzNDMuMzMlMjIlMjB2ZXJzaW9uJTNEJTIyMjAuMy4wJTIyJTIwZXRhZyUzRCUyMjNQVDhVNzdJQmU2Ml94STJNNllYJTIyJTIwdHlwZSUzRCUyMmRldmljZSUyMiUzRSUzQ2RpYWdyYW0lMjBpZCUzRCUyMkVjaGY0UjJwdzhKZjVVYWN1LV96JTIyJTNFalpQZlQ4SXdFTWYlMkZtajFLMkNvSWp6cEJIelFod2NSSFU3WmphJTJCeDZTM2ZBOEslMkIzWlZlMnhaRElFdEolMkI3a2Z2ZTcxR0lxM2FGeXZyOGgxejBGRXl6ZHRJUEVkSmNoOHYzTDhINXc2SVpObUJ3cXE4UTNFUHR1b0hHRTZaSGxRT3pjaVJFRFdwZWd3ek5BWXlHakZwTFo3R2JudlU0MU5yV2NBZnNNMmslMkZrcyUyRlZVNWxSeGZKUTg5ZlFSVmxPRG1lczc1S0JtZFcwcFF5eDlNQWlWVWtVb3RJM2FwcVU5QyUyQmQ2RXZYZHo2aHZWYW1BVkQlMkZ3bEl1b0NqMUFmV3huWFJPWWc5Z2lYbHRMJTJGSkhlZ05Ob29VR21mYUlSRldrWGdLRG85YUZkNUFXRHRhVXFYZEpuWkxKN0wyeWFxMjhPTXcyY2xHWlpPOWxSVjhaV2dOV09kMEdZNTRPWm43QUNQckQ5eWd1b2lZT3JKWFdxZW8wVjVxRXVuYWY1NmpvUUh2Zmo0RFdmeUdZREZvZ0pOc1daZzhFRHJrQ3NvVjlEbllFMnVaS2ZMVE9mT25XeVRKcXU5aU1YT0UyJTJCYVVRM3V6OWZIMVF0MURBS3lBN05tNWNJQ1k4d3p3STRqRCUyRmpRWUtVYmxZSm9Da3p6RXhUVnpmODl1d1ZjZHR2MUlYV3lEZHlsV3Z3JTNEJTNEJTNDJTJGZGlhZ3JhbSUzRSUzQyUyRm14ZmlsZSUzRc76F3gAAALbSURBVHhe7d3LcdtQEETRhyAUhVZgBE5CCtJOQhEQK0WhIKCCy6Yp68cP8Gbm8mLJzWP3UUNcEMWheWEaGDBJDNLEBP0RiCkmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVAUlykmqAFQFJcpJqgBUBSXKSaoAVCUYb/f3w3DcN8z0ziOTz3PizhrmqYfPc+d5/n59232D+hja+2u0xt4HsfxV6ezuh8zTdNDa63XQF7mef652+1eDv8zBV3HPApyefdvPgAJeh1oJOQ7TG+5l2NGQ36IKej5oBkgP8UU9HTQLJBfYgr6PWgmyG8xBf0cNBvkSZiCvgfNCHkypqD/QLNCnoUpaGuZIc/GvGXQ7JAXYd4iaAXIizFvCbQK5FWYtwBaCfJqTDJoNchVMImgFSFXwySBVoVcFZMAWhlydczKoNUhN8GsCEqA3AyzEigFclPMCqAkyM0xM4PSILtgZgQlQnbDzARKheyKmQGUDNkdMxKUDhmCGQUa8ezHkrXnFfZ8ZsCjED16PTzE0+Ow/88Iwwxa6JYdh0KG3WaPG4UsNBwyBSZgoSkg02AWBk0DmQqzIGgqyHSYhUDTQabELACaEjItZmLQtJCpMROCpoZMj5kIND1kCcwEoCUgy2AGgpaBLIUZAFoKshxmR9BykCUxO4CWhCyLuSFoWcjSmBuAloYsj7kiaHlIBOYKoAhIDOYVoBhIFOYFoChIHOYZoDhIJOYJoEhILOYXoFhINOYHoGhIPOYx6N+fi1heo16h32jvVeryRevldz96nRd1zivJX5MRtAF7OgAAAABJRU5ErkJggg==',
  name: 'name',
  comment: 'comment',
  setProfile: setProfile,
}

const footer_info = {
  setKey: setSearch,
  setContent: setContent,
}

return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={
        <div>
          <Header {...header_info} />
          <Grid container className={Style.content}>
            {
              timeline_test.map( post => 
                <Grid key={post.post_id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <Content {...post} />
                </Grid>
              )
            }
          </Grid>
          <Footer {...footer_info} />
        </div>
      } />
      <Route path={'/profile/*'} element={
        <div>
          <Profile my_id={userme_test.user_id} user_id={userID_test.user_id} header={userID_test.header} icon={userID_test.icon} name={userID_test.name} comment={userID_test.comment} follow={userID_test.follows} follower={userID_test.followers} setProfile={setProfile}/>
          <Grid container className={Style.content}>
            {
              userID_test.posts.map( post => 
                <Grid key={post.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <Content user_id={userID_test.user_id} name={userID_test.name} icon={userID_test.icon} post_id={post.id} title={post.title} content={post.content} url={post.url} time={post.time} datatime={post.datatime} />
                </Grid>
              )
            }
          </Grid>
          <Footer {...footer_info} />
        </div>
      } />
    </Routes>
  </BrowserRouter>


);
}

export default App;