import { React, useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Select from "react-select";
import { Skeleton } from "@mui/material";
import axios from "axios";
import "./Absence.css";
import useDocumentTitle from "../tools/useDocumentTitle";
import { AuthContext } from "../context/Contexts";
import { Link } from "react-router-dom";
const Absence = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [students, setStudents] = useState([]);
  // const [lessonDays, setLessonDays] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [groupStudents, setGroupStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectChange = (name) => (value) => {
    setGroupStudents(value);
  };
  const allStudents = JSON.parse(localStorage.getItem("students"));

  const groups = JSON.parse(localStorage.getItem("groups"))
  const options = groups.groups.map((group) => ({
    value: group.id,
    label: group.group_code,
  }));
  const [lessonDays, setLessonDays] = useState([]);
  const dates = [...new Set(lessonDays.map((lesson_day) => lesson_day.date))];
  const token = localStorage.getItem("token");
  useEffect(() => {
    let data = "";
    let config = {
      method: "get",
      url: "https://div.globalsoft.az/api/lesson_days",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setLoading(false);
        setLessonDays(response.data.lesson_days);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token]);
  const getDateData = (date) => {
    return lessonDays.filter((day) => day.date === date);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const filteredData = [];
  for (const date of dates) {
    const filteredLessons = lessonDays.filter(lesson => lesson.date === date);
    const data = {
      date: date,
      lessons: filteredLessons
    };
    filteredData.push(data);
  }
  useDocumentTitle("Davamiyyət");
  function groupData(data) {
    const result = {};
    data.forEach((item) => {
      if (!result[`student_id_${item.student_id}`]) {
        result[`student_id_${item.student_id}`] = {};
      }
      const dateKey = item.date;
      if (!result[`student_id_${item.student_id}`][dateKey]) {
        result[`student_id_${item.student_id}`][dateKey] = [];
      }
      result[`student_id_${item.student_id}`][dateKey].push({
        student_id: item.student_id,
        lesson_id: item.lesson_id,
        date: item.date,
        mark_lesson: item.mark_lesson,
        note_lesson: item.note_lesson,
        type: item.type,
        reason: item.reason,
      });
    });
    return result;
  }
  const lessonDaysBystudent = groupData(lessonDays);
  return (
    <>
      <div className="section-title">
        <h2>Davamiyyət</h2>
      </div>

      <div className="absence-select d-flex align-content-center justify-content-between">
        <div className="courses-content">
          <label htmlFor="absence-select">Qrupu seçin</label>
          <Select
            className="basic-single"
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: "none",
                outline: "none",
                boxShadow: "none",
                color: "black",

                "&:hover": {
                  borderColor: "none",
                  outline: "none",
                  boxShadow: "none",
                },
              }),
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              color: "black",
              colors: {
                ...theme.colors,
                primary25: "rgb(242, 242, 242)",
                primary: "rgb(242, 242, 242)",
              },
            })}
            classNamePrefix="select"
            defaultValue={options[0]}
            isClearable={true}
            isSearchable={true}
            onChange={handleSelectChange("groups")}
            name="color"
            options={options}
          />
        </div>
        <div className="filter-add-main">
          <Link to="/absenceadd">
            <a className="teacher-add-link">Davamiyyət əlavə et</a>
          </Link>
        </div>
      </div>

      <div className="section-title pt-3">
        <h2>Cari ay</h2>
      </div>
      <div className="students-content absences-main pt-3">
        <Paper
          sx={{
            width: "100%",
            overflow: "auto",
            boxShadow: "none",
            background: "white",
            padding: 0,
          }}
        >
          <TableContainer sx={{ maxHeight: 500, whiteSpace: "nowrap", padding: "0" }}>
            <Table stickyHeader aria-label="sticky table" sx={{ padding: "0" }}>

              <table className="table-auto border border-collapse">
                <thead>
                  <tr>
                    <th className="border border-collapse p-2"></th>
                    {dates.map((date) => (
                      <th key={date} className="border border-collapse p-2">
                        {date}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {
                    Object.keys(lessonDaysBystudent).map((key) => {
                      const student = lessonDaysBystudent[key];
                      return (
                        <tr key={key}>
                          <td className="border border-collapse p-2">
                            {
                              dates.map((date) => {
                                if (student[date]) {
                                  const matchingStudent = allStudents.students.find((studentData) => studentData.id == student[date][0].student_id);
                                  if (matchingStudent) {
                                    return matchingStudent.name + ' ' + matchingStudent.last_name;
                                  }
                                }
                                return ''; // If there's no match or if there's no property with that date key in student
                              })
                            }
                          </td>
                          {dates.map((date) => (
                            <td
                              key={`${student.student_id}-${date}`}
                              className={`border border-collapse p-2`}
                            >
                              {student[date] && student[date].map((day) => {
                                if (day.type == 1) {
                                  return (
                                    <div className="absence-status-bad">

                                    </div>
                                  );
                                } else if (day.type == 2) {
                                  return (
                                    <div className="absence-status-good">
                                    </div>
                                  );
                                } else if (day.type == 3) {
                                  return (
                                    <div className="absence-status-normal">
                                    </div>
                                  );
                                }
                              })
                              }
                            </td>
                          ))}
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>

            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={lessonDays.length}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage={<span>Səhifə üzrə sıra sayı:</span>}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ padding: 0, margin: 0 }}
          />
        </Paper>
      </div >
    </>
  );
};
export default Absence;






// import axios from "axios";
// import "./Absence.css";
// import React, { useEffect, useState } from "react";
// function LessonDaysTable() {
//   const [lessonDays, setLessonDays] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const dates = [...new Set(lessonDays.map((lesson_day) => lesson_day.date))];
//   const token = localStorage.getItem("token");
//   useEffect(() => {
//     let data = "";
//     let config = {
//       method: "get",
//       url: "https://div.globalsoft.az/api/lesson_days",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       data: data,
//     };
//     axios(config)
//       .then(function (response) {
//         setLoading(false);
//         setLessonDays(response.data.lesson_days);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }, [token]);
//   const getDateData = (date) => {
//     return lessonDays.filter((day) => day.date === date);
//   };

//   return (
//     <div className="flex justify-center">
//       <table className="table-auto border border-collapse">
//         <thead>
//           <tr>
//             <th className="border border-collapse p-2"></th>
//             {dates.map((date) => (
//               <th key={date} className="border border-collapse p-2">
//                 {date}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {console.log(lessonDays)}
//           {lessonDays.map((lessonDay) => (
//             <tr key={lessonDay.id}>
//               <td className="border border-collapse p-2">{`Name ${lessonDay.student_id}`}</td>
//               {dates.map((date) => (
//                 <td
//                   key={`${lessonDay.id}-${date}`}
//                   className={`border border-collapse p-2 ${getDateMarkColor(
//                     lessonDay.type
//                   )}`}
//                 >
//                   {getDateData(date)
//                     .filter((day) => day.student_id === lessonDay.student_id)
//                     .map((day) => `${day.type}`)
//                     .join(", ")}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// export default LessonDaysTable;
