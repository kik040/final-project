import React, {useState,useEffect} from 'react'
import Axios from 'axios';
import './Form.css'





function Form(props) {
    const [formErrors,setformErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const date =new Date()
    const arrayDate = date.toLocaleDateString().split('/')
    const sufferDate = [arrayDate[2]-543, 
                        (arrayDate[1] < 10 ? '0' : '') + arrayDate[1], 
                        (arrayDate[0] < 10 ? '0' : '') + arrayDate[0],]          
    const todayDate = sufferDate.join('-')

    const validate = (sec) => {
      console.log(`in validation = ${sec}`);
      const errors ={};
      if(sec===0){
        console.log("sec=0");
        errors.second = "Durations is required!";
      }
      return errors;
    }
    useEffect(()=>{
      console.log(`formError username=${formErrors.second}`);
      if(Object.keys(formErrors).length === 0 && isSubmit){
                  // store the states in the form data
        Axios({
          method: "POST",
          data: {
            activityName: props.form.actTypes,
            timestamp: props.form.date,
            duration: second,
            calories: props.form.cal,
            description: props.form.des
    
          },
          withCredentials: true,
          url: "https://final-project-backend-two.vercel.app/users/me/records",
          // url: "http://localhost:4000/users/me/records",
        })
          .then((response) => {
            console.log(response);
            props.setSwitchPage(false);
          }, (error) => {
            console.log(error);
          });
          return;
      }
    },[formErrors]);

    
    const handleSubmit = (event) => {
       console.log(`in submit`);
        event.preventDefault();
        const hr = Math.floor(props.form.hr*3600);
        const mn = Math.floor(props.form.mn*60);
        const second= hr+mn;
        console.log(`in submit sec = ${second}`);
        setformErrors(validate(second));
        setIsSubmit(true);
      }

  return (
    <form className='typeInput' onSubmit={handleSubmit}>
        <div className='form-actType'>
            <label>Activity&nbsp;&nbsp;</label> 
            <input type="text" value={props.form.actTypes} name="actTypes" onChange={props.handleChange} required />
        </div>
        <div className='form-date'>
            <label>Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type="date" value={props.form.date} name="date" onChange={props.handleChange} max={todayDate} required/> 
        </div>
        <br/>
        <div>
            <label id='duration'>Duration12</label> <br/>
            <input type="number" value={props.form.hr} name="hr" onChange={props.handleChange} min={0} max={23} required></input>
            <label>&nbsp;Hour&nbsp;&nbsp;&nbsp;&nbsp;</label> 
            <input type="number" value={props.form.mn} name="mn" onChange={props.handleChange} min={0} max={59} required></input>
            <label>&nbsp;Minute</label>  
        </div>
        <div><p>{formErrors.second}</p></div>
        <div>
            <label>Calorie&nbsp;&nbsp;</label>
            <input type="number" value={props.form.cal} name="cal" onChange={props.handleChange} min={0} max={9999}/>
            <label>&nbsp;&nbsp;cals</label>
        </div>
        <div>
            <label >Description: </label> <br/>
            <textarea name="des" cols="20" rows="3" value={props.form.des} onChange={props.handleChange}></textarea>
        </div>
        <button type="submit" className="button">Add12</button>
    </form>
  )
}

export default Form