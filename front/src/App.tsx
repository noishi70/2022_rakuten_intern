import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Profile from './components/Profile/Profile';

function App() {
  const [value, setValue] = useState('/');
  const info = {
    user_id: 0,
    name: 'name',
    icon: 'dfsafdsafdsafdsfsdafsdafdsafsafda',
    header: 'fdafdsafsafsadfdsafdsafdsafsfaf',
    setValue: setValue,
  }
  return (
    <>
      <Profile {...info} />
      <div>{value}</div>
    </>
  )
}

export default App;
