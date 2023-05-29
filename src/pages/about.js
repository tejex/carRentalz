import {About, NavBar} from '../components';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three'

const AboutPage = () =>{

    const created = ({ scene }) =>{
        scene.background = new THREE.Color('black')
    }

    return(
        <>
        <NavBar/>
        <div className='h-screen w-screen mb-60 bg-black' style={{ overflow: 'auto' }}>
        <Canvas
            camera={ {
            fov: 35,
            near: 0.1,
            far: 200, 
            position: [-1, 1.5, 5]               
            } }
            onCreated={ created }
        >
            <About/>
        </Canvas>
        </div>
        
        </>
    )
}

export default AboutPage;