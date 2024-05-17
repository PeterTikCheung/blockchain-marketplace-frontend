import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Login from "../components/Login.js";
//import Registration from "../components/Registration.js";

const Navigator = () => {
  return (
    <div className="content">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Navigator;
