import { React, useEffect, useState } from "react";
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
import Skeleton from "@mui/material/Skeleton";
import { CiEdit } from "react-icons/ci";
import { Link, NavLink, useParams } from "react-router-dom";
import "./Students.css";

import axios from "axios";
const Students = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  let { userId } = useParams();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    axios
      .get("https://div.globalsoft.az/api/students")
      .then((res) => {
        setStudents(res.data.students);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (searchQuery) => {
    const filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setStudents(filteredStudents);
  };
  return (
    <div className="students-page">
      <div className="section-title">
        <h2>Tələbələr</h2>
      </div>
      <SearchForm onSearch={handleSearch} />
      <ul className="filter">
        <li>
          <NavLink to="/" className="filter-link active">
            Cari tələbələr
          </NavLink>
        </li>
        <li>
          <NavLink to="/temporary" className="filter-link">
            Müvəqqəti dayandıranlar
          </NavLink>
        </li>
        <li>
          <NavLink to="/one-time" className="filter-link">
            Birdəfəlik dayandıranlar
          </NavLink>
        </li>
        <li>
          <NavLink to="/graduated" className="filter-link">
            Məzunlar
          </NavLink>
        </li>
        <li>
          <NavLink to="/all" className="filter-link">
            Hamısı
          </NavLink>
        </li>

        <li>
          <NavLink to="/addstudentform" className="filter-add">
            Add student
          </NavLink>
        </li>
      </ul>

      <div className="students-content">
        <Paper sx={{ width: "100%", overflow: "auto", boxShadow: "none" }}>
          <TableContainer sx={{ maxHeight: 500, whiteSpace: "nowrap" }}>
            <Table stickyHeader aria-label="sticky table">
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
                    Universiteti
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Qəbul balı
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
                    Referans
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Kurs
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Qrup
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Dərs qrafiki
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Status
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Harada işləyir
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Diplom vıziyyəti
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Diplom seriyası
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Növbəti ödəniş
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Məzun günü
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={3}
                    sx={{ py: 1, px: 2 }}
                  ></TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}>
                    Əməliyyatlar
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
                  : students
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((student) => (
                        <TableRow
                          key={student.id}
                          hover
                          sx={{ whiteSpace: "nowrap" }}
                        >
                          <TableCell
                            stickyHeader
                            aria-label="sticky table"
                            sx={{ py: 1, px: 2 }}
                          >
                            <Avatar
                              src={`https://div.globalsoft.az/${student.image}`}
                              alt={student.name}
                              sx={{ width: 30, height: 30 }}
                            />
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {student.name} {student.last_name}{" "}
                            {student.father_name}
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {student.birthday}
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {student.university}
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {student.university_add_score}
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {student.phone}
                          </TableCell>

                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {student.email}
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {student.registration_day}
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {student.reference}
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            <div className="table-course">
                              {" "}
                              {student.course}
                            </div>
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {student.group}
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {student.lesson_table}
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {student.status}
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {student.workplace}
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {student.is_diploma}
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {student.diploma_sn}
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {student.next_payment_date}
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            {student.graduation_day}
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            <div className="table-btn">
                              <button>Davamiyyət tarixçəsi</button>
                            </div>
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            <div className="table-btn">
                              <button>Ödəniş tarixçəsi</button>
                            </div>
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={3}
                            sx={{ py: 1, px: 2 }}
                          >
                            <div className="table-btn-edit">
                              <button>
                                <Link to={`/students/${student.id}`}>
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

export default Students;
