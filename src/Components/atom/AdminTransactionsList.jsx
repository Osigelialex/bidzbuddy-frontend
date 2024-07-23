import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { formatCurrency } from "../../utils/formatCurrency";
import getTimeDifference from "../../utils/getTimeDifference";

const PAYMENT_SUCCESS_STYLE = "text-green-600 bg-green-100 rounded-md px-2";
const PAYMENT_FAILED_STYLE = "text-red-600 bg-red-100 rounded-md px-2";
const PAYMENT_PENDING_STYLE = "text-yellow-600 bg-yellow-100 rounded-md px-2";

export default function TransactionsList({ data }) {

  const dataWithId = data.map((item, index) => ({ ...item, id: index + 1 }));
  const columns = [
    { field: 'id', headerName: 'S/N', width: 50 },
    { 
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 180,
      renderCell: (params) => (
        <span className={`font-medium ${params.value === "SUCCESSFUL" ? PAYMENT_SUCCESS_STYLE : params.value === "FAILED" ? PAYMENT_FAILED_STYLE : PAYMENT_PENDING_STYLE}`}>
          {params.value}
        </span>
      )
    },
    { field: "userId", headerName: "User ID", width: 100, align: "center" },
    {
      field: "amount",
      headerName: "Amount",
      align: "start",
      width: 120,
      renderCell: (params) => (
        <span className="font-medium">{`₦ ${formatCurrency(params.value)}`}</span>
      )
    },
    { field: "transactionId", headerName: "Transaction ID", width: 150, align: "center" },
    { field: "timestamp", headerName: "Timestamp", width: 130, valueFormatter: (params) => getTimeDifference(params.value) },
  ];

  return (
    <div className="p-2">
      <div className="bg-white" style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={dataWithId}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
}
