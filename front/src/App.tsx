import { useState} from 'react';
import axios from 'axios';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import Mail from './components/Mail';


const App: any = () => {

  const [login, setLogin] = useState<LoginInfo>({username: "",password:""})


  var token = sessionStorage.getItem('access_token');

  type LoginInfo = {
    username: string;
    password: string;
  }

  const changeLogin = (arg: LoginInfo): void => {
    setLogin(arg);
    const params = new URLSearchParams();
    params.append('username', login.username);
    params.append('password', login.password);
    let config = {
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    let url = process.env.REACT_APP_API + '/token';
                axios.post(url, params, config).then(res =>{
                  sessionStorage.setItem('access_token', res.data.access_token);
                  token = sessionStorage.getItem('access_token');
                  //console.log(res.data.access_token);
                  
                  <Navigate replace to='/home' />
                });
  }

return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={
        token ?
          <div>
          <Navigate replace to='/home' />
          </div>
          :
          <div>
            <Login setLogin={changeLogin} />
          </div>
      } />
      <Route path='/home' element={
        token ?
          <div>
            <MainPage/>
          </div>
          : <Navigate replace to='/' />
      } />
      <Route path={'/profile/:id'} element={
        token ?
          <div>
            <ProfilePage />
          </div>
        : <Navigate replace to='/' />
      } />
      <Route path='/signup' element={
        <div>
          <Signup />
        </div>
      } />
      <Route path='/mail' element={
        <div>
          <Mail />
        </div>
      } />
    </Routes>
  </BrowserRouter>


);
}

export default App;