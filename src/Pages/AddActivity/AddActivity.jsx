import React, { useState, useEffect } from "react";
import './AddActivity.css'
import Timer from '../../Components/Timer/Timer';
import Form from '../../Components/Form/Form';
// เพิ่มส่วนของTimer
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
const element = <FontAwesomeIcon icon={faClock} />;
//  จบส่วนของ Timer

const AddActivity = ({setSwitchPage}) => {
//  เพิ่มส่วนของType Activity
const ImagesTypeActivity = [
    {image:require('../../image/running-color.png'),label:'Running'},
    {image:require('../../image/batminton-color.png'),label:'Batminton'},
    {image:require('../../image/bike2-color.png'),label:'Bike'},
    {image:require('../../image/jump-color.png'),label:'Jumping'},
    {image:require('../../image/swimming.png'),label:'Swimming'},
    {image:require('../../image/walk-color.png'),label:'Walking'},
    {image:require('../../image/weight-color.png'),label:'Weight'},  
  ];
  const [slideTypeActivity, setSlideTypeActivity] =useState (0);
//  จบส่วนของType Activity
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [form, setForm] = useState({
    actTypes: '',
    date: '',
    hr: 0,
    mn: 0,
    cal: 0,
    des: ""
  })

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      
    })

  }
//  เพิ่มส่วนของType Activity
const previous =() =>{
    console.log('previous');
    if(slideTypeActivity === 0){
      setSlideTypeActivity(ImagesTypeActivity.length-1);
    } else {
      const nextSide = slideTypeActivity - 1;
      setSlideTypeActivity(nextSide);
    }
  }

  const next =()=>{
    if(slideTypeActivity === ImagesTypeActivity.length-1){
      setSlideTypeActivity(0);
    } else {
      const nextSide = slideTypeActivity + 1;
      setSlideTypeActivity(nextSide);
    }
  }
//  จบส่วนของType Activity
  useEffect(() => {
  let interval = null;
  if (isActive) {
    interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
  } else if (!isActive && seconds !== 0) {
    clearInterval(interval);
  }
  return () => clearInterval(interval);
}, [isActive, seconds]);
  
const Finsih = () => {
  const hrTimer = Math.floor(seconds/3600);
  const mnTimer = (Math.floor( seconds/60 )) % 60;
  const todayDate = new Date()
  const convertdate = (date) => {
    const arrayDate = todayDate.toLocaleDateString().split('/')
    console.log(`arrayDate ${arrayDate}`);
    const sufferDate = [arrayDate[2]-543, 
                        (arrayDate[1] < 10 ? '0' : '') + arrayDate[1], 
                        (arrayDate[0] < 10 ? '0' : '') + arrayDate[0],]
                        console.log(`sufferDate ${sufferDate}`);
    return sufferDate.join('-')
  }
  const newDate = convertdate(todayDate)
  console.log(newDate)
  setForm({
    ...form,
    hr: hrTimer,
    mn: mnTimer,
    actTypes: ImagesTypeActivity[slideTypeActivity].label,
    date: newDate
  });
  setSeconds(0)
  setIsActive(false)
}
  return (
        <div className="mainActivityPage">
          <div className='duration'>
            <Timer seconds={seconds} setSeconds={setSeconds} isActive={isActive} setIsActive={setIsActive}/>  
              <div className='divTree'>
              <section className='slider'>
                <img src={require("../../image/arrow-left-color.png")} className='s-select left-arrow' onClick={previous} alt='left' />
                <img src={ImagesTypeActivity[slideTypeActivity].image} alt='no internet' className='image'/>
                <img src={require("../../image/arrow-right-color.png")} className='s-select right-arrow' onClick={next} alt='right' />
              </section>
                <div className='button-record'>
                  <button className='button' onClick={Finsih}>
                  RECORD
                  </button>
                </div>
              </div>
          </div>
            
          <div className='activityForm'>
            <h2>Your Activity </h2> 
            
              <Form form={form} setForm={setForm} handleChange={handleChange} setSwitchPage={setSwitchPage}/>
            
          </div>
        </div>
  );
};
export default AddActivity;
