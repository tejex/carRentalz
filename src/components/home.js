import { Link} from "react-router-dom";
import * as React from "react"
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three'
import Test from "./homeCar";

const Home = () =>{

    const created = ({ scene }) =>{
    scene.background = new THREE.Color('black')
}
    return(
<div>
    <div className="h-screen w-screen text-white overflow-y-hidden bg-black">
        <h1 className="text-4xl font-bold pt-20 pl-20 font-mono">"Live your life a quarter mile at a time..." </h1>
        <div className="flex text-2xl lg:text-3xl h-full mt-20 ml-40 ">
            <div className="mr-20 flex flex-col">
                <h4>An empty gas tank is full of memories</h4>
                <Link className="border text-white text-center pt-5 mt-10  w-4/12 lg:w-7/12 h-20 rounded-3xl" to="/auth/signUp"> Sign Up </Link>
                <Link className="border text-white text-center pt-5 mt-10 w-4/12 lg:w-7/12 h-20 rounded-3xl" to="/auth/login" > Login </Link>
            </div>
        <div className="w-full h-3/4 mr-5">
        <Canvas
            camera={ {
            fov: 35,
            near: 0.1,
            far: 200, 
            position: [-1, 1.5, 5]               
            } }
            onCreated={ created }
        >
            <Test/>
        </Canvas>
        </div>  
            {/* <img src={require('../images/bmw.png')} className="md:w-6/12"/> */}
        </div>
    </div>
</div>
    )
}

export default Home;
