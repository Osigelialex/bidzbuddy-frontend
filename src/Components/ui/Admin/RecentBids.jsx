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
import getTimeDifference from "../../../utils/getTimeDifference";
import { formatCurrency } from "../../../utils/formatCurrency";

export default function MyBidsTable({ recentBids }) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#dedede",
      color: "#232323"
    },
  }));

  return (
    <TableContainer component={Paper} elevation={0} className="min-h-full col-span-12 mt-8">
      <h1 className="text-xl font-semibold text-left ml-3 my-5">Recent Bids</h1>
      <Table
        sx={{ minWidth: 650 }}
        size="small"
        aria-label="a bidding list"
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <span className="text-lg">Bidder</span>
            </TableCell>
            <TableCell>
              <span className="text-lg">Product Name</span>
            </TableCell>
            <TableCell>
              <span className="text-lg">Product Image</span>
            </TableCell>
            <TableCell>
              <span className="text-lg">Amount</span>
            </TableCell>
            <TableCell>
              <span className="text-lg">Status</span>
            </TableCell>
            <TableCell>
              <span className="text-lg">Time</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recentBids.map((bid, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                <span className="text-md text-gray-500">{bid.bidderUsername}</span>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <span className="text-md text-gray-500">{bid.productName}</span>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <img loading="lazy" src={bid.productImageUrl} className="w-10 h-10 rounded-full" />
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <span className="text-md text-gray-500">₦ {formatCurrency(bid.bidAmount)}</span>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {bid.winningBid ? (
                  <span className="bg-green-100 text-green-600 rounded-lg py-1 px-2">Won</span>
                ) : (
                  <span className="bg-yellow-50 text-yellow-600 rounded-lg py-1 px-2">Ongoing</span>
                )}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <span className="text-md text-gray-500">
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
