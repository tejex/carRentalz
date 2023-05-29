import {useContext, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const PrivateRoute = ({ element: Element, ...rest }) => {
  
  const {authenticated} = useContext(AuthContext);
  
  return (
    authenticated ? <Outlet/> : <Navigate to="auth/login" /> 
  )
  };


export default PrivateRoute