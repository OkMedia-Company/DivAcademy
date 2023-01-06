import React, { useState } from "react";
import "./App.css";
import Dashboard from "../dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import "./Pages.css";
import Students from "../students/Students";
import Teachers from "../teachers/Teachers";
import Graduates from "../Graduates/Graduates";
import Birthday from "../Birthday/Birthday";
import Groups from "../Groups/Groups";
import Courses from "../Courses/Courses";
import Login from "../Login/Login";
import Signup from "../Login/Signup";
import HomeLayout from "./HomeLayout";
import NotFound from "./NotFound";
import Adding from "../Adding/Adding";
import { AuthContext } from "../context/Contexts";

function App() {
  const [user, setUser] = useState({ type: "null" });

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <div className="RoutePages">
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index={true} element={<Dashboard />} />
              <Route path="students" element={<Students />} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="graduates" element={<Graduates />} />
              <Route path="birthday" element={<Birthday />} />
              <Route path="courses" element={<Courses />} />
              <Route path="groups" element={<Groups />} />
              <Route path="adding" element={<Adding />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </AuthContext.Provider>
    </>
  );
}

export default App;
