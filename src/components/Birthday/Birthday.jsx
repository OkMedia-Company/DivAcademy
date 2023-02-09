import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { Skeleton } from "@mui/material";
import useDocumentTitle from "../tools/useDocumentTitle";

function Birthdays() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [birthdayToday, setBirthdayToday] = useState([]);
  const [birthdayMonth, setBirthdayMonth] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleSearchForm = (event) => {
    console.log(event.target.value);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function fetchData() {
      const res1 = await axios.get(
        "https://div.globalsoft.az/api/birthdaytoday",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const res2 = await axios.get(
        "https://div.globalsoft.az/api/birthdaymonth",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setBirthdayToday(res1.data.birthdaytoday);
      setBirthdayMonth(res2.data.birthdaymonth);
      setLoading(false);
    }
    fetchData();
  }, []);
  useDocumentTitle("Ad günləri");
  return (
    <>
      <div>
        <div className="section-title">
          <h2>Bu Gün Ad günü Olanlar</h2>
        </div>
        <SearchForm  onSearch={handleSearchForm}/>
        <div className="birthdays-content pt-3">
          <Paper sx={{ width: "100%", overflow: "auto", boxShadow: "none" }}>
            <TableContainer sx={{ maxHeight: 500, padding: "0 13px" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                      Şəkil
                    </TableCell>
                    <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                      Ad Soyad ata adı
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
                  
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading
                    ? Array.from({ length: rowsPerPage }, (_, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <Skeleton
                              variant="rounded"
                              width={40}
                              height={40}
                            />
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
                    : birthdayToday
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((birthday) => (
                          <TableRow key={birthday.id} hover>
                            <TableCell sx={{ py: 1, px: 2 }}>
                              <Avatar
                                src={`https://div.globalsoft.az/${birthday.image}`}
                                alt={birthday.name}
                                sx={{ width: 30, height: 30 }}
                              />
                            </TableCell>
                            <TableCell
                              align="left"
                              colSpan={3}
                              sx={{ py: 1, px: 2 }}
                            >
                              {birthday.name} {birthday.last_name}
                              {birthday.father_name}
                            </TableCell>
                            <TableCell
                              align="left"
                              colSpan={3}
                              sx={{ py: 1, px: 2 }}
                            >
                              {birthday.birthday}
                            </TableCell>
                            <TableCell
                              align="left"
                              colSpan={3}
                              sx={{ py: 1, px: 2 }}
                            >
                              {birthday.phone}
                            </TableCell>
                            <TableCell
                              align="left"
                              colSpan={3}
                              sx={{ py: 1, px: 2 }}
                            >
                              {birthday.email}
                            </TableCell>
                         
                          </TableRow>
                        ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={birthdayMonth.length}
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

      <br />

      <div>
        <div className="section-title">
          <h2>Bu Ay Ad günü Olanlar</h2>
        </div>
        <SearchForm   onSearch={handleSearchForm}/>
        <div className="birthdays-content pt-3">
          <Paper sx={{ width: "100%", overflow: "auto", boxShadow: "none" }}>
            <TableContainer sx={{ maxHeight: 500, padding: "0 13px" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                      Şəkil
                    </TableCell>
                    <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                      Ad Soyad ata adı
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
                 
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading
                    ? Array.from({ length: rowsPerPage }, (_, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <Skeleton
                              variant="rounded"
                              width={40}
                              height={40}
                            />
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
                    : birthdayMonth
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((birthday) => (
                          <TableRow key={birthday.id} hover>
                            <TableCell sx={{ py: 1, px: 2 }}>
                              <Avatar
                                src={`https://div.globalsoft.az/${birthday.image}`}
                                alt={birthday.name}
                                sx={{ width: 30, height: 30 }}
                              />
                            </TableCell>
                            <TableCell
                              align="left"
                              colSpan={3}
                              sx={{ py: 1, px: 2 }}
                            >
                              {birthday.name} {birthday.last_name}{" "}
                              {birthday.father_name}
                            </TableCell>
                            <TableCell
                              align="left"
                              colSpan={3}
                              sx={{ py: 1, px: 2 }}
                            >
                              {birthday.birthday}
                            </TableCell>
                            <TableCell
                              align="left"
                              colSpan={3}
                              sx={{ py: 1, px: 2 }}
                            >
                              {birthday.phone}
                            </TableCell>
                            <TableCell
                              align="left"
                              colSpan={3}
                              sx={{ py: 1, px: 2 }}
                            >
                              {birthday.email}
                            </TableCell>
                        
                          </TableRow>
                        ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={birthdayMonth.length}
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
    </>
  );
}

export default Birthdays;
