import React, {useState} from 'react'
import axios from 'axios';
import './Login.css';


const Register = () => {
  
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerDisplayName, setRegisterDisplayName] = useState("");

  const register = () => {
    axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
        displayName: registerDisplayName,

      },
      withCredentials: true,
      url: "http://localhost:4000/users/register",
    }).then((res) => console.log(res));
  };
  return (
    <div className="container login-page">
        {/* logo */}
        <div>
            <img src={require("../../image/group2.png")} alt='logo-login' className='picture-login'/>
        </div>
      
        <div className="form">
        {/* username */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" placeholder="username" onChange={(e) => setRegisterUsername(e.target.value)}/>
        </div>

        {/* email */}
        <div className="form-group">
            <label htmlFor="email">Display Name</label>
            <input type="text" name="displayName" placeholder="DisplayName" onChange={(e) => setRegisterDisplayName(e.target.value)}/>
        </div>

        {/* password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="password" onChange={(e) => setRegisterPassword(e.target.value)}/>
        </div>
      </div>
      <div className='click-signup'>
      <p>You have an account ? </p>
      <p className='button-signup'>&nbsp;&nbsp;SignIn </p>
      </div>
      

      {/* button click login */}
      
      <button type="button" className="btn" onClick={register}>
        Register
      </button>
      
    </div>
  )
}
export default Register;