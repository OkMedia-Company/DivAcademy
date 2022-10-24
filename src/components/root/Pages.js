import React from "react";
import Dashboard from "../dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import "./Pages.css";
import Students from "../students/Students";
import Teachers from "../teachers/Teachers";
import Graduates from "../Graduates/Graduates";
import Birthday from "../Birthday/Birthday";
import Groups from "../Groups/Groups";
import Courses from "../Courses/Courses";

const Pages = () => {
  return (
    <div className="RoutePages">
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/graduates" element={<Graduates />} />
        <Route path="/birthday" element={<Birthday />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/groups" element={<Groups />} />

      </Routes>
    </div>
  );
};

export default Pages;
