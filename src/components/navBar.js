import {Link} from "react-router-dom"
import { useContext, useReducer } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
    const {authenticated} = useContext(AuthContext);
    const currentUser = window.localStorage.getItem('user');

    
    
   return(
    <div className="w-12/12 h-20 bg-black text-white">
        <div className= "flex text-2xl justify-end space-x-10 mr-20 pt-5">
            {authenticated ? currentUser == "Owner" ? 
            <>
            <Link to="/main">Main</Link> 
            <Link to="/ownerRequests">Requests</Link> 
            <Link to="/userCars">My Cars</Link>
            </> 
            : 
            <>
            <Link to="/main">Main</Link> 
            <Link to="/userCars">My Cars</Link>
            </> 
            :
            <>
            <Link to="/about">About</Link>
            <Link to="/">#CarSquad</Link>
            </> }
        </div>
    </div>
) 
}

export default NavBar;