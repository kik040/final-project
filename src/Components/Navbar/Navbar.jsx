import React,{ useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../image/My-Reality2.png";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const handleClicked = (e) => {
    clicked ? setClicked(false) : setClicked(true);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <img className="logo-icon" src={logo} />
          <a herf="#" style={{ color: "#946dc0" }}>
            The
          </a>
          <a herf="#" style={{ color: "#cf4b9c" }}>
            Reality
          </a>
        </div>
        <a href="#" className="toggle-button" onClick={handleClicked}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
        <div className={clicked ? "nav-menu active" : "nav-menu"}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/addactivity">Add Activity</Link>
            </li>
            <li>
              <a herf="#">Profile</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
