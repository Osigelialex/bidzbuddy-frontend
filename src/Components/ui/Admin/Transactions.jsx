import TransactionsList from '../../atom/AdminTransactionsList';
import CircularProgress from "@mui/material/CircularProgress";
import axios from '../../../config/axiosConfig';
import { GrTransaction } from "react-icons/gr";
import { formatCurrency } from '../../../utils/formatCurrency';
import { useState, useEffect } from 'react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const accumulateTransactions = () => {
    let totalTransactions = 0
    transactions.forEach((transaction) => {
      totalTransactions += transaction.amount;
    });

    return totalTransactions;
  }

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("/api/v1/transactions");
        setTransactions(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="pb-10 font-saira">
      <div className="mx-1 flex flex-col bg-white p-3 align-middle">
        <h1 className="font-semibold">Transactions History</h1>
        <div className="flex items-center gap-3 align-middle text-gray-500 text-xs">
          <p>{new Date().toJSON().slice(0, 10)}</p>
        </div>
      </div>

      <div className="my-8 mx-2 overflow-x-scroll">
        {loading ? (
          <div className="min-h-screen grid place-items-center">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="mx-2 grid place-items-center bg-white p-5 border-r-4 border-purple-500">
              <div className="mb-3 flex items-center justify-end gap-3 align-middle">
                <GrTransaction size={20} className="text-purple-500" />
                <h2>Total Payouts</h2>
              </div>
              <p className="text-lg font-semibold">
                {`₦ ${formatCurrency(accumulateTransactions())}`}
              </p>
            </div>
            <TransactionsList data={transactions} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Transactions;