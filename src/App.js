import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddActivityPage from "./Pages/Home/Home";
import Register from "./Pages/Login/Register";
import RecordActivity from './Components/RecordActivity/RecordActivity';
import LoginPage from "./Pages/Login/LoginPage";
import Navbar from "./Components/Navbar/Navbar"

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          {/* <Route path="/" element={<AddActivityPage />} /> */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<AddActivityPage />} />
          <Route path="/register" element={<Register />} />

        
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
