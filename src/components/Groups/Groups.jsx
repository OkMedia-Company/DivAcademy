import React, { useEffect, useState } from "react";
import { groups } from "./groupsdata";
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

function Groups() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  useEffect(() => {
    axios
      .get(`https://div.globalsoft.az/api/groups`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <h2>Qruplar</h2>
      <SearchForm onSearch={searchForm} />
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
                    Ödəniş günü
                  </TableCell>
                  <TableCell align="left" colSpan={3}>
                    Dərs günü
                  </TableCell>
                  <TableCell align="left" colSpan={3}>
                    Dərs saatı
                  </TableCell>
                  <TableCell align="left" colSpan={3}>
                    Başlana tarixi
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
                {groups
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell align="left" colSpan={3}>
                        {item.qrupKodu}
                      </TableCell>
                      <TableCell align="left" colSpan={3}>
                        {item.course}
                      </TableCell>
                      <TableCell align="left" colSpan={3}>
                        {item.payDate}
                      </TableCell>
                      <TableCell align="left" colSpan={3}>
                        {item.lectureDate}
                      </TableCell>
                      <TableCell align="left" colSpan={3}>
                        {item.lectureHour}
                      </TableCell>
                      <TableCell align="left" colSpan={3}>
                        {item.startDate}
                      </TableCell>
                      <TableCell align="left" colSpan={3}>
                        {item.endDate}
                      </TableCell>
                      <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                        <div className="table-btn-edit">
                          <button>
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
