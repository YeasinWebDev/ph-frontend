import { XCircleIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query params from URL
  const queryParams = new URLSearchParams(location.search);
  const transactionId = queryParams.get("transactionId");
  const amount = queryParams.get("amount");
  const status = queryParams.get("status");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-red-200">
        <XCircleIcon className="w-20 h-20 text-red-500 mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Cancelled ❌
        </h1>
        <p className="text-gray-600 mb-6">
          Your payment was cancelled. No amount has been deducted.
        </p>

        <div className="space-y-2 text-left bg-red-50 rounded-xl p-4 border border-red-100">
          <p className="text-gray-800">
            <span className="font-semibold">Transaction ID:</span> {transactionId || "N/A"}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Amount:</span> ${amount || "0.00"}
          </p>
          <p className="text-gray-800 capitalize">
            <span className="font-semibold">Status:</span>{" "}
            <span className="text-red-600 font-medium">
              {status || "cancelled"}
            </span>
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
        >
          Back to Home
        </button>
      </div>

      <p className="mt-6 text-gray-500 text-sm">
        If this was a mistake, please try again.
      </p>
    </div>
  );
};

export default PaymentCancel;
