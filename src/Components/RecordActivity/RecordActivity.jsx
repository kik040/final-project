import { faRunning } from "@fortawesome/free-solid-svg-icons";
import React,{useState,useEffect} from "react";
import {getRecords} from "../../api/index"
import RowRecord from "../RowRecord/RowRecord";
import Axios from 'axios';
// import ModalEdit from "../ModalEdit/ModalEdit";



function RecordActivity() {
  const [formRecords,setFormRecords] = useState([]);
  const [modalEditOpen, setModalEditOpen] = useState(false);

  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/users/me/records",
    }).then((res) => {
      setFormRecords(res.data);
      console.log(res.data);
      
    });

  },[])

  // useEffect(() => {
  //   (async() => {
  //     const response = await getRecords();
  //     console.log(response.status);
  //     console.log(response.data);
  //     if(response.status === 200){
  //       setFormRecords(response.data)
  //     }
  //   })();
  //   const intervalId = setInterval (()=>{},5000);
  // },[ ])

  let sumSeconds = 0;
  formRecords.map((formRecord) => {
    sumSeconds+=formRecord.duration
  })
  console.log(sumSeconds);
  const sumHr = Math.floor(sumSeconds/3600);
  const sumMin = (Math.floor(sumSeconds/60 )) % 60;

  ///////////////////////////
    //   const recordData = formRecords.map((formRecord) => (
    //   <div className='data-activity' key={formRecord._id} >
    //     <div className='data-activity-user'>
    //       {formRecord.timestamp}
    //     </div>&nbsp;|&nbsp;
    //     <div className='data-activity-user'>
    //       {formRecord.activityName}
    //     </div>&nbsp;|&nbsp;
    //     <div className='data-activity-user'>
    //       {formRecord.duration}
    //     </div>&nbsp;|&nbsp;
    //     <div className='data-activity-user'>
    //       {formRecord.calories}
    //     </div>&nbsp;&nbsp;
    //   </div>
    // ))
  ///////////////////////////

    return (
      <>
      
        <div className='BoxDown'>
          <div className='top-plus'>
            <div className='data-result'>
              GOAL
              <br/>
              5000 min
            </div>
            <div className='data-result'>
              DURATION TOTAL
              <br/>
              {sumHr===0 ? `${sumMin} min` : sumMin===0 ? `${sumHr} hr`: `${sumHr} hr ${sumMin} min`}
            </div>
            <div className='data-result'>
              CALORIES GOAL
              <br/>
              8000 min
            </div>
            <div className='data-result'>
              CURRENT TOTAL
              <br/>
              324 cals
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
              CALORIES
            </div>&nbsp;&nbsp;
          </div>
  
          {/* {recordData} */}
          {formRecords.map((formRecord) => 
             <RowRecord 
               key={formRecord._id}
               id={formRecord._id} 
               actName={formRecord.activityName}
               date={formRecord.timestamp}
               duration={formRecord.duration}
               calories={formRecord.calories}
               description={formRecord.description}
              //  setModalEditOpen={setModalEditOpen}
                />  
          )}
      </div>
      {/* {modalEditOpen && <ModalEdit setModalEditOpen={setModalEditOpen} id={formRecords._id} actName={formRecords.activityName} date={formRecords.timestamp} duration={formRecords.duration} calories={formRecords.calories} description={formRecords.description}/>} */}
      </>
    )
}
  
  export default RecordActivity;