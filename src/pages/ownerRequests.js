import {useState, useContext, useEffect } from 'react';
import {Cars, NavBar} from '../components';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {useNavigate} from "react-router-dom";
import TextField from '@mui/material/TextField';
import { Canvas } from "@react-three/fiber";
import ChosenCar from "../components/chosenCar";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const OwnerRequests = () =>{
    const navigate = useNavigate();
    const [ownerRequests, setRequests] = useState([]);
    const token = window.localStorage.getItem('token'); // here we grab the current owners ID from localstorage
    const decodedToken = jwtDecode(token); //the token has the owners info

    const userReq = { // create a userReq object that has the current state of the users request
        approved:false, // we will send it to the back-end afet the owner either approves or denies the request
        token:decodedToken, // we only send it to the back end after the approved state is updated
        userId:null,
        vehicle:{
            name:""
        }
    }
///*************************************************************************************************/
    useEffect(()=>{
        axios.post('http://localhost:5001/main/ownerReq',decodedToken).then((res)=>{
            const {requests} = res.data;
            setRequests(requests);
        }).catch((err)=> console.log(err));
    },[])
///*************************************************************************************************/
    const handleApprove = async (event, userId,vehicle) =>{
        event.preventDefault();
        userReq.approved = true;
        userReq.userId = userId;
        userReq.vehicle.name = vehicle;
        await axios.post('http://localhost:5001/main/ownerReq/approve',userReq).then((res)=>{
            if(res.status == 200){
                //we need to call the setRequests function
                //to the upated requests array we get from the back-end.
            }
            else{

            }
            
        }).catch((err)=> console.log(err));
    }
    
///*************************************************************************************************/
    const handleDeny = async (event, userId,vehicle) =>{
        event.preventDefault();
        userReq.approved = false;
        userReq.userId = userId;
        userReq.vehicle.name = vehicle;
        await axios.post('http://localhost:5001/main/ownerReq/deny',userReq).then((res)=>{
            if(res.status == 200){
               //we need to call the setRequests function
                //to the upated requests array we get from the back-end.
            }
            else{
                
            }
        }).catch((err)=> console.log(err));
    }
///*************************************************************************************************/    
    return(
        <>
        <NavBar/>
        {ownerRequests.length == 0 ?
        <h1>No requests at this time</h1>
        :
        <div className="ml-20 mt-20 flex space-x-10 mr-20 text-black">
            {ownerRequests.map((request) => {
            return (
        <Card className="border mr-10 w-3/12" key={request.userId}>
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                Name: {request.name}
            </Typography>
            <Typography gutterBottom variant="p" component="div">
                Age: {request.age}
            </Typography>
            <Typography gutterBottom variant="p" component="div">
                Phone Number: {request.phoneNum}
            </Typography>
            <Typography gutterBottom variant="p" component="div">
                Driver's License: {request.driverLicense}
            </Typography>
            <Typography gutterBottom variant="p" component="div">
                Email: {request.userEmail}
            </Typography>
            <Typography gutterBottom variant="p" component="div">
                Vehicle: {request.vehicle}
            </Typography>
            <div class="flex">
                <form onSubmit={(e) => handleApprove(e,request.userId,request.vehicle)}>
                    <Button variant='contained' class="border text-black font-bold py-2 px-4 mr-5  rounded">Approve</Button>
                </form>
                <form onSubmit={(e) => handleDeny(e,request.userId,request.vehicle)}>
                    <Button variant='contained' class="border text-black font-bold py-2 px-4 mr-5 rounded">Deny</Button>
                </form>
            </div>
            </CardContent>    
        </Card>
            );
            })}
        </div>
        }  
        </>
    )
}

export default OwnerRequests;