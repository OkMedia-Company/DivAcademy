import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { birthdays } from "./birthdaydata";
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
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Birthdays() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [birthdayToday, setBirthdayToday] = useState([]);
  const [birthdayMonth, setBirthdayMonth] = useState([]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    async function fetchData() {
      const res1 = await axios.get(
        "https://div.globalsoft.az/api/birthdaytoday"
      );
      const res2 = await axios.get(
        "https://div.globalsoft.az/api/birthdaymonth"
      );
      setBirthdayToday(res1.data.birthdaytoday);
      setBirthdayMonth(res2.data.birthdaymonth);
    }
    fetchData();
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div>
          <div className="section-title">
            <h2>Bu Gün Ad günü Olanlar</h2>
          </div>
          <SearchForm />
          <div className="birthdays-content pt-5">
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
                        Əməliyyatlar
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {birthdayToday
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
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={birthdayToday.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          <div className="section-title">
            <h2>Bu Ay Ad günü Olanlar</h2>
          </div>
          <SearchForm />
          <div className="birthdays-content pt-5">
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
                        Əməliyyatlar
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {birthdayMonth
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
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={birthdayMonth.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      </TabPanel>
    </Box>
  );
}
