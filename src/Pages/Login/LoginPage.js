import React,{useState} from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import './Login.css';


const LoginPage = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  let navigate = useNavigate();
  const login = () => {
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/users/login",
    }).then((res) => {console.log(res)
                      navigate("/");});
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
          <input type="text" name="username" placeholder="username" onChange={(e) => setLoginUsername(e.target.value)}/>
        </div>

        {/* password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="password" onChange={(e) => setLoginPassword(e.target.value)}/>
        </div>
      </div>
      <div className='click-signup'>
      <p>You don't have an account ? </p>
      <p className='button-signup'>&nbsp;&nbsp;SignUp </p>
      </div>
      

      {/* button click login */}
      
      <button type="button" className="btn" onClick={login}>
        Login
      </button>
      
    </div>
  )
}
export default LoginPage;