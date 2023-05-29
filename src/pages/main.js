import {Link} from "react-router-dom"
import {useState, useEffect,useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
import {Cars, NavBar} from '../components';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';



const MainPage = () =>{
    const {logout} = useContext(AuthContext);
    function handleSubmit(event){
        event.preventDefault();
        axios.get('http://localhost:5001/auth/logout').then((res)=>{
            if(res.status==200){
                logout();
            }
            else{
                console.log(res);
            }
            
        }).catch((err)=> console.log(err));
    }
    const temporaryData = {
      "Porsche Carrera S": {
        "_id": "1",
        "make": "Porsche",
        "model": "911",
        "name": "Carrera S",
        "image": "https://example.com/images/porsche_911_carrera_s.jpg"
      },
      "Mercedes GT 63 S": {
        "_id": "2",
        "make": "Mercedes",
        "model": "AMG GT",
        "name": "GT 63 S",
        "image": "https://example.com/images/mercedes_amg_gt_63_s.jpg"
      },
      "Porsche Panamera Turbo S E-Hybrid": {
        "_id": "3",
        "make": "Porsche",
        "model": "Panamera",
        "name": "Turbo S E-Hybrid",
        "image": "https://example.com/images/porsche_panamera_turbo_s_e_hybrid.jpg"
      },
      "Mercedes S 560": {
        "_id": "4",
        "make": "Mercedes",
        "model": "S-Class",
        "name": "S 560",
        "image": "https://example.com/images/mercedes_s560.jpg"
      },
      "Audi Spyder": {
        "_id": "5",
        "make": "Audi",
        "model": "Spyder",
        "name": "Audi Spyder",
        "image": "https://example.com/images/audi_spyder.jpg"
      },
      "BMW M3": {
        "_id": "6",
        "make": "BMW",
        "model": "M3",
        "name": "M3",
        "image": "https://example.com/images/bmw_m3.jpg"
      },
      "Lamborghini Aventador": {
        "_id": "7",
        "make": "Lamborghini",
        "model": "Aventador",
        "name": "Aventador",
        "image": "https://example.com/images/lamborghini_aventador.jpg"
      },
      "Ferrari 458 Italia": {
        "_id": "8",
        "make": "Ferrari",
        "model": "458 Italia",
        "name": "458 Italia",
        "image": "https://example.com/images/ferrari_458_italia.jpg"
      },
      "Tesla Model S": {
        "_id": "9",
        "make": "Tesla",
        "model": "Model S",
        "name": "Model S",
        "image": "https://example.com/images/tesla_model_s.jpg"
      },
      "Ford Mustang": {
        "_id": "10",
        "make": "Ford",
        "model": "Mustang",
        "name": "Mustang",
        "image": "https://example.com/images/ford_mustang.jpg"
      }
    }
    const logoutUser =(
        <div className="flex justify-end">
            <form className="w-1/3 p-4 bg-gray-100 rounded-md mr-20 mt-10" onSubmit={handleSubmit}>
                <Button type="submit" variant="outlined" className="ml-auto font-bold py-2 px-4 rounded border">
                    Logout
                </Button>
            </form>
        </div>
    )
    return (
        <div>
           <NavBar/>
            {logoutUser}
          <div className="">
          <div className="flex gap-5">
          {Object.keys(temporaryData).map((cars) => {
              return (
          <div className="">
            <Card className="border mr-10" key={temporaryData[cars].name}>
            <input id="ID" type="hidden"name="id" value={temporaryData[cars]._id}/>
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {temporaryData[cars].name}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {temporaryData[cars].model}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              <Link to={`/main/${temporaryData[cars]._id}`}>See More</Link>
            </Typography>
            </CardContent> 
            </Card>
          </div>
          )})}
          
            </div>
          </div>
        
        </div>  
    )
}

export default MainPage;