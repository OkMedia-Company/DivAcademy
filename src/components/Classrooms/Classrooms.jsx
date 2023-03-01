import React from 'react'
import useDocumentTitle from '../tools/useDocumentTitle'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
function Classrooms() {


  useDocumentTitle("Dərs otaqları")
  return (
    <div>
      {/* Create MUI table that will display classrooms with td with classrom names and dates*/}



      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                Dərs otağı
              </TableCell>
              <TableCell>
                2022-12-12
              </TableCell>
              <TableCell>
                2022-12-12
              </TableCell>
              <TableCell>
                2022-12-12
              </TableCell>
              <TableCell>
                2022-12-12
              </TableCell>
              <TableCell>
                2022-12-12
              </TableCell>
              <TableCell>
                2022-12-12
              </TableCell>
              <TableCell>
                2022-12-12
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>

              <TableCell component="th" scope="row">
                1-ci dərs otağı
              </TableCell>
              <TableCell component="th" scope="row">
                1-ci dərs otağı
              </TableCell>
              <TableCell component="th" scope="row">
                1-ci dərs otağı
              </TableCell>
              <TableCell component="th" scope="row">
                1-ci dərs otağı
              </TableCell>
            </TableRow>
            <TableRow
            >
              <TableCell component="th" scope="row">
                1-ci dərs otağı
              </TableCell>
            </TableRow>
            <TableRow

            >
              <TableCell component="th" scope="row">
                1-ci dərs otağı
              </TableCell>
            </TableRow>
            <TableRow

            >
              <TableCell component="th" scope="row">
                1-ci dərs otağı
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>









    </div >
  )
}

export default Classrooms