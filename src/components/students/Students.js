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
import { CiEdit } from "react-icons/ci";
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
    <div className="section-title">
    
    <h2 >Tələbələr</h2>
    </div>
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
        <Paper sx={{ width: "100%", overflow: "auto" ,boxShadow:"none"}}>
          <TableContainer sx={{ maxHeight: 500 ,whiteSpace:"nowrap"}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead  > 
                <TableRow >
                  <TableCell    align="left" colSpan={3}  sx={{py:1,px:2 }} >
                    Şəkil
                  </TableCell>
                  <TableCell align="left" colSpan={3}  sx={{py:1,px:2 }} >
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
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                 
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                  
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                   
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
               
           
                {   
                  student
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student) => (
                    <TableRow key={student.id} hover sx={{whiteSpace:"nowrap"} }> 
                      <TableCell stickyHeader aria-label="sticky table"  sx={{py:1,px:2 }} >
                        <Avatar src={Image} alt={student.nameSur} sx={{ width: 30, height: 30 }}/>
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                        {student.nameSur}
                      </TableCell>
                      <TableCell align="left" colSpan={3}  sx={{py:1,px:2 }}>
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
                      <div className="table-btn">
                      <button>Davamiyyət tarixçəsi</button>
                    </div>
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{py:1,px:2 }}>
                      <div className="table-btn">
                        <button>Ödəniş tarixçəsi</button>
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
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={student.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage={<span >Səhifə üzrə sıra sayı:</span>}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{padding:0,margin:0}}
          />

          
        </Paper>
      </div>
    </div>
  );
};

export default Students;
