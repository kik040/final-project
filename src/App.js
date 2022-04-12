import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import AddActivityPage from "./Pages/Home/Home";
import Register from "./Pages/Login/Register";
import RecordActivity from './Components/RecordActivity/RecordActivity';
import Navbar from "./Components/Navbar/Navbar";
import LoginPage from "./Pages/Login/LoginPage";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<AddActivityPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
        
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
