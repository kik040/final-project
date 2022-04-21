import React, { useState} from "react";
import './Home.css'
import AddActivity from '../AddActivity/AddActivity'
import UserProfile from '../../Components/UserProfile/UserProfile';
import RecordActivity from '../../Components/RecordActivity/RecordActivity';

const Home = () => {
  const [switchPage, setSwitchPage] = useState(false);
  const [isUserReload,setIsUserReload] = useState(false);


  const handleClicked =()=>{
    switchPage ? setSwitchPage(false) : setSwitchPage(true);
  }

  return (
    <div className="record-box-main">
      <div className='userAndAddTop'>
        <UserProfile setIsUserReload={setIsUserReload} isUserReload={isUserReload}/>
        <div className='box-right'>
          <div className= 'btn-right'>
            <button className='button-switch-mode' onClick={handleClicked}>{switchPage ? "x" : "+"}</button>
          </div>
          {switchPage ? <AddActivity  setSwitchPage={setSwitchPage}/> : <RecordActivity setIsUserReload={setIsUserReload} isUserReload={isUserReload}/>}
            
         </div>
      </div>
    </div>
  )
}
export default Home;