import { AlertTriangleIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query params from URL
  const queryParams = new URLSearchParams(location.search);
  const transactionId = queryParams.get("transactionId");
  const amount = queryParams.get("amount");
  const status = queryParams.get("status");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-yellow-200">
        <AlertTriangleIcon className="w-20 h-20 text-yellow-500 mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Failed ⚠️
        </h1>
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed. Please try again later.
        </p>

        <div className="space-y-2 text-left bg-yellow-50 rounded-xl p-4 border border-yellow-100">
          <p className="text-gray-800">
            <span className="font-semibold">Transaction ID:</span> {transactionId || "N/A"}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Amount:</span> ${amount || "0.00"}
          </p>
          <p className="text-gray-800 capitalize">
            <span className="font-semibold">Status:</span>{" "}
            <span className="text-yellow-600 font-medium">
              {status || "failed"}
            </span>
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
        >
          Back to Home
        </button>
      </div>

      <p className="mt-6 text-gray-500 text-sm">
        Contact support if you think this is an error.
      </p>
    </div>
  );
};

export default PaymentFailed;
