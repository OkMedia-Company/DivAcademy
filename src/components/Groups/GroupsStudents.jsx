import React, { useState, useEffect, useMemo } from "react";
import SearchForm from "../tools/SearchForm";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import { Skeleton } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import useDocumentTitle from "../../components/tools/useDocumentTitle";
function GroupStudents() {
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
    const groupId = useParams().groupId
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: null,
    });
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const token = localStorage.getItem("token");
    useEffect(() => {
        axios
            .get(`https://div.globalsoft.az/api/group_students`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                setStudents(response.data.groupstudents.filter(student => student.group_id == groupId));
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [token]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const handleSortClick = (key) => {
        let direction = "ascending";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "ascending"
        ) {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    const sortedstudents = useMemo(() => {
        let sortedstudents = [...students];
        if (sortConfig !== null) {
            sortedstudents.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortedstudents;
    }, [students, sortConfig]);

    useDocumentTitle("Mentorlar");
    return (
        <>
            <div className="section-title">
                <h2> {students.length > 0 && students[0].group_name}</h2>
            </div>
            <SearchForm onSearch={handleChange} />
            <div className="teachers-content pt-5">
                <Paper sx={{ width: "100%", overflow: "auto", boxShadow: "none" }}>
                    <TableContainer sx={{ maxHeight: 500, padding: "0" }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}
                                        onClick={() => handleSortClick("name")}
                                    >
                                        Ad Soyad
                                    </TableCell>
                                    <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}
                                        onClick={() => handleSortClick("phone")}>
                                        Telefonu
                                    </TableCell>
                                    <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                                        Cari qruplari
                                    </TableCell>

                                    <TableCell
                                        align="left"
                                        colSpan={3}
                                        sx={{ py: 1, px: 2 }}
                                    ></TableCell>
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
                                    : sortedstudents
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map((student) => (
                                            <TableRow key={student.id} hover>
                                                <TableCell
                                                    align="left"
                                                    colSpan={3}
                                                    sx={{ py: 1, px: 2 }}
                                                >
                                                    {student.student_name} {student.last_name}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    colSpan={3}
                                                    sx={{ py: 1, px: 2 }}
                                                >
                                                    {student.phone}
                                                </TableCell>

                                                <TableCell
                                                    align="left"
                                                    colSpan={3}
                                                    sx={{ py: 1, px: 2 }}
                                                >
                                                    {student.group_name}
                                                </TableCell>

                                                <TableCell
                                                    align="left"
                                                    colSpan={3}
                                                    sx={{ py: 1, px: 2 }}
                                                >
                                                    <div className="table-btn-edit">
                                                        <button>
                                                            <NavLink to={`/students/${student.id}`}>
                                                                <CiEdit /> Edit
                                                            </NavLink>
                                                        </button>
                                                    </div>
                                                </TableCell>
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
        </>
    );
}

export default GroupStudents;
