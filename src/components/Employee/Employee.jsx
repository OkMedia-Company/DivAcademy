// import React, { useState, useEffect } from "react";
// import SearchForm from "../tools/SearchForm";
// import Avatar from "@mui/material/Avatar";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import { Skeleton } from "@mui/material";
// import TableRow from "@mui/material/TableRow";
// import { CiEdit } from "react-icons/ci";
// import axios from "axios";

// function Employees() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [employees, setEmployees] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let data = "";
//     let config = {
//       method: "get",
//       url: "https://div.globalsoft.az/api/employees",
//       headers: {
//         Accept: "application/json",
//       },
//       data: data,
//     };

//     axios(config)
//       .then(function (response) {
//         setLoading(false);
//         setEmployees(response.data.employess);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }, []);

//   useEffect(() => {
//     const results = employees.filter((employee) =>
//       employee.name.toLowerCase().includes(searchTerm)
//     );
//     setSearchResults(results);
//   }, [searchTerm]);

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
//   return (
//     <div>
//       <div className="section-title">
//         <h2>İşçilər</h2>
//       </div>
//       <div className="employees-content pt-5">
//         <Paper sx={{ width: "100%", overflow: "auto", boxShadow: "none" }}>
//           <TableContainer sx={{ maxHeight: 500, padding: "0 13px" }}>
//             <Table stickyHeader aria-label="sticky table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
//                     Şəkil
//                   </TableCell>
//                   <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
//                     Ad Soyad
//                   </TableCell>
//                   <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
//                     Telefonu
//                   </TableCell>
//                   <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
//                     Emaili
//                   </TableCell>
//                   <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
//                     Qeydiyyat tarixi
//                   </TableCell>
//                   <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
//                     Vəzifəsi
//                   </TableCell>
//                   <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
//                     Maaşı
//                   </TableCell>
//                   <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
//                     Əməliyyatlar
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading
//                   ? Array.from({ length: rowsPerPage }, (_, i) => (
//                       <TableRow key={i}>
//                         <TableCell>
//                           <Skeleton variant="rounded" width={40} height={40} />
//                         </TableCell>
//                         <TableCell>
//                           <Skeleton variant="text" width={150} />
//                         </TableCell>
//                         <TableCell>
//                           <Skeleton variant="text" width={150} />
//                         </TableCell>
//                         <TableCell>
//                           <Skeleton variant="text" width={150} />
//                         </TableCell>
//                         <TableCell>
//                           <Skeleton variant="text" width={150} />
//                         </TableCell>
//                         <TableCell>
//                           <Skeleton variant="text" width={150} />
//                         </TableCell>
//                         <TableCell>
//                           <Skeleton variant="text" width={150} />
//                         </TableCell>
//                         <TableCell>
//                           <Skeleton variant="text" width={150} />
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   : searchResults
//                       .slice(
//                         page * rowsPerPage,
//                         page * rowsPerPage + rowsPerPage
//                       )
//                       .map((employee) => (
//                         <TableRow key={employee.id}>
//                           <TableCell align="left" sx={{ py: 1, px: 2 }}>
//                             <Avatar src={employee.image} />
//                           </TableCell>
//                           <TableCell align="left" sx={{ py: 1, px: 2 }}>
//                             {employee.name} {employee.last_name}
//                           </TableCell>
//                           <TableCell align="left" sx={{ py: 1, px: 2 }}>
//                             {employee.phone}
//                           </TableCell>
//                           <TableCell align="left" sx={{ py: 1, px: 2 }}>
//                             {employee.email}
//                           </TableCell>
//                           <TableCell align="left" sx={{ py: 1, px: 2 }}>
//                             {employee.registration_day}
//                           </TableCell>
//                           <TableCell align="left" sx={{ py: 1, px: 2 }}>
//                             {employee.position}
//                           </TableCell>
//                           <TableCell align="left" sx={{ py: 1, px: 2 }}>
//                             {employee.salary}
//                           </TableCell>
//                           <TableCell align="left" sx={{ py: 1, px: 2 }}>
//                             <CiEdit />
//                           </TableCell>
//                         </TableRow>
//                       ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[10, 25, 50]}
//             component="div"
//             count={searchResults.length}
//             onPageChange={handleChangePage}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//       </div>
//     </div>
//   );
// }

// export default Employees;

import { React, useEffect, useState } from "react";
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
import SearchForm from "../tools/SearchForm";
import { CiEdit } from "react-icons/ci";
import { Skeleton } from "@mui/material";
import axios from "axios";
const Employee = () => {
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    let data = "";
    let config = {
      method: "get",
      url: "https://div.globalsoft.az/api/employees",
      headers: {
        Accept: "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        setStudents(response.data.employess);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const handleSearch = (searchQuery) => {
    const filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setStudents(filteredStudents);
  };

  return (
    <div>
      <div className="section-title">
        <h2>Məzunlar</h2>
      </div>
      <SearchForm onSearch={handleSearch} />
      <div className="students-content pt-3">
        <Paper sx={{ width: "100%", overflow: "auto", boxShadow: "none" }}>
          <TableContainer sx={{ maxHeight: 500, whiteSpace: "nowrap" }}>
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={{ padding: "20px 20px 20px 0" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Şəkil
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Ad Soyad Ata adi
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Doğum tarixi
                  </TableCell>

                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Telefonu
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Email
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Qeydiyyat günü
                  </TableCell>

                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Status
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Maaş
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Əmaliyyatlar
                  </TableCell>
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
                  : students
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((employee) => (
                        <TableRow key={employee.id} hover>
                          <TableCell sx={{ py: 1, px: 2 }}>
                            <Avatar
                              src={`https://div.globalsoft.az/${employee.image}`}
                              alt={employee.name}
                              sx={{ width: 30, height: 30 }}
                            />
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {employee.name} {employee.last_name}{" "}
                            {employee.father_name}
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {employee.birthday}
                          </TableCell>

                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {employee.phone}
                          </TableCell>

                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {employee.email}
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {employee.registration_day}
                          </TableCell>

                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            <div className="table-course">
                              {employee.status}
                            </div>
                          </TableCell>

                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {employee.salary}
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            <div className="table-btn-edit">
                              <button>
                                {" "}
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
    </div>
  );
};

export default Employee;
