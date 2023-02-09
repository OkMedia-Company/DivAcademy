import React, { useState, useEffect } from "react";
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
import AddStudentForm from "../students/AddStudentForm";
import PrivateRoutes from "../utilities/PrivateRoutes";
import { AuthContext } from "../context/Contexts";
import StudentInnerPage from "../students/EditStudentForm";
import Employees from "../Employee/Employee";
import AddTeacherForm from "../teachers/AddTeacherForm";
import TeacherEditPage from "../teachers/TeacherEditPage";
import AddEmployee from "../Employee/AddEmployee";
import EditEmployee from "../Employee/EditEmployee";
import Absence from "../Absences/Absence.jsx";
import AddCourse from "../Courses/AddCourse";
import EditCourse from "../Courses/EditCourse";
import AddGroup from "../Groups/AddGroup";
import EditGroup from "../Groups/EditGroup";
import AddToStudentGroup from "../Groups/AddToStudentGroup";
import Mentors from "../Mentors/Mentors";
import Classrooms from "../Classrooms/Classrooms";
function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  return (
    <>
      <AuthContext.Provider value={{ token, setToken, user, setUser }}>
        <div className="RoutePages">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<PrivateRoutes />}>
              <Route path="/" element={<HomeLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="students" element={<Students />} />
                <Route path="students/:userId" element={<StudentInnerPage />} />
                <Route path="teachers/:userId" element={<TeacherEditPage />} />
                <Route path="employee/:userId" element={<EditEmployee />} />
                <Route path="courses/:userId" element={<EditCourse />} />
                <Route path="groups/:groupId" element={<EditGroup />} />
                <Route
                path="groups/:groupId/addstudent"
                element={<AddToStudentGroup />}
              />
                <Route path="teachers" element={<Teachers />} />
                <Route path="mentors"  element={<Mentors/>} />
                <Route path="graduates" element={<Graduates />} />
                <Route path="birthday" element={<Birthday />} />
                <Route path="employee" element={<Employees />} />
                <Route path="courses" element={<Courses />} />
                <Route path="addcourse" element={<AddCourse />} />
                <Route path="groups" element={<Groups />} />
                <Route path="classrooms" element={<Classrooms />} />
                <Route path="addgroup" element={<AddGroup />} />
                <Route path="addstudentform" element={<AddStudentForm />} />
                <Route path="addteacherform" element={<AddTeacherForm />} />
                <Route path="addemployee" element={<AddEmployee />} />
              
                <Route path="absence" element={<Absence />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </AuthContext.Provider>
    </>
  );
}

export default App;
