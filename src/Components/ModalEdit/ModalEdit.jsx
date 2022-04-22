import React,{useState} from "react";
import Axios from 'axios';
import "./ModalEdit.css";

function ModalEdit({ setModalEditOpen , form , handleChange , isLoading , setIsLoading , deletePost}) {
  const [showData, setShowData] = useState(true);
  const [showBtnSubmit, setShowBtnSubmit] = useState(false);
  const date =new Date()
  const arrayDate = date.toLocaleDateString().split('/')
  const sufferDate = [arrayDate[2]-543, 
                      (arrayDate[1] < 10 ? '0' : '') + arrayDate[1], 
                      (arrayDate[0] < 10 ? '0' : '') + arrayDate[0],]         
  const todayDate = sufferDate.join('-')

const clickSetShow = (e) =>{
  e.preventDefault();
  setShowData(false);
  setShowBtnSubmit(true);
}
const handleSubmit = async(event) => {
  console.log("ComeOn");
  event.preventDefault();
  const id = form.id;
  const hr = Math.floor(form.hr*3600);
  const mn = Math.floor(form.mn*60);
  const second= hr+mn;
  // store the states in the form data
  Axios({
    method: "PUT",
    data: {
      activityName: form.actName,
      timestamp: form.date,
      duration: second,
      calories: form.cal,
      description: form.des
    },
    withCredentials: true,
    url: `http://localhost:4000/users/me/records/${id}`,
  })
    .then((response) => {
      console.log(response);
      setModalEditOpen(false);
      isLoading ? setIsLoading(false) : setIsLoading(true);
      console.log(`submit=${isLoading}`)
      // window.location.reload();

    }, (error) => {
      console.log(error);
    });
    return;
}

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
                setModalEditOpen(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Edit?</h1>
          {/* {console.log(`actName ${actName}`)} */}
        </div>
        <div className="body">
          <form className='typeInput' onSubmit={handleSubmit}>
        <div className='form-actType'>
            <label>Activity :&nbsp;&nbsp;</label>
            {/* <label style={{ display: show ? "inline" : "none" }}>{form.actName}</label>  */}
            <input type="text" value={form.actName} name="actName" style={{ display: showData ? "inline" : "none" }} disabled/>
            <input type="text" value={form.actName} name="actName" onChange={handleChange} required style={{ display: showData ? "none" : "inline" }}/>
        </div>
        <div >
            <label>Date :</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="date" value={form.date} name="date"style={{ display: showData ? "inline" : "none" }} disabled/> 
            <input type="date" value={form.date} name="date" onChange={handleChange} max={todayDate} required style={{ display: showData ? "none" : "inline" }}/> 
        </div>
        <br/>
        <div>
            <label id='duration'>Duration : </label> <br/>
            <input type="number" value={form.hr} name="hr" min={0} max={23} style={{ display: showData ? "inline" : "none" }} disabled></input>
            <input type="number" value={form.hr} name="hr" onChange={handleChange} min={0} max={23} required style={{display: showData ? "none" : "inline" }}></input>
            <label>&nbsp;Hour&nbsp;&nbsp;&nbsp;&nbsp;</label> 
            <input type="number" value={form.mn} name="mn" min={0} max={59} style={{ display: showData ? "inline" : "none" }} disabled></input>
            <input type="number" value={form.mn} name="mn" onChange={handleChange} min={0} max={59} required style={{ display: showData ? "none" : "inline" }}></input>
            <label>&nbsp;Minute</label>  
        </div>
        <div>
            <label>Calorie :&nbsp;&nbsp;</label>
            <input type="number" value={form.cal} name="cal" min={0} max={9999} style={{ display: showData ? "inline" : "none" }} disabled/>
            <input type="number" value={form.cal} name="cal" onChange={handleChange} min={0} max={9999} style={{ display: showData ? "none" : "inline" }}/>
            <label>&nbsp;&nbsp;cals</label>
        </div>
        <div>
            <label >Description : </label> <br/>
            <textarea className="textarea1" name="des" cols="20" rows="3" value={form.des} style={{ display: showData ? "inline" : "none" }} disabled ></textarea>
            <textarea name="des" cols="20" rows="3" value={form.des} onChange={handleChange} style={{ display: showData ? "none" : "inline" }}></textarea>
        </div>
        <div className="footer">
          {showBtnSubmit ? <button type="submit" className="buttonSubmitModal" >Submit</button> : <button className="buttonSubmitModal" onClick={clickSetShow}>Edit</button>}
        <button className="buttonSubmitModal" onClick={() => {deletePost(form.id);}} id="cancelBtn">Delete</button>
        </div>
    </form>
        </div>

        
      </div>
    </div>
  );
}

export default ModalEdit;