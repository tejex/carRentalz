import {useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios'
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
//*****************************************************************************/

const Login = () =>{
    const [formData, setFormData] = useState({
            username: "", 
            password: "",
            admin:null
        });
//*****************************************************************************/
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
    const handleSubmit = async (event)=>{
        event.preventDefault();
        const {username, password,admin} = formData;
        const userDetails = {
            username,
            password,
            admin
        }
        await axios.post('http://localhost:5001/auth/login',userDetails).then((res)=>{
            console.log(res.data);
        if(res.status==200){
            const {user, token} = res.data;
            login(token,user.type);
        }
        else{

            console.log("Error Bro" + res);
        }  
        }).catch((err)=> console.log("Error Bro" + err));
    } 
const googleFunction = () =>{
    
    window.open("http://localhost:5001/auth/google","_self");
    
}
//*****************************************************************************/
    return(
    <div className="flex flex-col w-full justify-center items-center" >
        {/* <div className="flex justify-center w-1/6">
            <img src={require('../images/dodge.png')}/>
        </div> */}
        <h1 className='mt-20 ml-20 font-mono subpixel-antialiased text-5xl'>Login</h1>
       <form className='ml-20 mt-20 w-4/12 grid grid-cols-1 gap-y-10' onSubmit={handleSubmit}>
        <TextField
        id="outlined-basic" variant="outlined"  
        onChange={handleChange} 
        name="username" 
        className='form-control border h-10 w-full px-4 mt-4 mr-4' 
        placeholder='Username'
        value ={formData.username}/>

        <TextField
        id="outlined-basic" variant="outlined"  
        onChange={handleChange} 
        name="password" 
        className='form-control border h-10 w-full px-4 mt-4 mr-4' 
        placeholder='Password'
        value ={formData.password}/>


        <TextField
        id="outlined-basic" variant="outlined" 
        onChange={handleChange} 
        name="admin" 
        className='form-control border h-5 w-6/12 px-4 mt-4 mr-4' 
        placeholder='MCode (Manager Only)'
        value ={formData.admin==null ? '' : formData.admin}/>
        
        <Button 
        variant="contained" 
        className='h-10 w-full px-4 mt-4 mr-4 border' 
        type='submit'> Login </Button>
       </form>
   
       <button 
            className="bg-white border 
            border-gray-300 rounded-md text-gray-700 
            font-medium hover:bg-gray-50 focus:outline-none 
            focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
            h-10 w-4/12 px-4 mt-4 ml-20"
            onClick={googleFunction}
            role="button"
            type="button"
        >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" className="float-left h-6 w-6 mr-2"/>
            <span className="inline-block">Sign-in with Google</span> 
        </button>
    </div>
    
    )
}
//*****************************************************************************/
export default Login;