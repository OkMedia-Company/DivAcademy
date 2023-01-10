import React, { useState } from "react";
import { birthdays } from "./birthdaydata";
import SearchForm from "../tools/SearchForm";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { CiEdit } from "react-icons/ci";

function Birthdays() {
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
        <h2>Ad Günü Olanlar</h2>
      </div>
      <SearchForm />
      <div className="birthdays-content pt-5">
        <Paper sx={{ width: "100%", overflow: "auto", boxShadow: "none" }}>
          <TableContainer sx={{ maxHeight: 500, padding: "0 13px" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Şəkil
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Ad Soyad
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Doğum tarixi
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Qrup
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Əməliyyatlar
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {birthdays
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((birthday) => (
                    <TableRow key={birthday.id} hover>
                      <TableCell sx={{ py: 1, px: 2 }}>
                        <Avatar
                          src={birthday.studentPicture}
                          alt={birthday.studentName}
                          sx={{ width: 30, height: 30 }}
                        />
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                        {birthday.studentName}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                        {birthday.birthdate}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                        {birthday.group}
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
            count={birthdays.length}
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

export default Birthdays;
