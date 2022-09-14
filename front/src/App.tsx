import React, { useState } from 'react';
import './App.css';
import Search from './components/Search';
import Post from './components/Post';

function App() {
  const [value, setValue] = useState<Key>({word: "",time: null})
  const [content, setContent] = useState<Content>({title: "", url: "", time: 0, text: ""})

  type Key = {
    word: string;
    time: number | null;
  }
  type Content = {
    title: string;
    url: string ;
    time: number;
    text: string;
  }

  return (
    <div className="App">
      <Search setValue = {setValue}/>
      <p>{value.word}</p>
      <p>{value.time}</p>
      <Post setContent = {setContent}/>
      <p>{content.title}</p>
      <p>{content.text}</p>
      <p>{content.url}</p>
      <p>{content.time}</p>
    </div>
  );
}

export default App;
