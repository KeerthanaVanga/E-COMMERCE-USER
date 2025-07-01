import { XCircle } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { confirmPayment } from "../api/PaymentAPI";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/TanStack";
const PaymentFailed = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: confirmPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  useEffect(() => {
    if (orderId) {
      mutate({ orderId, paymentStatus: "failed" });
    }
  }, [orderId, mutate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white shadow-xl rounded-xl p-8 text-center max-w-md">
        <XCircle className="text-red-500 mx-auto mb-4" size={60} />
        <h2 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h2>
        {isPending && (
          <p className="text-gray-600">Updating your order status...</p>
        )}
        {isSuccess && (
          <p className="text-gray-600 mb-4">
            Payment failed status has been recorded.
          </p>
        )}
        {orderId && (
          <p className="text-sm text-gray-500 mb-6">
            Order ID: <span className="font-medium">{orderId}</span>
          </p>
        )}
        <a
          href="/"
          className="inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Go Back to Shop
        </a>
      </div>
    </div>
  );
};

export default PaymentFailed;
