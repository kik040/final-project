import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSquarePen,faTrashCan} from '@fortawesome/free-solid-svg-icons'
import ModalEdit from "../ModalEdit/ModalEdit";
import axios from 'axios';
import '../../Pages/Home/Home.css';

const element = <FontAwesomeIcon icon={faSquarePen} />

// const element = <FontAwesomeIcon icon={faClock} />;


function RowRecord({id,actName,date,duration,calories,description}) {
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [status, setStatus] = useState(null);
    //ตั้งค่าแสดงวันที่
    const convertdate = (date1) => {
        const datetoStr = date1.substring(0, 10);
        const arrayDate = datetoStr.split('-')
        const sufferDate = [arrayDate[2], 
                            arrayDate[1],
                            arrayDate[0],]
        return sufferDate.join('/')
    }
    const newDate = convertdate(date)
    //ตั้งค่าแสดงระยะเวลา
    const hrTimer = Math.floor(duration/3600);
    const mnTimer = (Math.floor( duration/60 )) % 60;

    //////////////
    async function deletePost(e) {
      console.log(id);
      await axios.delete(`http://localhost:4000/users/me/records/${id}`);
      setStatus('Delete successful');
      window.location.reload(false);
    }
    return (
      <>
      {modalEditOpen && <ModalEdit setModalEditOpen={setModalEditOpen} id={id} actName={actName} date={date} duration={duration} calories={calories} description={description}/>}
      <div className='data-activity' key={id} >
        <div className='data-activity-user'>
          {newDate}
        </div>&nbsp;|&nbsp;
        <div className='data-activity-user'>
          {actName}
        </div>&nbsp;|&nbsp;
        <div className='data-activity-user'>
          {/* {hrTimer} hr {mnTimer} min */}
           {hrTimer===0 ? `${mnTimer} min` : mnTimer===0 ? `${hrTimer} hr`: `${hrTimer} hr ${mnTimer} min`}
        </div>&nbsp;|&nbsp;
        <div className='data-activity-user'>
          {calories}
        </div>&nbsp;|&nbsp;
        <div className='data-activity-user'>
        <button className="iconModal" onClick={() => {setModalEditOpen(true)}}><FontAwesomeIcon icon={faSquarePen} size="lg" border className="colorFontAS"/></button>&nbsp;
        <button className="iconModal" onClick={()=> deletePost(id)}><FontAwesomeIcon icon={faTrashCan} size="lg" border className="colorFontAS"/></button>
        </div>&nbsp;&nbsp;
        
      </div>
      
      </>
    )

}
export default RowRecord;