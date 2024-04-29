import { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { RiAuctionLine } from "react-icons/ri";
import getTimeDifference from "../../utils/getTimeDifference";


const BiddingList = ({ productId }) => {
  const [biddingList, setBiddingList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/v1/bids/list/${productId}`);
        setBiddingList(response.data);
        console.table(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [productId]);


  if (biddingList.length === 0) {
    return (
      <div className="grid place-items-center text-gray-500 mb-3">
        <RiAuctionLine size={100} />
        <h1 className="text-4xl font-semibold">Be first to bid!</h1>
      </div>
    )
  }

  return (
    <div className="sm:mx-auto m-5 max-h-96 overflow-auto sm:w-5/6 border">
      <div className="bg-slate-50 p-3 text-center text-xl font-bold border-b">
        Bidding History
      </div>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontSize: 16 }}>
              Position
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
              <TableCell align="center" sx={{ fontSize: 16}} component="th" scope="row">
                {idx + 1}
              </TableCell>
              <TableCell align="center" sx={{ fontSize: 16 }}>{row.bidderUsername}</TableCell>
              <TableCell align="center" sx={{ fontSize: 16 }}>{row.bidAmount}</TableCell>
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
