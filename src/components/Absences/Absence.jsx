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
import "./Absence.css";
const Absence = () => {
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
        <h2>Dəvamiyyət</h2>
      </div>

      <SearchForm onSearch={handleSearch} />
      <div className="absence-select">
      <label htmlFor="absence-select">Qrupu seçin</label>
        <select name="absence-select" id="">
          <option value=""   disabled defaultValue>--Seçin--</option>
          <option value="">FD-32231</option>
          <option value="">FD-32231</option>
          <option value="">FD-32231</option>
        </select>
      </div>
      <div className="section-title pt-3">
        <h2>Cari ay</h2>
      </div>
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
                  <TableCell
                    align="left"
                    sx={[{ py: 1, px: 2 }, { border: "1px solid" }]}
                  >
                    Ad Soyad Ata adi
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={3}
                    sx={[{ py: 1, px: 2 }, { border: "1px solid" }]}
                  >
                    14.05.2021
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={3}
                    sx={[{ py: 1, px: 2 }, { border: "1px solid" }]}
                  >
                    14.05.2021
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={3}
                    sx={[{ py: 1, px: 2 }, { border: "1px solid" }]}
                  >
                    14.05.2021
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={3}
                    sx={[{ py: 1, px: 2 }, { border: "1px solid" }]}
                  >
                    14.05.2021
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={3}
                    sx={[{ py: 1, px: 2 }, { border: "1px solid" }]}
                  >
                    14.05.2021
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={3}
                    sx={[{ py: 1, px: 2 }, { border: "1px solid" }]}
                  >
                    14.05.2021
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
                          <TableCell
                            align="left"
                            colSpan={1}
                            sx={[{ py: 1, px: 2 }, { border: "1px solid" }]}
                          >
                            {employee.name} {employee.last_name}{" "}
                            {employee.father_name}
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={[
                              { py: 1, px: 2 },
                              { border: "1px solid" },
                              {
                                background:
                                  "linear-gradient(to bottom right, transparent 70%, green 25%)",
                              },
                            ]}
                          ></TableCell>

                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={[
                              { py: 1, px: 2 },
                              { border: "1px solid" },
                              {
                                background:
                                  "linear-gradient(to bottom right, transparent 70%, red 50%)",
                              },
                            ]}
                          ></TableCell>

                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={[
                              { py: 1, px: 2 },
                              { border: "1px solid" },
                              {
                                background:
                                  "linear-gradient(to bottom right, transparent 70%, yellow 50%)",
                              },
                            ]}
                          ></TableCell>

                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={[
                              { py: 1, px: 2 },
                              { border: "1px solid" },
                              {
                                background:
                                  "linear-gradient(to bottom right, transparent 70%, yellow 50%)",
                              },
                            ]}
                          ></TableCell>

                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={[
                              { py: 1, px: 2 },
                              { border: "1px solid" },
                              {
                                background:
                                  "linear-gradient(to bottom right, transparent 70%, green 50%)",
                              },
                            ]}
                          ></TableCell>

                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={[
                              { py: 1, px: 2 },
                              { border: "1px solid" },
                              {
                                background:
                                  "linear-gradient(to bottom right, transparent 70%, red 50%)",
                              },
                            ]}
                          ></TableCell>
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
      <div className="section-title pt-3">
        <h2>Ötən ay</h2>
      </div>
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
                  <TableCell
                    align="left"
                    sx={[{ py: 1, px: 2 }, { border: "1px solid" }]}
                  >
                    Ad Soyad Ata adi
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={3}
                    sx={[{ py: 1, px: 2 }, { border: "1px solid" }]}
                  >
                    14.05.2021
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={3}
                    sx={[{ py: 1, px: 2 }, { border: "1px solid" }]}
                  >
                    14.05.2021
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={3}
                    sx={[{ py: 1, px: 2 }, { border: "1px solid" }]}
                  >
                    14.05.2021
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={3}
                    sx={[{ py: 1, px: 2 }, { border: "1px solid" }]}
                  >
                    14.05.2021
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={3}
                    sx={[{ py: 1, px: 2 }, { border: "1px solid" }]}
                  >
                    14.05.2021
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={3}
                    sx={[{ py: 1, px: 2 }, { border: "1px solid" }]}
                  >
                    14.05.2021
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
                          <TableCell
                            align="left"
                            colSpan={1}
                            sx={[{ py: 1, px: 2 }, { border: "1px solid" }]}
                          >
                            {employee.name} {employee.last_name}{" "}
                            {employee.father_name}
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={[
                              { py: 1, px: 2 },
                              { border: "1px solid" },
                              {
                                background:
                                  "linear-gradient(to bottom right, transparent 70%, green 25%)",
                              },
                            ]}
                          ></TableCell>

                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={[
                              { py: 1, px: 2 },
                              { border: "1px solid" },
                              {
                                background:
                                  "linear-gradient(to bottom right, transparent 70%, red 50%)",
                              },
                            ]}
                          ></TableCell>

                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={[
                              { py: 1, px: 2 },
                              { border: "1px solid" },
                              {
                                background:
                                  "linear-gradient(to bottom right, transparent 70%, yellow 50%)",
                              },
                            ]}
                          ></TableCell>

                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={[
                              { py: 1, px: 2 },
                              { border: "1px solid" },
                              {
                                background:
                                  "linear-gradient(to bottom right, transparent 70%, yellow 50%)",
                              },
                            ]}
                          ></TableCell>

                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={[
                              { py: 1, px: 2 },
                              { border: "1px solid" },
                              {
                                background:
                                  "linear-gradient(to bottom right, transparent 70%, green 50%)",
                              },
                            ]}
                          ></TableCell>

                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={[
                              { py: 1, px: 2 },
                              { border: "1px solid" },
                              {
                                background:
                                  "linear-gradient(to bottom right, transparent 70%, red 50%)",
                              },
                            ]}
                          ></TableCell>
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

export default Absence;
