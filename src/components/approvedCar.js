import { useFrame,extend,useThree } from '@react-three/fiber'; //we will rotate the shape with each frame that passes using this frame hook
import { useRef,useState} from "react"; // this we wil use for the rotation to refrence the location of the shape
import { useLoader } from '@react-three/fiber';
import {OrbitControls,Html} from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
extend({OrbitControls: OrbitControls})


export const ApprovedCar =() =>{

    const [rotationPaused, setRotationPaused] = useState(false);
    const carRef = useRef();

    useFrame((state, delta)=>{ // delta is the amount of time that passes between each frame. 
        if(!rotationPaused){
            carRef.current.rotation.y += delta - (delta/2);
        }
    })
    //Bug: Won't let any other car get rendered except for porscheB within the auth components
    const model = useLoader(GLTFLoader, './porscheB.glb');

    const handleStartRotation = () => {
        setRotationPaused(false)
    };

    const handlePauseRotation = () => {
        setRotationPaused(true);
    };

    return (
        <>
        {/* <OrbitControls args={[camera,gl.domElement]}/> */}
        <directionalLight position={[0, 1, 1]} intensity={10}/>
        <spotLight position={[1, 0.3, 4]} angle={0.3*Math.PI} intensity={3}/>
        {/* <pointLight position={[1,1,1]} intensity={4} /> */}
        <primitive 
        position-y={-0.3}
        position-x ={-0.05} 
        rotation-y={-0.3} 
        ref={carRef} 
        object={model.scene} 
        scale={0.35}/>

        <Html position={[-0.6, -1.5, 0]}>
            <div className="absolute top-2 left-2 z-10">
          {rotationPaused ? (
            <button onClick={()=>handleStartRotation()} className="bg-green-500 border px-4 py-2 text-black rounded">
              Showroom Mode
            </button>
          ) : (
            <button onClick={()=>handlePauseRotation()} className="bg-red-500 border px-4 py-2 text-black rounded">
              Pause Rotation
            </button>
          )}
            </div>
        </Html>
        </>
    )
}
export default ApprovedCar;