import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { formatCurrency } from "../../utils/formatCurrency";
import { tableCellClasses } from '@mui/material/TableCell';
import Paper from "@mui/material/Paper";
import getTimeDifference from "../../utils/getTimeDifference";

export default function MyBidsTable({ mybids }) {
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
              <span className="text-lg font-saira">Product Name</span>
            </TableCell>
            <TableCell>
              <span className="text-lg font-saira">Product Image</span>
            </TableCell>
            <TableCell>
              <span className="text-lg font-saira">Amount (NGN)</span>
            </TableCell>
            <TableCell>
              <span className="text-lg font-saira">Status</span>
            </TableCell>
            <TableCell>
              <span className="text-lg font-saira">Time</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mybids.map((bid, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              className={bid.isWinningBid ? "border-l-8 border-[#00e400]" : ""}
            >
              <StyledTableCell component="th" scope="row">
                <span className="text-lg text-gray-500">{bid.productName}</span>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <img src={bid.productImageUrl} className="w-12 h-12 rounded-full" />
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <span className="text-lg text-gray-500">₦ {formatCurrency(bid.bidAmount)}</span>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {bid.isWinningBid ? (
                  <span className="bg-green-100 text-green-500 rounded-lg py-1 px-2">Won</span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-500 rounded-lg py-1 px-2">Ongoing</span>
                )}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <span className="text-lg text-gray-500">
                  {getTimeDifference(bid.timestamp)}
                </span>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
