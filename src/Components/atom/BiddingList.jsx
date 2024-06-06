import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import getTimeDifference from "../../utils/getTimeDifference";
import { formatCurrency } from "../../utils/formatCurrency";

const BiddingList = ({ biddingList }) => {
  if (biddingList.length === 0) {
    return (
      <div className="mb-3 grid place-items-center font-saira text-gray-500">
        <img src="/no-bids-found.gif" alt="no bids found" className="w-60" />
        <h1 className="text-2xl font-semibold">No Bidders Yet!</h1>
      </div>
    );
  }

  return (
    <div className="m-5 max-h-96 overflow-auto border sm:mx-auto sm:w-5/6">
      <div className="border-b bg-purple-950 p-3 text-center text-white w-full">
        <h1 className="font-semibold font-saira">Bidding History</h1>
      </div>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontSize: 16 }}>
              Standing
            </TableCell>
            <TableCell align="center" sx={{ fontSize: 16 }}>
              Username
            </TableCell>
            <TableCell align="center" sx={{ fontSize: 16 }}>
              Amount
            </TableCell>
            <TableCell align="center" sx={{ fontSize: 16 }}>
              Timestamp
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {biddingList.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                align="center"
                sx={{ fontSize: 16 }}
                component="th"
                scope="row"
              >
                {idx + 1 === 1 ? <p className="text-2xl">👑</p> : idx + 1}
              </TableCell>
              <TableCell align="center" sx={{ fontSize: 16 }}>
                {row.bidderUsername}
              </TableCell>
              <TableCell align="center" sx={{ fontSize: 16 }}>
                ₦ {formatCurrency(row.bidAmount)}
              </TableCell>
              <TableCell align="center" sx={{ fontSize: 16 }}>
                {getTimeDifference(row.timestamp)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BiddingList;
