import { React, useState } from "react";
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
import { student } from "./studentdata";
import "./Students.css";
const Students = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

 
  return (
    <div className="students-page">
      <h2 className="section-title">Tələbələr</h2>
      <SearchForm />
      <ul className="filter">
        <li>
          <a href="" className="filter-link active">
            Cari tələbələr
          </a>
        </li>
        <li>
          <a href="" className="filter-link">
            Müvəqqəti dayandıranlar
          </a>
        </li>
        <li>
          <a href="" className="filter-link">
            Birdəfəlik dayandıranlar
          </a>
        </li>
        <li>
          <a href="" className="filter-link">
            Məzunlar
          </a>
        </li>
        <li>
          <a href="" className="filter-link">
            Hamısı
          </a>
        </li>
      </ul>
      <div className="students-content">
        <Paper sx={{ width: "100%", overflow: "auto" }}>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Şəkil
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Ad Soyad Ata adi
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Doğum tarixi
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Cinsi
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Universiteti
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Qəbul balı
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Telefonu
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Email
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Qeydiyyat günü
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Referans
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Kurs
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Qrup
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Dərs qrafiki
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Status
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Harada işləyir
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Diplom vıziyyəti
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Diplom seriyası
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                   Növbəti ödəniş
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Məzun günü 
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                 
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                  
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                   
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
               
           
                {   
                  student
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student) => (
                    <TableRow key={student.id} hover>
                      <TableCell>
                        <Avatar src={Image} alt={student.nameSur} />
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.nameSur}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.birthdate}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.sex}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.university}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.qebulBal}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.phone}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.email}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.startdate}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.referans}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.kurs}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.group}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.dersGrafiki}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.status}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.workingPlace}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.diplomVeziyyeti}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.diplomSeries}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.enddate}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                        {student.odenisTarixi}
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                         <Button variant="outlined" color="success">Davamiyyət Tarixçəsi</Button>
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                         <Button variant="contained" color="error">Ödəniş Tarixçəsi</Button>
                      </TableCell>
                      <TableCell align="center" colSpan={3}>
                         <Button variant="contained">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
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

export default Students;
