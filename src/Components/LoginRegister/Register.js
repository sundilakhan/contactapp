import React, { useState } from 'react'
import './LogInRegister.css'
import axios from 'axios';
const Register = () => {
  const [id,setId]=useState("");
  const [username,setUsername]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");


async function handleSubmit(event){
  event.preventDefault();

try{
  await axios.post("http://localhost:8080/save",
    {
      id:id,
      username:username,
      email:email,
      password:password
    });

alert("User Registered sucessfully");
setId("");
setUsername("");
setemail("");
setpassword("");
}
catch(err){
alert("User Registeration failed");
}
}



    return (
        <div className="container whole">
    <div className='wrapper'>
    <div className='form-box register'>
      <form action="/LogIn">
        <h1>Register</h1>
        <div className='input-box'>
          <i className="bi bi-person icon2"></i>
          <input type="text" placeholder="User Name" onChange={(event)=>{setUsername(event.target.value);}} required />
        </div>
        <div className='input-box'>
          <i className="bi bi-envelope icon2"></i>
          <input type="email" placeholder="Email" onChange={(event)=>{setemail(event.target.value);}} required />
        </div>
        <div className='input-box'>
          <i className="bi bi-lock icon2"></i>
          <input type="password" placeholder="Password" onChange={(event)=>{setpassword(event.target.value);}} required />
        </div>
        <button type="submit">Register</button>
        <div className='login-link'>
          <p>Already have an account? <a href="/login">Log In</a></p>
        </div>
      </form>
    </div>
    </div>
  </div>
);
}

export default Register