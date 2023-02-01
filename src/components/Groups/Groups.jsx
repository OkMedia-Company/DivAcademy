import React, { useEffect, useState } from "react";
import SearchForm from "../tools/SearchForm";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import { CiEdit } from "react-icons/ci";
import axios from "axios";

import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
function Groups() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const searchForm = (searchTerm) => {
    console.log(searchTerm);
  };
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`https://div.globalsoft.az/api/groups`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setGroups(response.data.groups);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <h2>Qruplar</h2>
      <SearchForm onSearch={searchForm} />
      <div className="d-flex justify-content-start pt-3">
        <Link to="/addgroup" className="me-3 teacher-add-link">
          Yeni qrup əlavə et
        </Link>

        <Link to="/addstudentstogroup" className="teacher-add-link">Qrupa tələbə əlavə et</Link>
      </div>
      <div className="teachers-content pt-5">
        <Paper sx={{ width: "100%", overflow: "auto" }}>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={3}>
                    Qrup Kodu
                  </TableCell>
                  <TableCell align="left" colSpan={3}>
                    Kurs
                  </TableCell>
                  <TableCell align="left" colSpan={3}>
                    Müəllimin adı
                  </TableCell>
                  <TableCell align="left" colSpan={3}>
                    Dərs saatı
                  </TableCell>
                  <TableCell align="left" colSpan={3}>
                    Başlama tarixi
                  </TableCell>
                  <TableCell align="left" colSpan={3}>
                    Bitmə tarixi
                  </TableCell>
                  <TableCell align="left" colSpan={3}>
                    Əməliyyatlar
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
                  : groups
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item) => (
                        <TableRow key={item.id} hover>
                          <TableCell align="left" colSpan={3}>
                            {item.group_code}
                          </TableCell>
                          <TableCell align="left" colSpan={3}>
                            {item.course_name}
                          </TableCell>
                          <TableCell align="left" colSpan={3}>
                            {item.teacher_name}
                          </TableCell>
                          <TableCell align="left" colSpan={3}>
                            {item.lectureDate}
                          </TableCell>
                          <TableCell align="left" colSpan={3}>
                            {item.start_date}
                          </TableCell>
                          <TableCell align="left" colSpan={3}>
                            {item.end_date}
                          </TableCell>

                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            <div className="table-btn-edit">
                              <button>
                                <Link to={`/groups/${item.id}`}>
                                  <CiEdit /> Edit
                                </Link>
                              </button>
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
            count={groups.length}
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

export default Groups;
