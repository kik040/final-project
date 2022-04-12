import React, { useState} from "react";
import './Home.css'
import AddActivity from '../AddActivity/AddActivity'
import UserProfile from '../../Components/UserProfile/UserProfile';
import RecordActivity from '../../Components/RecordActivity/RecordActivity';

const Home = () => {
  const [switchPage, setSwitchPage] = useState(false);

  const handleClicked =()=>{
    switchPage ? setSwitchPage(false) : setSwitchPage(true);
  }

  return (
    <div className="record-box-main">
      <div className='userAndAddTop'>
        <UserProfile />
        <div className='box-right'>
          <div className= 'btn-right'>
            <button className='button-switch-mode' onClick={handleClicked}>{switchPage ? "x" : "+"}</button>
          </div>
          {switchPage ? <AddActivity switchPage={switchPage} setSwitchPage={setSwitchPage} /> : <RecordActivity />}
            
         </div>
      </div>
    </div>
  )
}
export default Home;