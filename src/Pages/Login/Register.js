import React, {useState,useEffect} from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';
import './Login.css';


const Register = () => {
  let navigate = useNavigate();
  const [formErrors,setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [formRegister, setFormRegister] = useState({
    username: '',
    displayName: '',
    password: '',
  })
  useEffect(()=>{
    console.log(`formError username=${formErrors.username},displayName=${formErrors.displayName},password=${formErrors.password}`);
  if(Object.keys(formErrors).length === 0 && isSubmit){
    console.log(`formRegister username=${formRegister.username},password=${formRegister.password},displayName=${formRegister.displayName}`);
    axios({
    method: "POST",
    data: {
      username: formRegister.username,
      password: formRegister.password,
      displayName: formRegister.displayName,
    },
    withCredentials: true,
    url: "http://localhost:4000/users/register",
  }).then((res) => {console.log(res)
                     navigate("/");});
  }
   },[formErrors]);

  const handleChange = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
  })}

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(validate(formRegister));
    setIsSubmit(true);
  };
  const validate = (values) => {
    const errors ={};
    const repass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
    if(!values.username){
      errors.username = "Username is required!"
    }
    if(!values.password){
      errors.password = "Password is required!"
    }else if (!repass.test(values.password)){
      errors.password = "Password must be contain lower character, capital character and number!"
    }else if (values.password.length>16||values.password.length<8){
      errors.password = "password must be 8-16 characters!"
    }

    if(!values.displayName){
      errors.displayName = "DisplayName is required!"
    }
    return errors;
  };

  return (
    <div className='login-box-main'>
      <div className="login-page">
        {/* logo */}
        <div>
            <img src={require("../../image/group2.png")} alt='logo-login' className='picture-login'/>
        </div>
        <form className="form_center" onSubmit={handleSubmit}>
        <div className="form">
        {/* username */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          {/* <input type="text" name="username" placeholder="username" onChange={(e) => setRegisterUsername(e.target.value)}/> */}
          <input type="text" name="username" placeholder="username" onChange={handleChange}/>
          <p>{formErrors.username}</p>
        </div>

        {/* email */}
        <div className="form-group">
            <label htmlFor="email">Display Name</label>
            {/* <input type="text" name="displayName" placeholder="DisplayName" onChange={(e) => setRegisterDisplayName(e.target.value)}/> */}
            <input type="text" name="displayName" placeholder="DisplayName" onChange={handleChange}/>
            <p>{formErrors.displayName}</p>
        </div>

        {/* password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          {/* <input type="password" name="password" placeholder="password" onChange={(e) => setRegisterPassword(e.target.value)}/> */}
          <input type="password" name="password" placeholder="password" onChange={handleChange}/>
          <p>{formErrors.password}</p>
        </div>
      </div>

      <div className='click-signup'>
      <p>Already have an account ? </p>
      {/* <p className='button-signup'>&nbsp;&nbsp;Login </p> */}
      <label><Link className='button-signup' to="/">Login</Link></label>
      </div>
      

      {/* button click login */}
      
      <button type="submit" className="btn">
        Register
      </button>
      </form>
      
    </div>
    </div>
    
  )
}
export default Register;