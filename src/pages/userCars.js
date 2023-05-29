import NavBar from "../components/navBar";
import axios from 'axios';
import {useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import {Link} from "react-router-dom";
import { set } from "mongoose";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const UserCars = () =>{

  const [userCars,setCars] = useState([]);

  

  useEffect(()=>{
    const token = window.localStorage.getItem('token'); // here we grab the current owners ID from localstorage
    const decodedToken = jwtDecode(token);
    axios.post("http://localhost:5001/main/userCars",decodedToken).then((res)=>{
        if(res.status==200){
            setCars(res.data.requests)
        }
        else{

        }
    })
  },[])

    return(
        <div>
          <NavBar/>
          {userCars.length == 0 ?
        <h1>No Cars at this time</h1>
        :
        <div className="ml-20 mt-20 flex space-x-10 mr-20">
            {userCars.map((request) => {
            return (

        <Card className="border mr-10 w-3/12" key={request.userId}>
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                Status: {request.status == true ? "Approved" : "Denied" }
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
                Vehicle Name: {request.vehicle.name ? request.vehicle.name : "Unable to render" }
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
                {request.status == true ?  <Link className="border" to={`/myCar/${request.vehicle.name}`}>View Vehicle</Link> : "" }
            </Typography>
            </CardContent> 
        </Card>
            );
            })}
        </div>
        } 
        </div>
    )
}

export default UserCars;