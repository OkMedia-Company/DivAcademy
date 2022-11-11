import { React, useState } from "react";
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
import { student } from "./graduatesdata";
import SearchForm from "../tools/SearchForm";
import { CiEdit } from "react-icons/ci";
import "./Graduates.css";
const Graduates = () => {
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
   <h2>Məzunlar</h2>
   </div>
    <SearchForm/>
      <div className="students-content pt-5" >
        <Paper sx={{ width: "100%", overflow: "auto" ,boxShadow:"none"}}>
          <TableContainer sx={{ maxHeight: 500 ,whiteSpace:"nowrap"}}>
            <Table stickyHeader aria-label="sticky table" sx={{padding:"20px 20px 20px 0"}}>
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                    Şəkil
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                    Ad Soyad Ata adi
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                    Doğum tarixi
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                    Cinsi
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                    Universiteti
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                    Qəbul balı
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                    Telefonu
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                    Email
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                    Qeydiyyat günü
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                    Referans
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                    Kurs
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                    Qrup
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                    Dərs qrafiki
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                    Status
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                    Harada işləyir
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                    Diplom vıziyyəti
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                    Diplom seriyası
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                    Növbəti ödəniş
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                    Məzun günü
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}></TableCell>
            
                </TableRow>
              </TableHead>
              <TableBody>
                {student
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student) => (
                    <TableRow key={student.id} hover>
                      <TableCell sx={{py:1,px:2 }}>
                        <Avatar src={Image} alt={student.nameSur} sx={{ width: 30, height: 30 }}/>
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.nameSur}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.birthdate}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.sex}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.university}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.qebulBal}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.phone}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.email}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.startdate}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.referans}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                      <div className="table-course">
                      {student.kurs}
                      </div>
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.group}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.dersGrafiki}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.status}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.workingPlace}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.diplomVeziyyeti}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.diplomSeries}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.enddate}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.odenisTarixi}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        <div className="table-btn-edit">
                   
                          <button>      <CiEdit/> Edit</button>
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
            count={student.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
};

export default Graduates;
