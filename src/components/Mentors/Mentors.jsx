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
import { NavLink } from "react-router-dom";
import useDocumentTitle from "../../components/tools/useDocumentTitle";
function Mentors() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
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
      .get(`https://div.globalsoft.az/api/teachers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setTeachers(response.data.teachers);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const results = teachers.filter((teacher) =>
      teacher.name.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [teachers, searchTerm]);
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

  const sortedTeachers = useMemo(() => {
    let sortedTeachers = [...teachers];
    if (sortConfig !== null) {
      sortedTeachers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedTeachers;
  }, [teachers, sortConfig]);

  useDocumentTitle("Mentorlar");
  return (
    <div>
      <div className="section-title">
        <h2>Mentorlar</h2>
      </div>
      <SearchForm onSearch={handleChange} />
      <div className="filter-add-main">
        <NavLink to="/addmentorform" className="filter-add teacher-add-link">
          Mentor əlavə et
        </NavLink>
      </div>
      <div className="teachers-content pt-3">
        <Paper sx={{ width: "100%", overflow: "auto", boxShadow: "none" }}>
          <TableContainer sx={{ maxHeight: 500, padding: "0 13px" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Şəkil
                  </TableCell>
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
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Növbəti maaş günü
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={3}
                    sx={{ py: 1, px: 2 }}
                  ></TableCell>
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
                  : sortedTeachers
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((teacher) => (
                      <TableRow key={teacher.id} hover>
                        <TableCell sx={{ py: 1, px: 2 }}>
                          <Avatar
                            src={`https://div.globalsoft.az/${teacher.image}`}
                            alt={teacher.name}
                            sx={{ width: 30, height: 30 }}
                          />
                        </TableCell>
                        <TableCell
                          align="left"
                          colSpan={3}
                          sx={{ py: 1, px: 2 }}
                        >
                          {teacher.name} {teacher.last_name}
                        </TableCell>
                        <TableCell
                          align="left"
                          colSpan={3}
                          sx={{ py: 1, px: 2 }}
                        >
                          {teacher.phone}
                        </TableCell>

                        <TableCell
                          align="left"
                          colSpan={3}
                          sx={{ py: 1, px: 2 }}
                        >
                          {teacher.current_groups}
                        </TableCell>
                        <TableCell
                          align="left"
                          colSpan={3}
                          sx={{ py: 1, px: 2 }}
                        >
                          {teacher.current_groups}
                        </TableCell>
                        <TableCell
                          align="left"
                          colSpan={3}
                          sx={{ py: 1, px: 2 }}
                        >
                          <div className="table-btn">
                            <button> Maaş tarixçəsi</button>
                          </div>
                        </TableCell>
                        <TableCell
                          align="left"
                          colSpan={3}
                          sx={{ py: 1, px: 2 }}
                        >
                          <div className="table-btn-edit">
                            <button>
                              <NavLink to={`/teachers/${teacher.id}`}>
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
            count={teachers.length}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage={<span>Səhifə üzrə sıra sayı:</span>}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ padding: 0, margin: 0 }}
          />
        </Paper>
      </div>
    </div>
  );
}

export default Mentors;
