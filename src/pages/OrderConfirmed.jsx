import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { confirmPayment } from "../api/PaymentAPI";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/TanStack";

const OrderConfirmed = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: confirmPayment,
  });

  useEffect(() => {
    if (orderId) {
      mutate({ orderId, paymentStatus: "cod" });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    } else {
      navigate("/");
    }
  }, [orderId, mutate, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white shadow-xl rounded-xl p-8 text-center max-w-md">
        <CheckCircle className="text-green-500 mx-auto mb-4" size={60} />
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          Order Placed Successfully
        </h2>
        {isPending && (
          <p className="text-gray-600">Confirming your payment...</p>
        )}
        {isSuccess && (
          <p className="text-gray-600 mb-4">
            Your order has been confirmed successfully.
          </p>
        )}
        {orderId && (
          <p className="text-sm text-gray-500 mb-6">
            Order ID: <span className="font-medium">{orderId}</span>
          </p>
        )}

        <Link
          className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          to="/"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmed;
