import { React, useEffect, useMemo, useReducer, useState } from "react";
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
import { Link, NavLink } from "react-router-dom";
import "./Students.css";
import { AiOutlineCheckCircle } from "react-icons/ai";
import axios from "axios";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import useDocumentTitle from "../tools/useDocumentTitle";
import { FcCancel } from "react-icons/fc";
const Students = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortingArrow, setSortingArrow] = useState(true)
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://div.globalsoft.az/api/students", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "Allow-Control-Allow-Origin": "*",
        },
      })
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
    /* Search students by name, surname or phone number */
    const filteredStudents = students.filter((student) => {
      return (
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.phone.includes(searchQuery)
      );
    });
    if (filteredStudents.length === 0) {
      setStudents(students)
    }
    setStudents(filteredStudents);
  };
  const handleSortClick = (key) => {
    if (sortConfig.key === key) {
      setSortingArrow(!sortingArrow)
    }
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    setStudents(sortedStudents)
  };
  const sortedStudents = useMemo(() => {
    let sortedStudents = [...students];
    if (sortConfig !== null) {
      sortedStudents.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedStudents;
  }, [students, sortConfig]);
  useDocumentTitle("Tələbələr");
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
          <NavLink to="/graduates" className="filter-link">
            Məzunlar
          </NavLink>
        </li>
        <li>
          <NavLink to="/all" className="filter-link">
            Hamısı
          </NavLink>
        </li>

        <li className="student-add-link teacher-add-link">
          <NavLink to="/addstudentform" className="filter-add ">
            Tələbə əlavə et
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
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}
                    onClick={() => handleSortClick("name")}
                    id="name"
                  >
                    Ad Soyad
                    {
                      sortConfig.key === "name" && sortingArrow ? <AiOutlineArrowDown className="sorting-arrow-down" /> : ""
                    }
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}
                    onClick={() => handleSortClick("email")}
                  >
                    Email
                    {
                      sortConfig.key === "email" && sortingArrow ? <AiOutlineArrowDown className="sorting-arrow-down" /> : ""
                    }
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}
                    onClick={() => handleSortClick("phone")}
                  >
                    Telefon
                    {
                      sortConfig.key === "phone" && sortingArrow ? <AiOutlineArrowDown className="sorting-arrow-down" /> : ""
                    }
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}
                    onClick={() => handleSortClick("register_date")}
                  >
                    Qeydiyyat günü
                    {
                      sortConfig.key === "register_date" && sortingArrow ? <AiOutlineArrowDown className="sorting-arrow-down" /> : ""
                    }
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}
                    onClick={() => handleSortClick("status")}
                  >
                    Referans
                    {
                      sortConfig.key === "status" && sortingArrow ? <AiOutlineArrowDown className="sorting-arrow-down" /> : ""
                    }
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}
                    onClick={() => handleSortClick("course")}
                  >
                    Kurs
                    {
                      sortConfig.key === "course" && sortingArrow ? <AiOutlineArrowDown className="sorting-arrow-down" /> : ""
                    }
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}
                    onClick={() => handleSortClick("group_code")}
                  >
                    Qrup kodu
                    {
                      sortConfig.key === "group_code" && sortingArrow ? <AiOutlineArrowDown className="sorting-arrow-down" /> : ""
                    }
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}
                    onClick={() => handleSortClick("group_name")}
                  >
                    Dərs qrafiki

                    {
                      sortConfig.key === "group_name" && sortingArrow ? <AiOutlineArrowDown className="sorting-arrow-down" /> : ""
                    }
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}
                    onClick={() => handleSortClick("university")}
                  >
                    Universiteti
                    {
                      sortConfig.key === "university" && sortingArrow ? <AiOutlineArrowDown className="sorting-arrow-down" /> : ""
                    }
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}
                    onClick={() => handleSortClick("faculty")}
                  >
                    Qəbul balı
                    {
                      sortConfig.key === "faculty" && sortingArrow ? <AiOutlineArrowDown className="sorting-arrow-down" /> : ""
                    }
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}
                    onClick={() => handleSortClick("graduation_date")}
                  >
                    Məzun günü
                    {
                      sortConfig.key === "graduation_date" && sortingArrow ? <AiOutlineArrowDown className="sorting-arrow-down" /> : ""
                    }
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}
                    onClick={() => handleSortClick("workplace")}
                  >
                    İş yeri
                    {
                      sortConfig.key === "workplace" && sortingArrow ? <AiOutlineArrowDown className="sorting-arrow-down" /> : ""
                    }
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}
                    onClick={() => handleSortClick("diploma_status")}
                  >
                    Diplom vəziyyəti
                    {
                      sortConfig.key === "diploma_status" && sortingArrow ? <AiOutlineArrowDown className="sorting-arrow-down" /> : ""
                    }
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}
                    onClick={() => handleSortClick("diploma_series")}
                  >
                    Diplom seriyası
                    {
                      sortConfig.key === "diploma_series" && sortingArrow ? <AiOutlineArrowDown className="sorting-arrow-down" /> : ""
                    }
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}
                    onClick={() => handleSortClick("next_payment")}
                  >
                    Növbəti ödəniş
                    {
                      sortConfig.key === "next_payment" && sortingArrow ? <AiOutlineArrowDown className="sorting-arrow-down" /> : ""
                    }
                  </TableCell>
                  <TableCell align="left" colSpan={3} sx={{ py: 1, px: 2 }}
                    onClick={() => handleSortClick("birth_date")}
                  >
                    Doğum tarixi
                    {
                      sortConfig.key === "birth_date" && sortingArrow ? <AiOutlineArrowDown className="sorting-arrow-down" /> : ""
                    }
                  </TableCell>
                  <TableCell
                    align="left"
                    colSpan={3}
                    sx={{ py: 1, px: 2 }}
                  ></TableCell>
                  <TableCell
                    align="left"
                    colSpan={3}
                    sx={{ py: 1, px: 2 }}
                  ></TableCell>
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
                        <Link to={`/students/${student.id}`}>
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
                        </Link>

                        <TableCell
                          align="left"
                          colSpan={3}
                          sx={{ py: 1, px: 2 }}
                        >
                          <Link to={`/students/${student.id}`}>
                            {student.name} {student.last_name}
                          </Link>
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
                          {student.phone}
                        </TableCell>
                        <TableCell
                          align="left"
                          colSpan={3}
                          sx={{ py: 1, px: 2 }}
                        >
                          {student.registration_day
                            .split("-")
                            .reverse()
                            .join(".")}
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
                          <div className="table-course">{student.course}</div>
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
                          {student.graduation_day
                            .split("-")
                            .reverse()
                            .join("-")}
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
                          {student.is_diploma == 1 ? (
                            <AiOutlineCheckCircle className="table-icon-diplom" />
                          ) : (
                            <FcCancel className="table-icon-diplom" />
                          )}
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
                          {student.next_payment_date
                            .split("-")
                            .reverse()
                            .join("-")}
                        </TableCell>
                        <TableCell
                          align="left"
                          colSpan={3}
                          sx={{ py: 1, px: 2 }}
                        >
                          {student.birthday.split("-").reverse().join("-")}
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
                                <CiEdit /> Redaktə et
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
