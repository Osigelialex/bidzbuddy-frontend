import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { formatCurrency } from "../../utils/formatCurrency";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { HiOutlineLockClosed } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";
import { LuBookOpen } from "react-icons/lu";
import Dialog from "./Dialog";
import { toast } from "sonner";

export default function ProductsList({ data, handleRefresh }) {
  const [query, setQuery] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState("");
  const [isCloseBiddingDialog, setIsCloseBiddingDialog] = useState(false);
  const [isDeleteProductDialog, setIsDeleteProductDialog] = useState(false);
  const [isReopenBiddingDialog, setIsReopenBiddingDialog] = useState(false);

  const sortedData = data.sort((a, b) => a.id - b.id);
  const filteredRows = sortedData.filter((row) =>
    row.name.toLowerCase().includes(query.toLowerCase()),
  );

  const closeBidding = async () => {
    try {
      await axios.patch(`api/v1/products/close/${selectedProductId}`);
      setIsCloseBiddingDialog(false);
      handleRefresh();
      toast.success("Successfully closed Auction");
    } catch (error) {
      setIsCloseBiddingDialog(false);
      if (error.response) {
        console.error(error);
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error(error.request.data.message);
      } else {
        toast.error("Check your internet connnection and try again");
      }
    }
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(`api/v1/products/${selectedProductId}`);
      setIsDeleteProductDialog(false);
      handleRefresh();
      toast.success("Successfully Deleted the product");
    } catch (error) {
      setIsCloseBiddingDialog(false);
      if (error.response) {
        console.error(error);
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error(error.request.data.message);
      } else {
        toast.error("Check your internet connnection and try again");
      }
    }
  };

  const reopenBidding = async () => {
    try {
      await axios.patch(`api/v1/products/reopen/${selectedProductId}`);
      setIsReopenBiddingDialog(false);
      handleRefresh();
      toast.success("Successfully reopened Auction");
    } catch (error) {
      setIsReopenBiddingDialog(false);
      if (error.response) {
        console.error(error);
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error(error.request.data.message);
      } else {
        toast.error("Check your internet connnection and try again");
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Product Name", width: 200 },
    {
      field: "productImageUrl",
      headerName: "Product Image",
      width: 110,
      type: "string",
      sortable: false,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Product"
          onClick={() => handleClick(params)}
          className="h-10 w-10 cursor-pointer rounded-full"
        />
      ),
    },
    { field: "categoryName", headerName: "Category", width: 100 },
    { field: "condition", headerName: "Condition", width: 90 },
    {
      field: "biddingClosed",
      headerName: "Status",
      width: 90,
      type: "boolean",
      renderCell: (params) =>
        params.value === true ? (
          <span className="rounded bg-red-50 px-2 py-1 max-w-16 min-w-16 text-red-600 text-center">
            Closed
          </span>
        ) : (
          <span className="rounded bg-green-50 px-2 py-1 max-w-16 min-w-16 text-center text-green-600">
            Open
          </span>
        ),
    },
    {
      field: "minimumBid",
      headerName: "Minimum Bid",
      width: 130,
      renderCell: (params) => `₦${formatCurrency(params.value)}`,
    },
    {
      field: "currentBid",
      headerName: "Current Bid",
      width: 120,
      renderCell: (params) => `₦${formatCurrency(params.value)}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <div className="flex items-center gap-3 align-middle">
            {cellValues.row.biddingClosed && (<button title="Reopen Auction">
              <LuBookOpen
                size={25}
                className="cursor-pointer bg-purple-200 p-1 text-purple-400"
                onClick={() => {
                  setSelectedProductId(cellValues.row.id);
                  setSelectedProductName(cellValues.row.name);
                  setIsReopenBiddingDialog(true);
                }}
              />
            </button>)}

            {!cellValues.row.biddingClosed && (<button title="Close Auction">
              <HiOutlineLockClosed
                size={25}
                className="cursor-pointer bg-red-200 p-1 text-red-400"
                onClick={() => {
                  setSelectedProductId(cellValues.row.id);
                  setSelectedProductName(cellValues.row.name);
                  setIsCloseBiddingDialog(true);
                }}
              />
            </button>)}

            <button title="Delete Product">
              <MdDelete
                size={25}
                className="cursor-pointer bg-red-200 p-1 text-red-400"
                onClick={() => {
                  setSelectedProductId(cellValues.row.id);
                  setSelectedProductName(cellValues.row.name);
                  setIsDeleteProductDialog(true);
                }}
              />
            </button>
          </div>
        );
      },
    },
  ];

  const navigate = useNavigate();
  const handleClick = (params) => {
    navigate(`../../products/${params.row.id}`);
  };

  return (
    <div className="p-2">
      {isCloseBiddingDialog && (
        <Dialog
          title={`Are you sure you want to close bidding for "${selectedProductName}" ?`}
          message={`By clicking continue, you will end the auctioning process for "${selectedProductName}"
           and buyers would not be able to bid it anymore.`}
          color={"red"}
          callback={closeBidding}
          onClose={() => setIsCloseBiddingDialog(false)}
        />
      )}

      {isDeleteProductDialog && (
        <Dialog
          title={`Are you sure you want to delete "${selectedProductName}" ?`}
          message={`By clicking continue, you will DELETE "${selectedProductName}" from the database, are you sure you want to continue?`}
          color={"red"}
          callback={deleteProduct}
          onClose={() => setIsDeleteProductDialog(false)}
        />
      )}

      {isReopenBiddingDialog && (
        <Dialog
          title={`Are you sure you want to reopen bidding for "${selectedProductName}" ?`}
          message={`By clicking continue, you will reopen the auctioning process for "${selectedProductName}"
           and buyers would be able to bid it again.`}
          color={"purple"}
          callback={reopenBidding}
          onClose={() => setIsReopenBiddingDialog(false)}
        />
      )}

      <div className="relative mx-auto w-1/2 mb-10 rounded-xl border bg-[#efefef] hover:ring-2 hover:ring-purple-300">
        <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400" />
        <input
          type="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl p-2 pl-8 outline-none"
        />
      </div>

      <div className="bg-white" style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
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
