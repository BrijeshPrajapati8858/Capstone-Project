import React from 'react';

import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginSignup from '../pages/LoginSignup/LoginSignup';
import SignUp from '../pages/Join/SignUp';
import LoggedIn from '../pages/LoggedIn/LoggedIn';

function AuthNavigator() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <>
      <Route path='/signup' exact element={isAuthenticated ? <LoggedIn /> : <SignUp />} />
      <Route
        exact
        path='/login'
        element={ <LoginSignup />}
      />
    </>
  );
}

export default AuthNavigator;
