import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Dashboard from "../dashboard/Dashboard";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import TransactionType from "../TransactionTypes/TransactionType";
import AddTransactionForm from "../TransactionTypes/AddTransactionForm";
import axios from "axios";
import Transaction from "../Transaction/Transaction";
import TransactionAdd from "../Transaction/AddTransaction";
import { ErrorBoundary } from 'react-error-boundary'
import AddMentorForm from "../Mentors/AddMentor";
import EventReserve from "../Classrooms/EventReserve";
import ErrorFallback from "./ErrorBoundary";
import AddLessonDayAbsence from "../Absences/AbsenceAdd";
import GroupsStudents from "../Groups/GroupsStudents";
function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [groups, setGroups] = useState([]);
  const [transactionCategories, setTransactionCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const endpoints = [
      "https://div.globalsoft.az/api/courses",
      "https://div.globalsoft.az/api/groups",
      "https://div.globalsoft.az/api/transaction_categories",
      "https://div.globalsoft.az/api/teachers",
      "https://div.globalsoft.az/api/students"
    ];
    const headers = {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    };
    Promise.all(
      endpoints.map((endpoint) =>
        axios
          .get(endpoint, { headers })
          .then((response) => response.data)
          .catch((error) => console.log(error))
      )
    )
      .then((data) => {
        const [courses, groups, transactionCategories, teachers, students] = data;
        setCourses(courses);
        setGroups(groups);
        setStudents(students);
        setTeachers(teachers);
        localStorage.setItem("courses", JSON.stringify(courses));
        localStorage.setItem("groups", JSON.stringify(groups));
        localStorage.setItem("students", JSON.stringify(students));
        localStorage.setItem("teachers", JSON.stringify(teachers));
        setTransactionCategories(transactionCategories);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, []);
  const navigate = useNavigate();
  // useEffect(() => {
  //   window.location.pathname === "/" && window.location.replace("/login");
  // }, []);
  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          navigate("/login", { replace: true })
        }}
      >
        <AuthContext.Provider
          value={{
            token,
            setToken,
            user,
            setUser,
            courses,
            groups,
            teachers,
            error,
            transactionCategories,
            setTransactionCategories,
            loading,
            students,
            setStudents,
            setGroups,
          }}
        >
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
                  <Route path="mentors" element={<Mentors />} />
                  <Route path="graduates" element={<Graduates />} />
                  <Route path="birthday" element={<Birthday />} />
                  <Route path="employee" element={<Employees />} />
                  <Route path="courses" element={<Courses />} />
                  <Route path="addcourse" element={<AddCourse />} />
                  <Route path="groups" element={<Groups />} />
                  <Route path="groupstudents/:groupId" element={<GroupsStudents />} />
                  <Route path="classrooms" element={<Classrooms />} />
                  <Route path="eventreserve" element={<EventReserve />} />
                  <Route path="addgroup" element={<AddGroup />} />
                  <Route path="addstudentform" element={<AddStudentForm />} />
                  <Route path="addteacherform" element={<AddTeacherForm />} />
                  <Route path="addmentorform" element={<AddMentorForm />} />
                  <Route path="addemployee" element={<AddEmployee />} />
                  <Route path="absence" element={<Absence />} />
                  <Route path="absenceadd" element={<AddLessonDayAbsence />} />
                  <Route path="incomeoutcometips" element={<TransactionType />} />
                  <Route path="incomeoutcome" element={<Transaction />} />
                  <Route path="incomeoutcomeadd" element={<TransactionAdd />} />
                  <Route
                    path="addtransactionform"
                    element={<AddTransactionForm />}
                  />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </AuthContext.Provider>
      </ErrorBoundary>
    </>
  );
}

export default App;
