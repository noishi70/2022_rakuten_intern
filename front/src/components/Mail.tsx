import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';

export default function Mail() {
    let path = useLocation().search.replace("?token=", "")
    console.log(path);

    useEffect(() => {
        let url = process.env.REACT_APP_API + '/api/auth/auth_mail?token=' + path;
        axios.post(url).then((res) => {
            console.log(res.data);
        })
      }, []);

    return (
        <>
        </>
    );
}