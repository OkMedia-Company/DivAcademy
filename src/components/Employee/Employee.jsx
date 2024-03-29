import { React, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SearchForm from "../tools/SearchForm";
import { CiEdit } from "react-icons/ci";
import { Skeleton } from "@mui/material";
import axios from "axios";
import { NavLink } from "react-router-dom";
import useDocumentTitle from "../tools/useDocumentTitle";
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
  const token = localStorage.getItem("token");
  useEffect(() => {
    let data = "";
    let config = {
      method: "get",
      url: "https://div.globalsoft.az/api/employees",
      headers: {
        Authorization: `Bearer ${token}`,
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
  const duration = (end) => {
    const now = new Date();
    const endDate = new Date(end);
    console.log(endDate)
    const diff = now.getTime() - endDate;
    const year = 1000 * 60 * 60 * 24 * 365;
    console.log(endDate);
    const years = (diff / year);
    if (years.toFixed(1) == 1.0) {
      return `1 il`;
    } else {
      return `${years.toFixed(1)} il`;
    }
  };
  useDocumentTitle("Əmakdaşlar");
  return (
    <div>
      <div className="section-title">
        <h2>Əmakdaşlar</h2>
      </div>
      <SearchForm onSearch={handleSearch} />
      <div className="filter-add-main">
        <NavLink to="/addemployee" className="filter-add teacher-add-link">
          Əmakdaş əlavə et
        </NavLink>
      </div>
      <div className="students-content pt-3">
        <Paper sx={{ width: "100%", overflow: "auto", boxShadow: "none" }}>
          <TableContainer sx={{ maxHeight: 500, whiteSpace: "nowrap" }}>
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={{ padding: "20px 0 20px 0" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Şəkil
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Ad Soyad
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Vəzifə
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Müddət
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Telefon
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Doğum tarixi
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
                          {employee.name} {employee.last_name}
                        </TableCell>
                        <TableCell
                          align="left"
                          colSpan={3}
                          sx={{ py: 1, px: 2 }}
                        >
                          {employee.position}
                        </TableCell>

                        <TableCell
                          align="left"
                          colSpan={3}
                          sx={{ py: 1, px: 2 }}
                        >
                          {
                            duration(employee.registration_day)
                          }
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
                          {employee.birthday}
                        </TableCell>


                        <TableCell
                          align="left"
                          colSpan={3}
                          sx={{ py: 1, px: 2 }}
                        >
                          <div className="table-btn-edit">
                            <button>
                              <NavLink to={`/employee/${employee.id}`}>
                                Maaş tarixçəsi
                              </NavLink>
                            </button>
                          </div>
                        </TableCell>
                        <TableCell
                          align="left"
                          colSpan={3}
                          sx={{ py: 1, px: 2 }}
                        >
                          <div className="table-btn-edit">
                            <button>
                              <NavLink to={`/employee/${employee.id}`}>
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
