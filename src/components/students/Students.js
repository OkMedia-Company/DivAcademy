import {React,useState} from "react";
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
import Image from "../../imgs/profile-photo.jpeg";
import "./Students.css";
const Students = () => {
  const students = [
    {
      id:1,
      name: "Kenan",
      surname: "Abaszade",
      status: "Bitirib",
      image: "../../imgs/profile-photo.jpeg",
      age: 21,
      startdate: "2022-02-21",
      enddate: "2022-06-21",
    },
    {
      id:2,
      name: "Kenan",
      surname: "Abaszade",
      status: "Bitirib",
      image: "../../imgs/profile-photo.jpeg",
      age: 21,
      startdate: "2022-02-21",
      enddate: "2022-06-21",
    },
    {
      name: "Kenan",
      surname: "Abaszade",
      status: "Bitirib",
      image: "../../imgs/profile-photo.jpeg",
      age: 21,
      startdate: "2022-02-21",
      enddate: "2022-06-21",
    },
    {
      name: "Kenan",
      surname: "Abaszade",
      status: "Bitirib",
      image: "../../imgs/profile-photo.jpeg",
      age: 21,
      startdate: "2022-02-21",
      enddate: "2022-06-21",
    },
    {
      name: "Kenan",
      surname: "Abaszade",
      status: "Bitirib",
      image: "../../imgs/profile-photo.jpeg",
      age: 21,
      startdate: "2022-02-21",
      enddate: "2022-06-21",
    },
    {
      name: "Kenan",
      surname: "Abaszade",
      status: "Bitirib",
      image: "../../imgs/profile-photo.jpeg",
      age: 21,
      startdate: "2022-02-21",
      enddate: "2022-06-21",
    },
    {
      name: "Kenan",
      surname: "Abaszade",
      status: "Bitirib",
      image: "../../imgs/profile-photo.jpeg",
      age: 21,
      startdate: "2022-02-21",
      enddate: "2022-06-21",
    },
    {
      name: "Kenan",
      surname: "Abaszade",
      status: "Bitirib",
      image: "../../imgs/profile-photo.jpeg",
      age: 21,
      startdate: "2022-02-21",
      enddate: "2022-06-21",
    },
    {
      name: "Kenan",
      surname: "Abaszade",
      status: "Bitirib",
      image: "../../imgs/profile-photo.jpeg",
      age: 21,
      startdate: "2022-02-21",
      enddate: "2022-06-21",
    },
    {
      name: "Kenan",
      surname: "Abaszade",
      status: "Bitirib",
      image: "../../imgs/profile-photo.jpeg",
      age: 21,
      startdate: "2022-02-21",
      enddate: "2022-06-21",
    },
    {
      name: "Kenan",
      surname: "Abaszade",
      status: "Bitirib",
      image: "../../imgs/profile-photo.jpeg",
      age: 21,
      startdate: "2022-02-21",
      enddate: "2022-06-21",
    },
    {
      name: "Kenan",
      surname: "Abaszade",
      status: "Bitirib",
      image: "../../imgs/profile-photo.jpeg",
      age: 21,
      startdate: "2022-02-21",
      enddate: "2022-06-21",
    },
    {
      name: "Kenan",
      surname: "Abaszade",
      status: "Bitirib",
      image: "../../imgs/profile-photo.jpeg",
      age: 21,
      startdate: "2022-02-21",
      enddate: "2022-06-21",
    },
    {
      name: "Kenan",
      surname: "Abaszade",
      status: "Bitirib",
      image: "../../imgs/profile-photo.jpeg",
      age: 21,
      startdate: "2022-02-21",
      enddate: "2022-06-21",
    },
    {
      name: "Kenan",
      surname: "Abaszade",
      status: "Bitirib",
      image: "../../imgs/profile-photo.jpeg",
      age: 21,
      startdate: "2022-02-21",
      enddate: "2022-06-21",
    },
    {
      name: "Kenan",
      surname: "Abaszade",
      status: "Bitirib",
      image: "../../imgs/profile-photo.jpeg",
      age: 21,
      startdate: "2022-02-21",
      enddate: "2022-06-21",
    },
    {
      name: "Kenan",
      surname: "Abaszade",
      status: "Bitirib",
      image: "../../imgs/profile-photo.jpeg",
      age: 21,
      startdate: "2022-02-21",
      enddate: "2022-06-21",
    },
    {
      name: "Kenan",
      surname: "Abaszade",
      status: "Bitirib",
      image: "../../imgs/profile-photo.jpeg",
      age: 21,
      startdate: "2022-02-21",
      enddate: "2022-06-21",
    },
    {
      name: "Kenan",
      surname: "Abaszade",
      status: "Bitirib",
      image: "../../imgs/profile-photo.jpeg",
      age: 21,
      startdate: "2022-02-21",
      enddate: "2022-06-21",
    },
    {
      name: "Kenan",
      surname: "Abaszade",
      status: "Bitirib",
      image: "../../imgs/profile-photo.jpeg",
      age: 21,
      startdate: "2022-02-21",
      enddate: "2022-06-21",
    },
    {
      name: "Kenasdadan",
      surname: "sdfas",
      status: "Bitirib",
      image: "../../imgs/profile-photo.jpeg",
      age: 21,
      startdate: "2022-02-21",
      enddate: "2022-06-21",
    },
  ];

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const handleLimitChange = (event) => {
    setLimit(+event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <div className="students-page">
      <h2 className="section-title">Tələbələr</h2>
      <SearchForm />
      <ul className="filter">
        <li>
          <a href="" className="filter-link active">
            Cari tələbələr
          </a>
        </li>
        <li>
          <a href="" className="filter-link">
            Müvəqqəti dayandıranlar
          </a>
        </li>
        <li>
          <a href="" className="filter-link">
            Birdəfəlik dayandıranlar
          </a>
        </li>
        <li>
          <a href="" className="filter-link">
            Məzunlar
          </a>
        </li>
        <li>
          <a href="" className="filter-link">
            Hamısı
          </a>
        </li>
      </ul>
      <div className="students-content">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Şəkil</TableCell>
                  <TableCell>Ad</TableCell>
                  <TableCell>Soyad</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Yaş</TableCell>
                  <TableCell>Başlama Tarixi</TableCell>
                  <TableCell>Bitmə Tarixi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.slice(0,limit).map((student) => (
                  <TableRow
                  key={student.id}
                  hover
                  >
                    <TableCell>
                      <Avatar src={Image} alt={student.name} />
                    </TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.surname}</TableCell>
                    <TableCell>{student.status}</TableCell>
                    <TableCell>{student.age}</TableCell>
                    <TableCell>{student.startdate}</TableCell>
                    <TableCell>{student.enddate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
          component="div"
          count={students.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      </div>
    </div>
  );
};

export default Students;
