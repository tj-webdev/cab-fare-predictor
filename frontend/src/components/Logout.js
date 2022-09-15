import React from 'react';
import axios from 'axios';
import userAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function Logout() {

  const setAuth = userAuthStore((state)=>state.setAuth);
  const navigate = useNavigate();

  async function logout()
  {
    await axios.get('/auth/logout',{withCredentials: true});
    setAuth({name: undefined, loggedIn: false});
    navigate('/',{replace: true});
  }

  return (
    <button onClick={logout} className="btn fw-bold">Log out</button>
  )
}
