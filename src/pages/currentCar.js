import NavBar from "../components/navBar"
import {Link} from "react-router-dom"
import { useState,useEffect } from "react";
import { useLocation, useParams } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import jwtDecode from 'jwt-decode';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Canvas } from "@react-three/fiber";
import ChosenCar from "../components/chosenCar";

const CurrentCar = () =>{
    const token = window.localStorage.getItem('token');
    const decodedToken = jwtDecode(token); //the token has the owners info
    const location = useLocation(); 
    const [formData, setFormData] = useState({
        name:"",
        phoneNum:"",
        age:"",
        driverLicense:""
    });
  
    const [chosenCar,setCar]= useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();

    function handleChange(event) { 
        const {name, value} = event.target;
        setFormData(prevData =>{ 
            return({  
                ...prevData,
                [name]: value
            })
        })
        const email = localStorage.getItem('user');
        setEmail(email);
    }
    const temporaryData =  {
        "Porsche Carrera S": {
          "_id": "1",
          "make": "Porsche",
          "model": "911",
          "name": "Carrera S"
        },
        "Mercedes GT 63 S": {
          "_id": "2",
          "make": "Mercedes",
          "model": "AMG GT",
          "name": "GT 63 S"
        },
        "Porsche Panamera Turbo S E-Hybrid": {
          "_id": "3",
          "make": "Porsche",
          "model": "Panamera",
          "name": "Turbo S E-Hybrid"
        },
        "Mercedes S 560": {
          "_id": "4",
          "make": "Mercedes",
          "model": "S-Class",
          "name": "S 560"
        },
        "Bus Tourismo": {
          "_id": "5",
          "make": "Bus",
          "model": "Coach",
          "name": "Tourismo"
        }
    }

      useEffect(()=>{
          const id = location.pathname.slice(-1);
          for(const value of Object.values(temporaryData)){
           if(value._id==id){
              setCar(value.make);  
            }
        }
        },[])
    //we will have this here for now, but this is our temporary data,
    const handleSubmit = async (event) =>{
      event.preventDefault();
      const {name, age,phoneNum,driverLicense}= formData

      const rentData = {
        name:name,
        age:age,
        phoneNum:phoneNum,
        driverLicense:driverLicense,
        userEmail:email,
        vehicle:chosenCar,
        userID:decodedToken.id
      }

      await axios.post("http://localhost:5001/main/rent",rentData).then((res)=>{
        if(res.status == 200){
            navigate("/main");
        }
        else{
            navigate("/main");
        }
      }).catch((err)=>{
        console.log(err);
      })

    }
    return(
      <div className="">
        <NavBar/>
        <div className="flex">
        <form className="ml-20 mt-20 w-4/12 grid grid-cols-1 gap-y-10" onSubmit={handleSubmit}>
        <h1 className="text-3xl">{chosenCar}</h1>
            <TextField
            className="border"
            type="text"
            id="name"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            />
            <TextField
            className="border"
            type="text"
            id="age"
            placeholder="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            />
            <TextField
            className="border"
            type="text"
            id="driver-license-id"
            name="driverLicense"
            placeholder="Driver License ID"
            value={formData.driverLicense}
            onChange={handleChange}
            />
            <TextField
            className="border"
            type="text"
            id="Phone"
            name="phoneNum"
            placeholder="Phone Number"
            value={formData.phoneNum}
            onChange={handleChange}
            />
        <Button variant="contained" className="border contained" type="submit">Submit to Rent</Button>
       </form>
       <div className="mt-20 ml-20 w-full">
    <Canvas
        camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-3, 1.5, 5],
      }}>
        <ChosenCar />
    </Canvas>
    </div>
       </div>
    </div>
    )
}

export default CurrentCar;