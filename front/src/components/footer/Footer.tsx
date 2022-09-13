import React from 'react'
import Home from '../../footerImg/home.svg'
import Search from '../../footerImg/search.svg'
import Post from '../../footerImg/post.svg'
import './Footer.css'

const Footer = () => {
    return (
        <div className="footer">
        <img src={Home} alt="home"  className="icon"/>
        <img src={Search} alt="serch" className="icon"/>
        <img src={Post} alt="post" className="icon"/>
        </div>
        )
}

export default Footer