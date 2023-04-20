// import React from 'react'
// import useDocumentTitle from '../tools/useDocumentTitle';
// import { NavLink } from 'react-router-dom';
// import { Button } from '@mui/material';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
// function Classrooms() {

//   const rooms = []

//   useDocumentTitle("Dərs otaqları")
//   return (
//     <>
//       <div className="section-title">
//         <h2>Dərs otaqları</h2>
//       </div>
//       <div className="filter-add-main">
//         <NavLink to="/eventreserve" className="filter-add teacher-add-link">
//           Tədbir üçün rezerv et
//         </NavLink>
//       </div>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 Dərs otağı
//               </TableCell>
//               <TableCell>
//                 2022-12-12
//               </TableCell>
//               <TableCell>
//                 2022-12-12
//               </TableCell>
//               <TableCell>
//                 2022-12-12
//               </TableCell>
//               <TableCell>
//                 2022-12-12
//               </TableCell>
//               <TableCell>
//                 2022-12-12
//               </TableCell>
//               <TableCell>
//                 2022-12-12
//               </TableCell>
//               <TableCell>
//                 2022-12-12
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow>
//               <TableCell component="th" scope="row">
//                 905 Mavi otaq
//               </TableCell>
//               <TableCell component="th" scope="row">
//                 Yoxdu
//               </TableCell>
//               <TableCell component="th" scope="row">
//                 Var
//               </TableCell>
//               <TableCell component="th" scope="row">
//                 Yoxdu
//               </TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell component="th" scope="row">
//                 905 Mavi otaq
//               </TableCell>
//             </TableRow>
//             <TableRow

//             >
//               <TableCell component="th" scope="row">
//                 908 Qırmızı otaq
//               </TableCell>
//             </TableRow>
//             <TableRow

//             >
//               <TableCell component="th" scope="row">
//                 915 Kofeshop otaq
//               </TableCell>
//             </TableRow>

//           </TableBody>
//         </Table>
//       </TableContainer>
//     </ >
//   )
// }

// export default Classrooms



import React from 'react'
import useDocumentTitle from '../tools/useDocumentTitle';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import './Classroom.css'
function Classrooms() {

  const rooms = []
  const classRoomData = [
    {
      "date": "Aprel 2023",
      "schedule": [
        {
          "time": "10:00",
          "teacher": "",
          "class": "",
          "lesson_1": "",
          "lesson_2": ""
        },
        {
          "time": "13:00",
          "teacher": "",
          "class": "",
          "lesson_1": "Vahid",
          "lesson_2": "Vahid"
        },
        {
          "time": "16:00",
          "teacher": "Pervin",
          "class": "",
          "lesson_1": "",
          "lesson_2": ""
        },
        {
          "time": "19:00",
          "teacher": "",
          "class": "Ulfet",
          "lesson_1": "Pervin",
          "lesson_2": "Pervin"
        }
      ]
    },
    {
      "date": "2'ci gün",
      "schedule": [
        {
          "time": "10:00",
          "teacher": "",
          "class": "",
          "lesson_1": "",
          "lesson_2": ""
        },
        {
          "time": "13:00",
          "teacher": "",
          "class": "",
          "lesson_1": "Vahid",
          "lesson_2": "Vahid"
        },
        {
          "time": "16:00",
          "teacher": "Pervin",
          "class": "",
          "lesson_1": "",
          "lesson_2": ""
        },
        {
          "time": "19:00",
          "teacher": "",
          "class": "Ulfet",
          "lesson_1": "Ulfet",
          "lesson_2": "Pervin"
        }
      ]
    },
    {
      "date": "lll",
      "schedule": [
        {
          "time": "10:00",
          "teacher": "",
          "class": "",
          "lesson_1": "",
          "lesson_2": ""
        },
        {
          "time": "13:00",
          "teacher": "",
          "class": "",
          "lesson_1": "Vahid",
          "lesson_2": "Vahid"
        },
        {
          "time": "16:00",
          "teacher": "",
          "class": "",
          "lesson_1": "",
          "lesson_2": ""
        },
        {
          "time": "19:00",
          "teacher": "",
          "class": "",
          "lesson_1": "",
          "lesson_2": ""
        }
      ]
    }
  ]

  useDocumentTitle("Dərs otaqları")
  return (
    <>
      <div className="section-title">
        <h2>Dərs otaqları</h2>
      </div>
      <div className="filter-add-main">
        <NavLink to="/eventreserve" className="filter-add teacher-add-link">
          Tədbir üçün rezerv et
        </NavLink>
      </div>
      <Paper sx={{ width: "100%", overflow: "initial", boxShadow: "none" }}>
        <TableContainer sx={{ maxHeight: 500, padding: "0" }} >
          <Table stickyHeader aria-label="sticky table" className='tg'>
            <TableHead>
              <TableRow>
                <TableCell class="tg-0pky" colspan="3">Aprel 2023</TableCell>
                <TableCell class="tg-0pky">Kofesop</TableCell>
                <TableCell class="tg-0lax">904 Tedbir</TableCell>
                <TableCell class="tg-0lax" colspan="2">Ders 1</TableCell>
                <TableCell class="tg-0lax" colspan="2">Ders 2</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <tr>
                <td class="tg-0pky" rowspan="4">l gün</td>
                <td class="tg-0lax" colspan="2">10:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2"></td>
                <td class="tg-0lax" colspan="2"></td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">13:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2">Vahid</td>
                <td class="tg-0lax" colspan="2">Vahid</td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">16:00</td>
                <td class="tg-0pky">Pervin</td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2"></td>
                <td class="tg-0lax" colspan="2"></td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">19:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax">Ulfet</td>
                <td class="tg-0lax" colspan="2">Pervin</td>
                <td class="tg-0lax" colspan="2">Pervin</td>
              </tr>

            </TableBody>
            <tbody>

              <tr>
                <td class="tg-0pky" rowspan="4">l gün</td>
                <td class="tg-0lax" colspan="2">10:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2"></td>
                <td class="tg-0lax" colspan="2"></td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">13:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2">Vahid</td>
                <td class="tg-0lax" colspan="2">Vahid</td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">16:00</td>
                <td class="tg-0pky">Pervin</td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2"></td>
                <td class="tg-0lax" colspan="2"></td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">19:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax">Ulfet</td>
                <td class="tg-0lax" colspan="2">Pervin</td>
                <td class="tg-0lax" colspan="2">Pervin</td>
              </tr>

            </tbody>
            <tbody>

              <tr>
                <td class="tg-0pky" rowspan="4">ll gün</td>
                <td class="tg-0lax" colspan="2">10:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2"></td>
                <td class="tg-0lax" colspan="2"></td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">13:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2">Vahid</td>
                <td class="tg-0lax" colspan="2">Vahid</td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">16:00</td>
                <td class="tg-0pky">Pervin</td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2"></td>
                <td class="tg-0lax" colspan="2"></td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">19:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax">Ulfet</td>
                <td class="tg-0lax" colspan="2">Pervin</td>
                <td class="tg-0lax" colspan="2">Pervin</td>
              </tr>

            </tbody>
            <tbody>

              <tr>
                <td class="tg-0pky" rowspan="4">lll gün</td>
                <td class="tg-0lax" colspan="2">10:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2"></td>
                <td class="tg-0lax" colspan="2"></td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">13:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2">Vahid</td>
                <td class="tg-0lax" colspan="2">Vahid</td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">16:00</td>
                <td class="tg-0pky">Pervin</td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2"></td>
                <td class="tg-0lax" colspan="2"></td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">19:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax">Ulfet</td>
                <td class="tg-0lax" colspan="2">Pervin</td>
                <td class="tg-0lax" colspan="2">Pervin</td>
              </tr>

            </tbody>
            <tbody>
              <tr>
                <td class="tg-0pky" rowspan="4">lV gün</td>
                <td class="tg-0lax" colspan="2">10:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2"></td>
                <td class="tg-0lax" colspan="2"></td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">13:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2">Vahid</td>
                <td class="tg-0lax" colspan="2">Vahid</td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">16:00</td>
                <td class="tg-0pky">Pervin</td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2"></td>
                <td class="tg-0lax" colspan="2"></td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">19:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax">Ulfet</td>
                <td class="tg-0lax" colspan="2">Pervin</td>
                <td class="tg-0lax" colspan="2">Pervin</td>
              </tr>

            </tbody>
            <tbody>
              <tr>
                <td class="tg-0pky" rowspan="4">V gün</td>
                <td class="tg-0lax" colspan="2">10:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2"></td>
                <td class="tg-0lax" colspan="2"></td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">13:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2">Vahid</td>
                <td class="tg-0lax" colspan="2">Vahid</td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">16:00</td>
                <td class="tg-0pky">Pervin</td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2"></td>
                <td class="tg-0lax" colspan="2"></td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">19:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax">Ulfet</td>
                <td class="tg-0lax" colspan="2">Pervin</td>
                <td class="tg-0lax" colspan="2">Pervin</td>
              </tr>

            </tbody>
            <tbody>

              <tr>
                <td class="tg-0pky" rowspan="4">Vl gün</td>
                <td class="tg-0lax" colspan="2">10:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2"></td>
                <td class="tg-0lax" colspan="2"></td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">13:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2">Vahid</td>
                <td class="tg-0lax" colspan="2">Vahid</td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">16:00</td>
                <td class="tg-0pky">Pervin</td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2"></td>
                <td class="tg-0lax" colspan="2"></td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">19:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax">Ulfet</td>
                <td class="tg-0lax" colspan="2">Pervin</td>
                <td class="tg-0lax" colspan="2">Pervin</td>
              </tr>

            </tbody>
            <tbody>

              <tr>
                <td class="tg-0pky" rowspan="4">Vll gün</td>
                <td class="tg-0lax" colspan="2">10:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2"></td>
                <td class="tg-0lax" colspan="2"></td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">13:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2">Vahid</td>
                <td class="tg-0lax" colspan="2">Vahid</td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">16:00</td>
                <td class="tg-0pky">Pervin</td>
                <td class="tg-0lax"></td>
                <td class="tg-0lax" colspan="2"></td>
                <td class="tg-0lax" colspan="2"></td>
              </tr>
              <tr>
                <td class="tg-0lax" colspan="2">19:00</td>
                <td class="tg-0pky"></td>
                <td class="tg-0lax">Ulfet</td>
                <td class="tg-0lax" colspan="2">Pervin</td>
                <td class="tg-0lax" colspan="2">Pervin</td>
              </tr>

            </tbody>
          </Table >
        </TableContainer >
      </Paper >


    </ >
  )
}

export default Classrooms



/* Demo html

   <table class="tg">
        <tbody>
          <tr>
            <td class="tg-0pky" rowspan="4">2'ci gün</td>
            <td class="tg-0lax" colspan="2">10:00</td>
            <td class="tg-0pky" ></td>
            <td class="tg-0lax" ></td>
            <td class="tg-0lax" ></td>
            <td class="tg-0lax" ></td>
          </tr>
          <tr>
            <td class="tg-0lax" colspan="2">13:00</td>
            <td class="tg-0pky"></td>
            <td class="tg-0lax"></td>
            <td class="tg-0lax" >Vahid</td>
            <td class="tg-0lax" >Vahid</td>
          </tr>
          <tr>
            <td class="tg-0lax" colspan="2">16:00</td>
            <td class="tg-0pky">Pervin</td>
            <td class="tg-0lax"></td>
            <td class="tg-0lax" ></td>
            <td class="tg-0lax" ></td>
          </tr>
          <tr>
            <td class="tg-0lax" colspan="2">19:00</td>
            <td class="tg-0pky"></td>
            <td class="tg-0lax">Ulfet</td>
            <td class="tg-0lax">Ulfet</td>
            <td class="tg-0lax" >Pervin</td>
          </tr>
        </tbody>
      </table>
      <table class="tg">
        <tbody>
          <tr>
            <td class="tg-0pky" rowspan="4">lll</td>
            <td class="tg-0lax" colspan="2">10:00</td>
            <td class="tg-0pky" ></td>
            <td class="tg-0lax" ></td>
            <td class="tg-0lax" ></td>
            <td class="tg-0lax" ></td>
          </tr>
          <tr>
            <td class="tg-0lax" colspan="2">13:00</td>
            <td class="tg-0pky"></td>
            <td class="tg-0lax"></td>
            <td class="tg-0lax" >Vahid</td>
            <td class="tg-0lax" >Vahid</td>
          </tr>
          <tr>
            <td class="tg-0lax" colspan="2">16:00</td>
            <td class="tg-0pky">Pervin</td>
            <td class="tg-0lax"></td>
            <td class="tg-0lax" ></td>
            <td class="tg-0lax" ></td>
          </tr>
          <tr>
            <td class="tg-0lax" colspan="2">19:00</td>
            <td class="tg-0pky"></td>
            <td class="tg-0lax">Ulfet</td>
            <td class="tg-0lax">Ulfet</td>
            <td class="tg-0lax" >Pervin</td>
          </tr>
        </tbody>
      </table>
      <table class="tg">
        <tbody>
          <tr>
            <td class="tg-0pky" rowspan="4">lV</td>
            <td class="tg-0lax" colspan="2">10:00</td>
            <td class="tg-0pky" ></td>
            <td class="tg-0lax" ></td>
            <td class="tg-0lax" ></td>
            <td class="tg-0lax" ></td>
          </tr>
          <tr>
            <td class="tg-0lax" colspan="2">13:00</td>
            <td class="tg-0pky"></td>
            <td class="tg-0lax"></td>
            <td class="tg-0lax" >Vahid</td>
            <td class="tg-0lax" >Vahid</td>
          </tr>
          <tr>
            <td class="tg-0lax" colspan="2">16:00</td>
            <td class="tg-0pky">Pervin</td>
            <td class="tg-0lax"></td>
            <td class="tg-0lax" ></td>
            <td class="tg-0lax" ></td>
          </tr>
          <tr>
            <td class="tg-0lax" colspan="2">19:00</td>
            <td class="tg-0pky"></td>
            <td class="tg-0lax">Ulfet</td>
            <td class="tg-0lax">Ulfet</td>
            <td class="tg-0lax" >Pervin</td>
          </tr>
        </tbody>
      </table>
      <table class="tg">
        <tbody>
          <tr>
            <td class="tg-0pky" rowspan="4">V</td>
            <td class="tg-0lax" colspan="2">10:00</td>
            <td class="tg-0pky" ></td>
            <td class="tg-0lax" ></td>
            <td class="tg-0lax" ></td>
            <td class="tg-0lax" ></td>
          </tr>
          <tr>
            <td class="tg-0lax" colspan="2">13:00</td>
            <td class="tg-0pky"></td>
            <td class="tg-0lax"></td>
            <td class="tg-0lax" >Vahid</td>
            <td class="tg-0lax" >Vahid</td>
          </tr>
          <tr>
            <td class="tg-0lax" colspan="2">16:00</td>
            <td class="tg-0pky">Pervin</td>
            <td class="tg-0lax"></td>
            <td class="tg-0lax" ></td>
            <td class="tg-0lax" ></td>
          </tr>
          <tr>
            <td class="tg-0lax" colspan="2">19:00</td>
            <td class="tg-0pky"></td>
            <td class="tg-0lax">Ulfet</td>
            <td class="tg-0lax">Ulfet</td>
            <td class="tg-0lax" >Pervin</td>
          </tr>
        </tbody>
      </table>
      <table class="tg">
        <tbody>
          <tr>
            <td class="tg-0pky" rowspan="4">Vl</td>
            <td class="tg-0lax" colspan="2">10:00</td>
            <td class="tg-0pky" ></td>
            <td class="tg-0lax" ></td>
            <td class="tg-0lax" ></td>
            <td class="tg-0lax" ></td>
          </tr>
          <tr>
            <td class="tg-0lax" colspan="2">13:00</td>
            <td class="tg-0pky"></td>
            <td class="tg-0lax"></td>
            <td class="tg-0lax" >Vahid</td>
            <td class="tg-0lax" >Vahid</td>
          </tr>
          <tr>
            <td class="tg-0lax" colspan="2">16:00</td>
            <td class="tg-0pky">Pervin</td>
            <td class="tg-0lax"></td>
            <td class="tg-0lax" ></td>
            <td class="tg-0lax" ></td>
          </tr>
          <tr>
            <td class="tg-0lax" colspan="2">19:00</td>
            <td class="tg-0pky"></td>
            <td class="tg-0lax">Ulfet</td>
            <td class="tg-0lax">Ulfet</td>
            <td class="tg-0lax" >Pervin</td>
          </tr>
        </tbody>
      </table>
      <table class="tg">
        <tbody>
          <tr>
            <td class="tg-0pky" rowspan="4">Vll</td>
            <td class="tg-0lax" colspan="2">10:00</td>
            <td class="tg-0pky" ></td>
            <td class="tg-0lax" ></td>
            <td class="tg-0lax" ></td>
            <td class="tg-0lax" ></td>
          </tr>
          <tr>
            <td class="tg-0lax" colspan="2">13:00</td>
            <td class="tg-0pky"></td>
            <td class="tg-0lax"></td>
            <td class="tg-0lax" >Vahid</td>
            <td class="tg-0lax" >Vahid</td>
          </tr>
          <tr>
            <td class="tg-0lax" colspan="2">16:00</td>
            <td class="tg-0pky">Pervin</td>
            <td class="tg-0lax"></td>
            <td class="tg-0lax" ></td>
            <td class="tg-0lax" ></td>
          </tr>
          <tr>
            <td class="tg-0lax" colspan="2">19:00</td>
            <td class="tg-0pky"></td>
            <td class="tg-0lax">Ulfet</td>
            <td class="tg-0lax">Ulfet</td>
            <td class="tg-0lax" >Pervin</td>
          </tr>
        </tbody>
      </table>

      */