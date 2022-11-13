import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { alignProperty } from '@mui/material/styles/cssUtils';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function AboutText() {
  return (
    <Box sx={{ width: '100%'}}>
      <Stack spacing={2}>
        <Item>Ovo je web aplikacija nastala kao dio projekta kolegija "Programsko inženjerstvo" petog semestra Fakulteta elektrotehnike i računarstva. Ime naše grupe je "AlmostByte", a okupili smo se s jednim ciljem; napraviti što kvalitetniju web-aplikaciju. Nadamo se da će naš proizvod ispuniti sva vaša očekivanja.</Item>
        <Item>Cilj ovog projektnog zadatka je izrada funkcionalne web aplikacije koju će koristiti članovi šahovskog kluba. Ova web aplikacija olakšala bi trenerima u šahovskom klubu organizaciju i vođenje treninga i natjecanja svojih učenika, a učenicima bi pružila platformu na kojoj bi mogli okušati svoja znanja i vještine putem dnevnih taktika. Na taj način svi korisnici mogu doraditi i unaprijediti svoja znanja i vještine u divnoj šahovskoj igri. </Item>
        <Item>Naša ekipa se sastoji od članova, studenata računarstva treće godine Fakulteta elektrotehnike i računarstva. U tablici ispod možete vidjeti članove grupe.</Item>
      </Stack>
    </Box>
  );
}