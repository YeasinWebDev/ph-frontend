import { CheckCircleIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract query params from URL
  const queryParams = new URLSearchParams(location.search);
  const transactionId = queryParams.get("transactionId");
  const amount = queryParams.get("amount");
  const status = queryParams.get("status");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-orange-200">
        <CheckCircleIcon className="w-20 h-20 text-orange-500 mx-auto mb-4" />

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you! Your payment has been processed successfully.
        </p>

        <div className="space-y-2 text-left bg-orange-50 rounded-xl p-4 border border-orange-100">
          <p className="text-gray-800">
            <span className="font-semibold">Transaction ID:</span> {transactionId}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Amount Paid:</span> ${amount}
          </p>
          <p className="text-gray-800 capitalize">
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`${
                status === "success" ? "text-orange-600" : "text-red-600"
              } font-medium`}
            >
              {status}
            </span>
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
        >
          Back to Home
        </button>
      </div>

      <p className="mt-6 text-gray-500 text-sm">
        Please check your email for more details.
      </p>
    </div>
  );
};

export default PaymentSuccess;
