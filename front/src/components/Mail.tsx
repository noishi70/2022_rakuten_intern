import axios from 'axios';
import { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';

export default function Mail() {
    const [done, setDone] = useState<string>("");
    let path = useLocation().search.replace("?token=", "")
    console.log(path);

    useEffect(() => {
        let url = process.env.REACT_APP_API + '/api/auth/auth_mail?token=' + path;
        axios.post(url).then((res) => {
            console.log(res.data[0]);
            setDone(res.data)
        })
      }, []);

    return (
        <>
        {done}
        </>
    );
}