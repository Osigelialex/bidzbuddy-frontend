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
            <StyledTableCell>
              <span className="text-lg font-saira">Product Name</span>
            </StyledTableCell>
            <StyledTableCell>
              <span className="text-lg font-saira">Product Image</span>
            </StyledTableCell>
            <StyledTableCell>
              <span className="text-lg font-saira">Current Bid</span>
            </StyledTableCell>
            <StyledTableCell>
              <span className="text-lg font-saira">Status</span>
            </StyledTableCell>
            <StyledTableCell>
              <span className="text-lg font-saira">Condition</span>
            </StyledTableCell>
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
                <img src={product.productImageUrl} className="w-12 h-12 rounded-full" />
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <span className="text-lg text-gray-500">{product.currentBid}</span>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {product.isBiddingClosed ? (
                  <span className="text-lg text-red-400">Closed</span>
                ) : (
                  <span className="text-lg text-green-400">Open</span>
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
