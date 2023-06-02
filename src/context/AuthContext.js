import {useEffect, createContext, useState } from 'react';
import {useNavigate} from "react-router-dom";
//*************************************************************************//
export const AuthContext = createContext({
  authenticated: false,
  login: () => {},
  logout: () => {},
});
//*************************************************************************//
export const AuthContextProvider = ({children}) =>{

    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
  
      if (token) {
          login(token);
          setAuthenticated(true);     
      }
      else{
        logout();
        setAuthenticated(false); 
      } 
    }, []); 
//*************************************************************************//
    const login = (token, user) => {
        window.localStorage.setItem('token',token.token);
        window.localStorage.setItem('user',user);
        window.localStorage.setItem('expiresIn',token.expiresAt);
        setAuthenticated(true);
        navigate("/main");
      };
   //*************************************************************************//
    const logout = () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('expiresIn');
        setAuthenticated(false);
        navigate("/");
      };
//*************************************************************************//
      return (
        <AuthContext.Provider value={{ authenticated, login, logout }}>
          {children}
        </AuthContext.Provider>
      );   
}

export default AuthContextProvider;
