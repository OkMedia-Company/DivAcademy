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
import { CiEdit } from "react-icons/ci";
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
    <div className="section-title">
    <h2>Müəllimlər</h2>
    </div>
    <SearchForm/>
      <div className="teachers-content pt-5">
        <Paper sx={{ width: "100%", overflow: "auto" ,boxShadow:"none"}} >
          <TableContainer sx={{ maxHeight: 500 ,padding:'0 13px'}}>
            <Table stickyHeader aria-label="sticky table" >
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                    Şəkil
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                    Ad Soyad
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                     Telefonu
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                     Emaili
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                     Qeydiyyat tarixi
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                     Cari qruplari
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
              
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
              
                  </TableCell>
 
                </TableRow>
              </TableHead>
              <TableBody>
                {teachers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage )
                  .map((student) => (
                    <TableRow key={student.id} hover> 
                      <TableCell sx={{py:1,px:2 }} >
                        <Avatar src={Image} alt={student.nameSur}  sx={{ width: 30, height: 30 }} />
                      </TableCell>
                      <TableCell align="left" colSpan={3}  sx={{py:1,px:2 }}>
                        {student.nameSur}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.phone}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.email}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.qeydiyyatTarixi}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.cariGroups}
                      </TableCell>
                      
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        <div className="table-btn">
                        <button> Maaş tarixçəsi</button>  
                        </div>
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                      <div className="table-btn-edit">
                      <button> <CiEdit/> Edit</button>  
                      </div>
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
