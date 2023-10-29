import React, { useState } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
// import { ListingPreview } from './userStaysPreview'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

export function ListingList({ stays }) {
  const [sortBy, setSortBy] = useState(null);

  const sortedStays = [...stays].sort((a, b) => {
    if (!sortBy) return 0;

    let valueA;
    let valueB;

    switch (sortBy.key) {
      case "price":
        valueA = +a[sortBy.key];
        valueB = +b[sortBy.key];
        break;
      case "location":
        valueA = a.loc.country;
        valueB = b.loc.country;
        break;
      default:
        valueA = a[sortBy.key];
        valueB = b[sortBy.key];
    }

    if (valueA < valueB) {
      return sortBy.direction === "ascending" ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortBy.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const setSort = (key) => {
    setSortBy((prev) => {
      if (prev && prev.key === key) {
        return {
          key,
          direction:
            prev.direction === "ascending" ? "descending" : "ascending",
        };
      }
      return { key, direction: "ascending" };
    });
  };

  console.log(sortedStays);

  return (
    <section className="listing-list">
      <h3 className="listing-list-title">Your Listings</h3>
      <table className="listing-table">
        <thead className="listing-table-header">
          <tr className="listing-table-row-header">
            <th className="listing-table-header-cell">LISTING</th>
            <th className="listing-table-header-cell">TODO</th>
            <th className="listing-table-header-cell capacity">CAPACITY</th>
            <th className="listing-table-header-cell">ROOMS</th>
            <th className="listing-table-header-cell">BEDROOMS</th>
            <th className="listing-table-header-cell">PRICE</th>
            <th className="listing-table-header-cell">LOCATION</th>
            <th className="listing-table-header-cell">DATE ADDED</th>
          </tr>
        </thead>
        <tbody className="listing-table-body">
          {stays.map((stay, index) => (
            <React.Fragment key={index}>
              <tr key={index} className="listing-table-row">
                <td className="listing-table-cell cell-flex">
                  <img src={stay.imgUrls[0]} alt={stay.name} />
                  <Link to={`/stay/${stay._id}`} className="listing-link">
                    {stay.name}
                  </Link>
                </td>
                <td className="listing-table-cell">
                  <Link to={`/edit/${stay._id}`} className="edit-link">
                    Update
                  </Link>
                </td>
                <td className="listing-table-cell">{stay.capacity}</td>
                <td className="listing-table-cell">
                  {stay.bathrooms + stay.bedrooms}
                </td>
                <td className="listing-table-cell">{stay.bedrooms}</td>
                <td className="listing-table-cell">${stay.price.toFixed(2)}</td>
                <td className="listing-table-cell">
                  {stay.loc.formatedAddress}
                </td>
                <td className="listing-table-cell">
                  {new Date(stay.createdAt).toLocaleDateString()}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </section>
  );
}

// <TableContainer component={Paper}>
//   <Table>
//     <TableHead>
//       <TableRow>
//         <TableCell className='table-cell-center cell-clickable' onClick={() => setSort('name')}>
//           Listing
//         </TableCell>
//         <TableCell className='table-cell-center cell-clickable' onClick={() => setSort('price')}>
//           Price
//         </TableCell>
//         <TableCell className='table-cell-center cell-clickable' onClick={() => setSort('location')}>
//           Location
//         </TableCell>
//         <TableCell className='table-cell-center'>Action</TableCell>
//       </TableRow>
//     </TableHead>
//     <TableBody>
//       {sortedStays.map((stay) => (
//         <TableRow key={stay._id}>
//           <TableCell className='listing-container' style={{ width: '180px' }}>
//             <Link to={`/stay/${stay._id}`} className='custom-link'>
//               <Box display='flex' alignItems='center' justifyContent='flex-start' width='100%'>
//                 <img
//                   src={stay.imgUrls}
//                   alt={stay.name}
//                   style={{ marginRight: '10px', width: '150px', height: '150px', objectFit: 'cover' }}
//                 />
//                 {stay.name}
//               </Box>
//             </Link>
//           </TableCell>
//           <TableCell>${stay.price}</TableCell>
//           <TableCell>{stay.loc.country}</TableCell>
//           <TableCell>
//             <Link to={`/edit/${stay._id}`} className='custom-link'>
//               Edit Stay
//             </Link>
//           </TableCell>
//         </TableRow>
//       ))}
//     </TableBody>
//   </Table>
// </TableContainer>
