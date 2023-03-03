import React from 'react'
import useDocumentTitle from '../tools/useDocumentTitle'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
function Classrooms() {


  useDocumentTitle("Dərs otaqları")
  return (
    <>
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
                905 Mavi otaq
              </TableCell>
              <TableCell component="th" scope="row">
                Yoxdu
              </TableCell>
              <TableCell component="th" scope="row">
                Var
              </TableCell>
              <TableCell component="th" scope="row">
                Yoxdu
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                905 Mavi otaq
              </TableCell>
            </TableRow>
            <TableRow

            >
              <TableCell component="th" scope="row">
                908 Qırmızı otaq
              </TableCell>
            </TableRow>
            <TableRow

            >
              <TableCell component="th" scope="row">
                915 Kofeshop otaq
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
    </ >
  )
}

export default Classrooms