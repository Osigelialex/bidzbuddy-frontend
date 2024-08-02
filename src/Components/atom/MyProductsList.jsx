import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from '@mui/material/TableCell';
import Paper from "@mui/material/Paper";

export default function MyProductsTable({ myproducts }) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#dedede",
      color: "#232323"
    },
  }));

  return (
    <TableContainer component={Paper} elevation={0} className="min-h-full">
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a bidding list">
        <TableHead>
          <TableRow>
            <TableCell>
              <span className="text-lg font-poppins">Product Name</span>
            </TableCell>
            <TableCell>
              <span className="text-lg font-poppins">Product Image</span>
            </TableCell>
            <TableCell>
              <span className="text-lg font-poppins">Current Bid</span>
            </TableCell>
            <TableCell>
              <span className="text-lg font-poppins">Status</span>
            </TableCell>
            <TableCell>
              <span className="text-lg font-poppins">Condition</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myproducts.map((product, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                <span className="text-lg text-gray-500">{product.name}</span>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <img loading="lazy" src={product.productImageUrl} className="w-12 h-12 rounded-full" />
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <span className="text-lg text-gray-500">{product.currentBid}</span>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {product.biddingClosed ? (
                  <span className="bg-red-100 text-red-500 rounded-lg p-1 border border-red-500">closed</span>
                ) : (
                  <span className="bg-green-100 text-green-500 rounded-lg p-1 border border-green-500">open</span>
                )}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <span className="text-lg text-gray-500">
                  {product.condition}
                </span>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
