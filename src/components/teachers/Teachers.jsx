import React, { useState } from "react";
import { teachers } from "./teachersdata";
import SearchForm from "../tools/SearchForm";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import Image from "../../imgs/profile-photo.jpeg";
function Teachers() {
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
    <h2>Müəllimlər</h2>
    <SearchForm/>
      <div className="teachers-content pt-5">
        <Paper sx={{ width: "100%", overflow: "auto" }}>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Şəkil
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Ad Soyad
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                     Telefonu
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                     Emaili
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                     Qeydiyyat tarixi
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                     Cari qruplari
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
              
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
              
                  </TableCell>
 
                </TableRow>
              </TableHead>
              <TableBody>
                {teachers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage )
                  .map((student) => (
                    <TableRow key={student.id} hover>
                      <TableCell>
                        <Avatar src={Image} alt={student.nameSur} />
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.nameSur}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.phone}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.email}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.qeydiyyatTarixi}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.cariGroups}
                      </TableCell>
                      
                      <TableCell align="center" colSpan={3}>
                        <Button variant="outlined" color="success">
                          Maaş Tarixçəsi
                        </Button>
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        <Button variant="contained" color="error">
                         Edit
                        </Button>
                      </TableCell>
                   
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 30, 100]}
            component="div"
            count={teachers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}

export default Teachers;
