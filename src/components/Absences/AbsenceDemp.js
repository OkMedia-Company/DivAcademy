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
    const [lessonDays, setLessonDays] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState("");
    const [groupStudents, setGroupStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
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


    const studentsAll = useContext(AuthContext)?.students.students

    useEffect(() => {
        axios.get(`https://div.globalsoft.az/api/group_students`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                setGroupStudents(response.data.groupstudents);
            }).catch(error => {
                setError(error.response.data.message);
            });
    }, []);
    const groups = useContext(AuthContext)?.groups.groups
    const options = groups.map((group) => ({
        value: group.id,
        label: group.group_code,
    }));
    const handleSelectChange = (name) => (value) => {
        if (name === "groups") {
            // const groupStudents
            // console.log(groupStudents)
            // setStudents(groupStudents);
        }
    };
    const filteredByDatesLessonDays = lessonDays.filter((lesson_day) => {
        return dates.includes(lesson_day.date);
    });


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
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Ad Soyad</TableCell>
                                    {
                                        dates.map((dates) => (
                                            <TableCell align="center">
                                                <span className="date-absences">{dates}</span>
                                            </TableCell>
                                        ))
                                    }
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
                                    : lessonDays
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map((students) => (
                                            <TableRow key={students.id} hover>
                                                <TableCell align="left">
                                                    {
                                                        studentsAll.find((student) => student.id === students.student_id)?.name
                                                    }
                                                </TableCell>
                                                {lessonDays.filter((student) => student.date === dates.forEach((date) => date)
                                                ).map((student) => (
                                                    student.type === "10" ? (
                                                        <TableCell align="center">
                                                            <div className="absence-status-good">
                                                            </div>
                                                        </TableCell>
                                                    ) : student.type === "2" ? (
                                                        <TableCell align="center">
                                                            <div className="absence-status-bad"></div>
                                                        </TableCell>
                                                    )
                                                        : student.type === "3" ? (
                                                            <TableCell align="center">
                                                                <div className="absence-status-normal"></div>
                                                            </TableCell>
                                                        ) : ""
                                                ))}

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
                        count={lessonDays.length}
                        rowsPerPage={rowsPerPage}
                        labelRowsPerPage={<span>Səhifə üzrə sıra sayı:</span>}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{ padding: 0, margin: 0 }}
                    />
                </Paper>
            </div>
        </>
    );
};

export default Absence;




