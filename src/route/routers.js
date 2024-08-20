import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import TaskList from "../pages/TaskList";
import CompletedTasks from "../pages/CompletedTasks";
import Inprogress from "../pages/Inprogress";

const Routers = () => {
  return (
      <Routes >
        <Route path="/" exact element={<Navigate to="/home" />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/TaskList" exact element={<TaskList />} />
        <Route path="/Inprogress" exact element={<Inprogress />} />
        <Route path="/CompletedTasks" exact element={<CompletedTasks />} />
      </Routes>
  );
};

export default Routers;