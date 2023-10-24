import React from 'react'
// import { ListingPreview } from './userStaysPreview'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

export function ListingList({ stays }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stays.map((stay) => (
            <TableRow key={stay._id}>
              <TableCell className='listing-container'>
                <img src={stay.imgUrls} alt={stay.name} />
              </TableCell>
              <TableCell>{stay.name}</TableCell>
              <TableCell>${stay.price}</TableCell>
              <TableCell>{stay.loc.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
