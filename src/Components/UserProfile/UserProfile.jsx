import React, {useState,useEffect} from 'react';
import axios from 'axios';
function UserProfile() {
  const [data, setData] = useState(null);
  
    
    useEffect(() => {
      axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:4000/users/user",
      }).then((res) => {
        setData(res.data);
        console.log(res.data);
        
      });
    },[])
///////////////////////
  // const getUser = () => {
  //   axios({
  //     method: "GET",
  //     withCredentials: true,
  //     url: "http://localhost:4000/users/user",
  //   }).then((res) => {
  //     setData(res.data);
  //     console.log(res.data);
  //   });
  // };

  const logOut = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/users/logout",
    });
    setData(null);
  }
    return (
        <div className='profile'>
    
        <div>
          <img src={require("../../image/PROFILE.png")} alt='profile-pic' className='pro-pic' />
        </div>

        {/* data profile */}
        <div className='data-profile'>
        {data ? <p>Welcome Back {data.username}</p> : null}
          
          <div className='data-profile-user'>
            AboutMe
            <br/>
            I'm Busy
          </div>
          
        <button type="button" className="edit-profile" >
          edit
        </button>

        <button type="button" className="edit-profile" onClick={logOut}>
          Log out
        </button>
        
        </div>


      </div>
    )
    
}

export default UserProfile;