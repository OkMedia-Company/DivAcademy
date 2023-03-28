import React, { useContext, useEffect, useState } from "react";
import SearchForm from "../tools/SearchForm";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import { Button, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import useDocumentTitle from "../tools/useDocumentTitle";
import { AuthContext } from "../context/Contexts";
function Courses() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const courses = useContext(AuthContext).courses.course;
  const loading = useContext(AuthContext);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function calculateTotalPrice(course) {
    const match = course.course_duration.match(/\d+/);
    const months = match ? parseInt(match[0], 10) : 0;
    return course.monthly_price * months;
  }

  useDocumentTitle("Kurslar");
  return (
    <>
      <div className="section-title">
        <h2>Kurslar</h2>
      </div>
      <SearchForm placeHolder="Kurs adına görə axtarış" />
      <div className="courses-content pt-4">
        <div className="filter-add-main">
          <Link to="/addcourse">
            <span className="teacher-add-link">Kurs əlavə et</span>
          </Link>
        </div>
      </div>
      <div className="courses-content pt-5">
        <Paper sx={{ width: "100%", overflow: "auto", boxShadow: "none" }}>
          <TableContainer sx={{ maxHeight: 500, padding: "0" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Kurs adı
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Aylıq ödəniş
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Toplam məbləğ
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Müddəti
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Əməliyyatlar
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading?.loading
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
                  : courses
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((course) => (
                      <TableRow key={course.id} hover>
                        <TableCell sx={{ py: 1, px: 2 }}>
                          {course.name}
                        </TableCell>
                        <TableCell
                          align="left"
                          colSpan={3}
                          sx={{ py: 1, px: 2 }}
                        >
                          {course.monthly_price} AZN
                        </TableCell>
                        <TableCell
                          align="left"
                          colSpan={3}
                          sx={{ py: 1, px: 2 }}
                        >
                          {calculateTotalPrice(course)} AZN
                        </TableCell>
                        <TableCell
                          align="left"
                          colSpan={3}
                          sx={{ py: 1, px: 2 }}
                        >
                          {course.course_duration} ay
                        </TableCell>

                        <TableCell
                          align="left"
                          colSpan={3}
                          sx={{ py: 1, px: 2 }}
                        >
                          <div className="table-btn-edit">
                            <button>
                              <Link to={`/courses/${course.id}`}>
                                <CiEdit /> Edit
                              </Link>
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
            count={courses?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
}

export default Courses;
