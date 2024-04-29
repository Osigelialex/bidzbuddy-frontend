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
import getTimeDifference from "../../utils/getTimeDifference";

export default function MyBidsTable({ mybids }) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#dedede",
      color: "#232323"
    },
  }));

  return (
    <TableContainer component={Paper} className="min-h-full">
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <span className="text-lg font-saira">Product Image</span>
            </StyledTableCell>
            <StyledTableCell>
              <span className="text-lg font-saira">Product Name</span>
            </StyledTableCell>
            <StyledTableCell>
              <span className="text-lg font-saira">Amount (NGN)</span>
            </StyledTableCell>
            <StyledTableCell>
              <span className="text-lg font-saira">Status</span>
            </StyledTableCell>
            <StyledTableCell>
              <span className="text-lg font-saira">Time</span>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mybids.map((bid, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                <img src={bid.productImageUrl} className="w-25 h-20 rounded-md" />
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <span className="text-lg text-gray-500">{bid.productName}</span>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <span className="text-lg text-gray-500">{bid.bidAmount}</span>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {bid.winningBid ? (
                  <span className="text-lg text-green-400">Winning</span>
                ) : (
                  <span className="text-lg text-red-400">Outbid</span>
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
