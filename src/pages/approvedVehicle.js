import * as React from "react"
import { useEffect } from "react";
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three'
import { ApprovedCar } from "../components/approvedCar";
import { NavBar } from "../components";
import { useLocation } from 'react-router-dom';



export const ApprovedVehicle = () =>{

    const location = useLocation(); 
    const locationName = location.pathname;
    const carName = locationName.slice(locationName.indexOf('/', locationName.indexOf('/') + 1) + 1);

    const created = ({ scene }) =>{
    scene.background = new THREE.Color('white')
}
   
    return(
    <>
    <NavBar/>
        <div className="w-full h-full mt-20">
            <div className="mt-20 h-1/2">
        <h1>{carName}</h1>
        <Canvas
            camera={ {
            fov: 35,
            near: 0.1,
            far: 200, 
            position: [-1, 1.5, 5]               
            } }
            onCreated={created}
        >
            <ApprovedCar/>
        </Canvas>
            </div>
        </div>
    </>
    )}

export default ApprovedVehicle;