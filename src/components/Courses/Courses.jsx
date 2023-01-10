import React, { useState } from "react";
import { courses } from "./coursesdata";
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

function Courses() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <div className="section-title">
        <h2>Kurslar</h2>
      </div>
      <SearchForm />
      <div className="courses-content pt-5">
        <Paper sx={{ width: "100%", overflow: "auto", boxShadow: "none" }}>
          <TableContainer sx={{ maxHeight: 500, padding: "0 13px" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Kurs adı
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Kurs ödənişi (aylıq)
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Kurs ödənişi (tam)
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
                {courses
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((course) => (
                    <TableRow key={course.id} hover>
                      <TableCell sx={{ py: 1, px: 2 }}>
                        {course.kursAdi}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                        {course.kursOdenisiAyliq}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                        {course.kursTamOdenis}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                        {course.muddeti}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                        <div className="table-btn-edit">
                          <button>
                            <CiEdit /> Edit
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
            count={courses.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}

export default Courses;
