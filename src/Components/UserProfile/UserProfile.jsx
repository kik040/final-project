import React, {useState,useEffect} from 'react';
import { useNavigate} from "react-router-dom";
import Axios from 'axios';
function UserProfile({setIsUserReload ,isUserReload}) {
  let navigate = useNavigate();
  const [showData, setShowData] = useState(true);
  const [dataUsers, setDataUsers] = useState([]);
  const [form, setForm] = useState({
    id:'',
    aboutme: '',
    fav: '',
    durationG: 0,
    calG: 0,
  })

    useEffect(() =>{
      Axios({
        method: "GET",
        withCredentials: true,
        url: "https://final-project-backend-two.vercel.app/users/me",
        // url: "http://localhost:4000/users/me",
      }).then((res) => {
        setDataUsers(res.data);
        console.log(res.data);
      });
      console.log(`useEff${isUserReload}`)
    },[isUserReload])

    const handleChange = e =>{
      console.log("Form",form);
      setForm({
        ...form,
        [e.target.name]: e.target.value,
    })}

    const setEditDataUser = () =>{
      setForm({
        id: dataUsers._id,
        aboutme: dataUsers.aboutMe,
        fav: dataUsers.favorite,
        durationG: dataUsers.durationGoal,
        calG: dataUsers.caloriesGoal,
      })
      setShowData(false)
    }

    const handleSubmit = async(event) => {
      console.log("ComeOn");
      event.preventDefault();
      Axios({
        method: "PUT",
        data: {
          aboutMe: form.aboutme,
          favorite: form.fav,
          durationGoal: form.durationG,
          caloriesGoal: form.calG,
        },
        withCredentials: true,
        url: `https://final-project-backend-two.vercel.app/users/edit`,
        // url: `http://localhost:4000/users/edit`,
      })
        .then((response) => {
          console.log(response);
          setShowData(true);
          isUserReload ? setIsUserReload(false) : setIsUserReload(true);
        }, (error) => {
          console.log(error);
        });
        return;
    }
    
  const logOut = () => {
    Axios({
      method: "DELETE",
      withCredentials: true,
      url: "https://final-project-backend-two.vercel.app/users/logout",
      // url: "http://localhost:4000/users/logout",
    });
    setDataUsers(null);
    navigate("/")
  }

    return (
        <div className='profile'>
    
        <div>
          <img src={require("../../image/PROFILE.png")} alt='profile-pic' className='pro-pic' />
        </div>

        {/* data profile */}
        <div className='data-profile'>
        {dataUsers ? <p>Welcome Back : <label className='data-profile-name'>{dataUsers.displayName}</label></p> :"Nodata"}

          <form onSubmit={handleSubmit}>
          <div className='data-profile-user color-blue'>
            <label>AboutMe</label>
            <input type="text" value={dataUsers.aboutMe} name="aboutme" placeholder="Aboutme" style={{ display: showData ? "inline" : "none" }} disabled/>
            <input type="text" value={form.aboutme} name="aboutme" placeholder="Aboutme" onChange={handleChange} style={{ display: showData ? "none" : "inline" }}/>
          </div>
          <div className='data-profile-user color-blue'>
            <label>Favorite</label>
            <input type="text" value={dataUsers.favorite} name="fav" placeholder="Favorite" style={{ display: showData ? "inline" : "none" }} disabled/>
            <input type="text" value={form.fav} name="fav" placeholder="Favorite" onChange={handleChange} style={{ display: showData ? "none" : "inline" }}/>
          </div>
          <div className='data-profile-user color-pink'>
          <label>DurationGoal</label>
          <div>
          <input type="number" value={dataUsers.durationGoal} name="durationG" placeholder="Duration Goal" min={0} max={9999999} style={{ display: showData ? "inline" : "none" }} disabled/>
          <input type="number" value={form.durationG} name="durationG" placeholder="Duration Goal" min={0} max={9999999} onChange={handleChange} style={{ display: showData ? "none" : "inline" }}/>&nbsp;
          hr
          </div>
          </div>
          <div className='data-profile-user color-blue'>
          <label>CaloriesGoal</label>
          <div>
          <input type="number" value={dataUsers.caloriesGoal} name="calG" placeholder="Calories Goal" min={0} max={9999999} style={{ display: showData ? "inline" : "none" }} disabled/>
          <input type="number" value={form.calG} name="calG" placeholder="Calories Goal" min={0} max={9999999} onChange={handleChange} style={{ display: showData ? "none" : "inline" }}/>&nbsp;cals
          </div>
          </div>
          {showData ? <button type="button" className="edit-profile" onClick={setEditDataUser}>Edit</button>:<div><button type="submit" className="edit-profile" >Submit</button><button type="button" className="edit-profile" onClick={() => {setShowData(true);}}>Cancel</button></div> }
          </form>
        
        <button type="button" className="edit-profile" onClick={logOut}>
          Log out
        </button>
        
        </div>


      </div>
    )
    
}

export default UserProfile;