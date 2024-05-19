import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ComponentUrls from "../utils/componentPaths.js";

import Login from "../components/auth/Login.js";
import SignUp from "../components/auth/SignUp.js";
import Marketplace from "../components/marketplace/Marketplace.js";
import ListItem from "../components/marketplace/ListItem.js";
import History from "../components/marketplace/History.js";

const Navigator = () => {
  return (
    <div className="content">
      <Router>
        <Routes>
          <Route path={ComponentUrls.Login} element={<Login />} />
          <Route path={ComponentUrls.SignUp} element={<SignUp />} />
          <Route path={ComponentUrls.Marketplace} element={<Marketplace />} />
          <Route path={ComponentUrls.ListItem} element={<ListItem />} />
          <Route path={ComponentUrls.History} element={<History />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Navigator;
