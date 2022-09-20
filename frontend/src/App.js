import { Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/Header";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Dashboard from "./Dashboard";
import NotFound from './NotFound';

import userAuthStore from './store/authStore';
import { useEffect } from 'react';

function App() {

  const {userAuth, fetch} = userAuthStore((state)=> ({userAuth: state.userAuth, fetch: state.fetch}));
  useEffect(()=>{
    fetch();
    // eslint-disable-next-line
  },[]);

  return (
    <>
      <Header />
      <Routes>

        <Route exact path='/' element={ !userAuth.loggedIn ?  <Home /> : <Navigate to='/dashboard' replace /> } />
        <Route path='/login' element={ !userAuth.loggedIn ? <Login /> : <Navigate to='/dashboard' replace /> } />
        <Route path='/signup' element={ !userAuth.loggedIn ? <Signup /> : <Navigate to='/dashboard' replace /> } />

        {
          (userAuth.loggedIn===true) && <>
            <Route path='/dashboard' element={<Dashboard />} />
          </>
        }
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
