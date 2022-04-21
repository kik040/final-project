import { faRunning } from "@fortawesome/free-solid-svg-icons";
import React,{useState,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSquarePen,faTrashCan} from '@fortawesome/free-solid-svg-icons'
import ModalEdit from "../ModalEdit/ModalEdit";
import Axios from 'axios';




function RecordActivity({setIsUserReload ,isUserReload}) {
  const [formRecords,setFormRecords] = useState([]);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [dataUsers, setDataUsers] = useState([]);
  const [form, setForm] = useState({
    id:'',
    actName: '',
    date: '',
    hr: 0,
    mn: 0,
    cal: 0,
    des: ""
  })

  useEffect(() =>{
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/users/me",
    }).then((res) => {
      setDataUsers(res.data);
      console.log(res.data);
    });
  },[isUserReload])

  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/users/me/records",
    }).then((res) => {
      setFormRecords(res.data);
      console.log(res.data);
    });

  },[isLoading])
  //แปลงDATE
  const convertdate = (date1) => {
    const datetoStr = date1.substring(0, 10);
    const arrayDate = datetoStr.split('-')
    const sufferDate = [arrayDate[2], 
                        arrayDate[1],
                        arrayDate[0],]
    return sufferDate.join('/')
}
//แปลงDuration
const convertDuration = (duration) =>{
  const hrTimer = Math.floor(duration/3600);
  const mnTimer = (Math.floor( duration/60 )) % 60;
  return hrTimer===0 ? `${mnTimer} min` : mnTimer===0 ? `${hrTimer} hr`: `${hrTimer} hr ${mnTimer} min`
}

async function deletePost(id) {
  Axios({
    method: "DELETE",
    withCredentials: true,
    url: `http://localhost:4000/users/me/records/${id}`,
  }).then((res) => {console.log(res)
    isLoading ? setIsLoading(false) :setIsLoading(true);
  //  window.location.reload();
  });
}

const setFormToModalEdit=(idRecord)=>{
  const hrTimer = Math.floor(idRecord.duration/3600);
  const mnTimer = (Math.floor( idRecord.duration/60 )) % 60;
  const datetoStr = idRecord.timestamp.substring(0, 10);
  console.log(`id=${idRecord._id},actname=${idRecord.activityName},cal=${idRecord.calories}`)
  setForm({
    id: idRecord._id,
    hr: hrTimer,
    mn: mnTimer,
    actName: idRecord.activityName,
    date: datetoStr,
    cal:idRecord.calories,
    des:idRecord.description
  });
  setModalEditOpen(true)
}

const handleChange = e => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  })
}

   //คำนวณระยะเวลารวมกับแคลรวม
  let sumSeconds = 0;
  let sumcals=0;
  formRecords.map((formRecord) => {
    sumSeconds+=formRecord.duration;
    sumcals+=formRecord.calories;

  })
  console.log(sumSeconds);
  const sumHr = Math.floor(sumSeconds/3600);
  const sumMin = (Math.floor(sumSeconds/60 )) % 60;

  ///////////////////////////
      const recordData = formRecords.map((formRecord) => (
      <div className='data-activity' key={formRecord._id} >
        <div className='data-activity-user'>
          {convertdate(formRecord.timestamp)}
        </div>&nbsp;|&nbsp;
        <div className='data-activity-user'>
          {formRecord.activityName}
        </div>&nbsp;|&nbsp;
        <div className='data-activity-user'>
          {convertDuration(formRecord.duration)}
        </div>&nbsp;|&nbsp;
        <div className='data-activity-user'>
          {formRecord.calories}
        </div>&nbsp;|&nbsp;
        <div className='data-activity-user'>
        <button className="iconModal" onClick={() => setFormToModalEdit(formRecord)}><FontAwesomeIcon icon={faSquarePen} size="lg" border className="colorFontAS"/></button>&nbsp;
        <button className="iconModal" onClick={()=> deletePost(formRecord._id)}><FontAwesomeIcon icon={faTrashCan} size="lg" border inverse className="colorFontAS"/></button>
        </div>&nbsp;&nbsp;
        
      </div>
    ))
  ///////////////////////////

    return (
      <>
      {modalEditOpen && <ModalEdit setModalEditOpen={setModalEditOpen} setForm={setForm} form={form} handleChange={handleChange} setIsLoading={setIsLoading} isLoading={isLoading} deletePost={deletePost}/>}
        <div className='BoxDown'>
          <div className='top-plus'>
            <div className='data-result1'>
            DURATION GOAL
              <br/>
        {dataUsers.durationGoal} hr
            </div>
            <div className='data-result1'>
            CURRENT TOTAL
              <br/>
              {sumHr===0 ? `${sumMin} min` : sumMin===0 ? `${sumHr} hr`: `${sumHr} hr ${sumMin} min`}
            </div>
            <div className='data-result2'>
              CALORIES GOAL
              <br/>
        {dataUsers.caloriesGoal} cals
            </div>
            <div className='data-result2'>
              CURRENT TOTAL
              <br/>
              {sumcals} cals
            </div>
            {/* button + */}
        
          </div>
  
          {/* =========row for data */}

          <div className='data-activity'>
            <div className='data-activity-user'>
              DATE
            </div>&nbsp;|&nbsp;
            <div className='data-activity-user'>
              ACTIVITY
            </div>&nbsp;|&nbsp;
            <div className='data-activity-user'>
              DURATION
            </div>&nbsp;|&nbsp;
            <div className='data-activity-user'>
              CALORIES
            </div>&nbsp;|&nbsp;
            <div className='data-activity-user'>
              
            </div>&nbsp;&nbsp;
          </div>
          
          {recordData}

      </div>
      
      </>
    )
}
  
  export default RecordActivity;