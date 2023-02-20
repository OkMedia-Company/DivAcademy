import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchForm from "../tools/SearchForm";
import { NavLink } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
function TransactionType() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [transactions, settransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [transactionCategories, setTransactionCategories] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("https://div.globalsoft.az/api/transaction_categories", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setTransactionCategories(res.data.transaction_categories);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="section-title">
        <h2>Gəlir və xərc tipləri</h2>
      </div>
      <SearchForm onSearch={handleChange} />
      <div className="filter-add-main">
        <NavLink to="/addtransactionform" className="filter-add teacher-add-link">
          Gəlir və xərc tipi əlavə et
        </NavLink>
      </div>
      <div className="transactions-content pt-3">
        <Paper sx={{ width: "100%", overflow: "auto", boxShadow: "none" }}>
          <TableContainer sx={{ maxHeight: 500, padding: "0 13px" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Maliyyə kateqoriyası adı
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Başlıq
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={3}
                    sx={{ py: 1, px: 2 }}
                  ></TableCell>
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
                  : transactionCategories
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((transaction) => (
                        <TableRow key={transaction.id} hover>
                         
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {transaction.name} 
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {transaction.title}
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            <div className="table-btn-edit">
                              <button>
                                <NavLink to={`/transactions/${transaction.id}`}>
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
            count={transactions.length}
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
}

export default TransactionType;
