import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, email, phone, note){
    return {name, email, phone, note};
}


const rows = [
  createData('Ivan Bilobrk', 'ivan.bilobrk@fer.hr', '+385 97 698 2049', 'Koordinator'),
  createData('Altea Božić', 'altea.bozic@fer.hr', '+385 95 723 9162', '-'),
  createData('Tina Jureško', 'tina.juresko@fer.hr', '+385 95 524 6402', '-'),
  createData('Lara Mahalec', 'lara.mihalec@fer.hr', '+385 98 194 3250', '-'),
  createData('Mijo Rajič', 'mijo.rajic@fer.hr', '+387 63 016 216', '-'),
  createData('Ilan Vezmarović', 'ilan.vezmarovic@fer.hr', '+385 98 969 2897', '-'),
  createData('Anteo Vukasović', 'anteo.vukasovic@fer.hr', '+385 91 954 2903', '-')
];

export default function AboutTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Ime i prezime</StyledTableCell>
            <StyledTableCell align="center">E-mail</StyledTableCell>
            <StyledTableCell align="center">Broj telefona</StyledTableCell>
            <StyledTableCell align="center">Napomena</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.phone}</StyledTableCell>
              <StyledTableCell align="center">{row.note}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}