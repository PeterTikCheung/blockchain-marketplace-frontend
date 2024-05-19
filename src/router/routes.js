import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ComponentUrls from "../utils/componentPaths.js";

import Login from "../components/auth/Login.js";
import SignUp from "../components/auth/SignUp.js";
import Marketplace from "../components/marketplace/Marketplace.js";

const Navigator = () => {
  return (
    <div className="content">
      <Router>
        <Routes>
          <Route path={ComponentUrls.Login} element={<Login />} />
          <Route path={ComponentUrls.SignUp} element={<SignUp />} />
          <Route path={ComponentUrls.Marketplace} element={<Marketplace />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Navigator;
