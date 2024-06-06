import React from "react";
import { PaystackButton } from "react-paystack";
import axios from "../../config/axiosConfig";
import { toast } from "sonner";

const PaystackPayment = ({ email, amount, publicKey, productId }) => {
  const config = {
    email: email,
    amount: amount,
    publicKey: publicKey,
    reference: new Date().getTime().toString()
  };

  const handlePaystackSuccessAction = async (paystackReference) => {
    const payload = {
      productId,
      amount,
      paystackReference: paystackReference.reference
    }

    const MAX_RETRIES = 3;
    let retries = 0;

    while (retries < MAX_RETRIES) {
      try {
        await axios.post("/api/v1/transactions", payload);
        toast.success("Payment Confirmed!");
        break;
      } catch (error) {
        retries++;
        console.error(`Failed to save transaction to database (rettry ${retries}/${MAX_RETRIES})`);
        await new Promise((resolve) => setTimeout(resolve, 1000 * (retries + 1)));
      }
    }
  };

  const handlePaystackCloseAction = () => {
    toast.error("Payment failed");
  };

  const componentProps = {
    ...config,
    text: "PROCEED TO PAY",
    className: "w-1/2 bg-purple-950 text-white p-3 rounded-md font-saira mt-5",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  return <PaystackButton {...componentProps} />;
};

export default PaystackPayment;
