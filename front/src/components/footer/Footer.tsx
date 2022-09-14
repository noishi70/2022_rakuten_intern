import React from 'react'
import Home from '../../footerImg/home.svg'
import Search from '../../footerImg/search.svg'
import Post from '../../footerImg/post.svg'
import './Footer.css'

type props = {
    setMode?: (mode: string) => void;

}

const Footer = (props:props) => {
    return (
        <div className="footer">
            <button onClick={() => props.setMode?.('Home')} className="iconbutton"><img src={Home} alt="home"  className="icon"/></button>
            <button onClick={() => props.setMode?.('Search')} className="iconbutton"><img src={Search} alt="search"  className="icon"/></button>
            <button onClick={() => props.setMode?.('Post')} className="iconbutton"><img src={Post} alt="post"  className="icon"/></button>
        {/* <img src={Home} alt="home"  className="icon"/>
        <img src={Search} alt="serch" className="icon"/>
        <img src={Post} alt="post" className="icon"/> */}
        </div>
        )
}

export default Footer