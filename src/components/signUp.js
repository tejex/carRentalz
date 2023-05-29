import {useState, useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios'
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
//*****************************************************************************/
export const SignUp = () =>{
    const [formData, setFormData] = useState({
            name: "",
            username: "", 
            password: "",
            admin:null
        })
//*****************************************************************************/
// This function will correctly update the state of our login form as the user
// makes changes to it, so as the user is typing in the inputs, the 
// state of the form will be updated. This so that when the form is submitted it will contain
// most up-to-date information.
    function handleChange(event) {
        const {name, value} = event.target;
        setFormData(prevData =>{
            return({
                ...prevData,
                [name]: value
            })
        })
    }   
//*****************************************************************************/
const {login} = useContext(AuthContext);
    const handleSubmit = async (event) =>{
        event.preventDefault();
        const {name,username,password,admin} = formData;
        const userDetails = {
            name,
            username,
            password,
            admin
        }
        await axios.post('http://localhost:5001/auth/signup',userDetails).then((res)=>{
            if(res.status==200){
                const {user, token} = res.data;
                login(token,user);
            }
            else{
                console.log(res);
            }
        }).catch((err)=> console.log(err));
    }
//*****************************************************************************/
    const googleFunction = () => {
        window.open("http://localhost:5001/auth/google","_self");
    }
//*****************************************************************************/
    return(
    <div className="flex w-full flex-col justify-center items-center" >
         <h1 className='mt-20 text-5xl'>Sign Up</h1>
       <form className='ml-20 w-4/12 grid grid-cols-1 gap-y-10 mt-20'onSubmit={handleSubmit}>
       <TextField
        id="outlined-basic" variant="outlined"   
        onChange={handleChange} 
        name="name" 
        className='form-control border h-10 w-full px-4 mt-4 mr-4' 
        placeholder='Name'
        value ={formData.name}/>

        <TextField
        id="outlined-basic" variant="outlined"   
        onChange={handleChange} 
        name="username" 
        className=' form-control border h-10 w-full px-4 mt-4 mr-4' 
        placeholder='Username'
        value ={formData.username}/>

        <TextField
        id="outlined-basic" variant="outlined"   
        onChange={handleChange} 
        name="password" 
        className='form-control border h-10 w-full px-4 mt-4 mr-4 ' 
        placeholder='Password'
        value ={formData.password}/>

        <TextField
        id="outlined-basic" variant="outlined"   
        onChange={handleChange} 
        name="admin" 
        className='form-control border h-5 w-6/12 px-4 mt-4 mr-4' 
        placeholder='MCode (Manager Only)'
        value ={formData.admin}/>

        <Button 
        variant="contained" 
        className='border h-10 w-full px-4 mt-4 mr-4' 
        type='submit'>Sign Up </Button>
       </form>
       <button 
       className="bg-white border border-gray-300 
        rounded-md text-gray-700 h-4/6 font-medium hover:bg-gray-50 
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-blue-500 
        h-10 w-4/12 px-4 mt-4 ml-20"
        onClick={googleFunction}
        role="button"
        type="button"
        >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" className="float-left h-6 w-6 mr-2 mt-2 mb-2"/>
            <span className="inline-block mt-1">Sign-up with Google</span>
        </button>
    </div>
    )
}

export default SignUp;