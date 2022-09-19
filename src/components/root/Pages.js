import React from "react";
import Dashboard from "../dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import "./Pages.css";
import Students from "../students/Students";
import Teachers from "../teachers/Teachers";

const Pages = () => {
  return (
    <div className="RoutePages">
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
      </Routes>
    </div>
  );
};

export default Pages;
