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
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const dates = [...new Set(students.map((lesson_day) => lesson_day.date))];
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
        setStudents(response.data.lesson_days);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token]);

  const options = [
    { value: "1", label: "FD3F2321" },
    { value: "2", label: "FE23A232" },
    { value: "3", label: "BE032223" },
  ];
  const studentsAll = useContext(AuthContext)?.students.students
  useDocumentTitle("Davamiyyət");
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
            padding: 1,
          }}
        >
          <TableContainer sx={{ maxHeight: 500, whiteSpace: "nowrap" }}>
            <Table stickyHeader aria-label="sticky table" sx={{ padding: "0" }}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Ad Soyad</TableCell>


                  {/* {
                    dates.map((dates) => (
                      <TableCell align="center">
                        <span className="date-absences">{dates}</span>
                      </TableCell>
                    ))
                  } */}
                  <TableCell align="center">
                    <span className="date-absences">12.05.2021</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="date-absences">12.05.2021</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="date-absences">12.05.2021</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="date-absences">12.05.2021</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="date-absences">12.05.2021</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="date-absences">12.05.2021</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="date-absences">12.05.2021</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="date-absences">12.05.2021</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="date-absences">12.05.2021</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="date-absences">12.05.2021</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="date-absences">12.05.2021</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="date-absences">12.05.2021</span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="date-absences">12.05.2021</span>
                  </TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {loading
                  ? Array.from({ length: rowsPerPage }, (_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton variant="rounded" width={40} height={40} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width={150} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width={150} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width={150} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width={150} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width={150} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width={150} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width={150} />
                      </TableCell>
                    </TableRow>
                  ))
                  : students
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((students) => (
                      <TableRow key={students.id} hover>
                        <TableCell align="left">
                          {students.name} {students.last_name}{" "}Elcan
                        </TableCell>
                        <TableCell>
                          <div className="absence-status-good">
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="absence-status-good">

                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="absence-status-good">

                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="absence-status-good">

                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="absence-status-bad">

                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="absence-status-normal">

                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="absence-status-normal">

                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="absence-status-normal">

                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="absence-status-normal">

                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="absence-status-normal">

                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="absence-status-bad">

                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="absence-status-bad">

                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="absence-status-bad">

                          </div>
                        </TableCell>
                        {
                          students.type === "10" ?
                            <TableCell align="center">
                              {dates.map((date) => {
                                const lesson_day = studentsAll.find(
                                  (ld) => ld.date === date && ld.student_id === students.id
                                );
                                return <TableCell key={`${students.id}-${date}`}>
                                  {
                                    lesson_day?.type === "10" ? (
                                      <span className="absence-status absence-status-1">
                                        <i className="fas fa-check"></i>
                                      </span>
                                    ) : (
                                      <span className="absence-status absence-status-2">
                                        <i className="fas fa-times"></i>
                                      </span>
                                    )
                                  }
                                </TableCell>;
                              })}
                            </TableCell> : ""
                        }
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={students.length}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage={<span>Səhifə üzrə sıra sayı:</span>}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ padding: 0, margin: 0 }}
          />
        </Paper>
      </div>

    </ >
  );
};

export default Absence;
