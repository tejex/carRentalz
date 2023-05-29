import { useFrame,extend,useThree } from '@react-three/fiber'; //we will rotate the shape with each frame that passes using this frame hook
import { useRef,useState } from "react"; // this we wil use for the rotation to refrence the location of the shape
import { useLoader } from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Html } from '@react-three/drei';



const About = () =>{
    const [rotationPausedCarA, setRotationPausedCarA] = useState(true);
    const [rotationPausedCarB, setRotationPausedCarB] = useState(true);
    const carRefA = useRef();
    const carRefB = useRef();

    useFrame((state, delta)=>{ // delta is the amount of time that passes between each frame. 

        if (!rotationPausedCarA) {
            carRefA.current.rotation.y += delta;
        }
        if (!rotationPausedCarB) {
            carRefB.current.rotation.y += delta;
        }
    })
    const model = useLoader(GLTFLoader, './porscheC.glb');
    const modelB = useLoader(GLTFLoader, './audi.glb');

    const handleStartRotation = (chosenCar) => {
        if (chosenCar === "carA") {
            setRotationPausedCarA(false);
          } else {
            setRotationPausedCarB(false);
          }
    };

    const handlePauseRotation = (chosenCar) => {
        if (chosenCar === "carA") {
            setRotationPausedCarA(true);
          } else {
            setRotationPausedCarB(true);
          }
        
    };

  
    return(
    <>
    <directionalLight position={[0, 1, 1]} intensity={6}/>
    <spotLight position={[1, 0.3, 4]} angle={0.3*Math.PI} intensity={6}/>

    <group position-x={-1.35}>
    <Html position={[1, 1.6, 0]} rotation={[0, 0, 0]}>
        <h1 className="text-white w-64 text-5xl"> About Us </h1>
    </Html>
        <primitive
            position-y={-0.8}
            rotation-y={-0.3}
            ref={carRefA}
            object={model.scene}
            scale={0.5}
        />
           <Html position={[-0.5, 1.35, 0]} rotation={[0, 0, 0]}>
           <p className="text-white w-64">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                 when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </Html>
        <Html position={[-0.6, 0.5, 0]}>
            <div className="absolute top-2 left-2 z-10">
          {rotationPausedCarA ? (
            <button onClick={()=>handleStartRotation("carA")} className="bg-green-500 border px-4 py-2 text-white rounded">
              Showroom Mode
            </button>
          ) : (
            <button onClick={()=>handlePauseRotation("carA")} className="bg-red-500 border px-4 py-2 text-white rounded">
              Pause Rotation
            </button>
          )}
        
            </div>
        </Html>
    </group>

    <group position-x={1.35}>
        <primitive
            position-y={0.5}
            rotation-y={-0.3}
            ref={carRefB}
            object={modelB.scene}
            scale={0.4}
        />
            <Html position={[-0.44, -0.5, 0]} rotation={[0, 0, 0]}>
                <p className="text-white w-64">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                 when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </Html>
        <Html position={[-0.5, 0.1, 0]}>    
            <div className="absolute top-2 left-2 z-10">
          {rotationPausedCarB ? (
            <button onClick={()=>handleStartRotation("carB")} className="bg-green-500 border px-4 py-2 text-white rounded">
              Showroom Mode
            </button>
          ) : (
            <button onClick={()=>handlePauseRotation("carB")} className="bg-red-500  border px-4 py-2 text-white rounded">
              Pause Rotation
            </button>
          )}
            </div>
        </Html>
    </group>
    
    </>
    )
}
export default About;