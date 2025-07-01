import Title from "../components/Title";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchOrders, cancelOrder } from "../api/OrdersAPI";

const Orders = () => {
  const { orders = [] } = useLoaderData();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: ({ signal }) => fetchOrders({ signal }),
    initialData: orders,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ orderId }) => cancelOrder(orderId),
    onMutate: () => {
      toast.dismiss();
      toast.loading("Cancelling order...");
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(data.message);
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error.message);
    },
  });

  const handleCancel = (orderId) => {
    mutate({ orderId });
  };

  const handleTrack = () => {
    queryClient.invalidateQueries(["orders"]);
    toast.info("Fetching latest order status...");
  };

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-6">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {data.orders.length === 0 ? (
        <p className="mt-10 text-gray-500">You have no orders yet.</p>
      ) : (
        data.orders.map((order) => (
          <div key={order._id} className="my-6 border rounded p-4 space-y-4">
            {/* Top Row */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h2 className="text-lg font-medium">Order ID: {order._id}</h2>
              </div>

              <div className="text-sm text-gray-700 md:text-center md:flex-1">
                <h3 className="font-medium">Delivery Address:</h3>
                <p>
                  {order.street}, {order.city}, {order.state} - {order.zipcode},{" "}
                  {order.country}
                </p>
                <p>Phone: {order.phone}</p>
              </div>

              <div className="flex flex-col items-start md:items-end">
                <h3 className="font-medium mb-1">Order Status:</h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      order.status === "pending"
                        ? "bg-yellow-500"
                        : order.status === "delivered"
                        ? "bg-green-500"
                        : order.status === "cancelled"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}
                  ></span>
                  <p className="text-sm capitalize">{order.status}</p>
                </div>
                {["delivered", "cancelled"].includes(order.status) && (
                  <p className="text-xs text-gray-500 mt-1">
                    {order.status === "delivered"
                      ? "Delivered on"
                      : "Cancelled on"}
                    : {new Date(order.updatedAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            {/* Payment Details */}
            <div className="text-sm text-gray-700 space-y-1">
              <p>Total Amount: ₹ {order.total}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>Payment Status: {order.paymentStatus}</p>
            </div>

            {/* Cart Items */}
            <div className="space-y-4">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex items-start gap-4 text-sm">
                    <img
                      className="w-16 sm:w-20"
                      src={item.imageAtTime}
                      alt={item.nameAtTime}
                    />
                    <div>
                      <p className="sm:text-base font-medium">
                        {item.nameAtTime}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <p>₹ {item.priceAtTime}</p>
                        <p>Qty: {item.quantity}</p>
                        {item.selectedOptions?.size && (
                          <p>Size: {item.selectedOptions.size}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Ordered on: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end flex-wrap mt-4">
              {order.status !== "delivered" && order.status !== "cancelled" && (
                <>
                  <button
                    className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-blue-500 hover:text-white transition cursor-pointer"
                    onClick={handleTrack}
                  >
                    Track Order
                  </button>
                  <button
                    className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-red-500 hover:text-white transition cursor-pointer"
                    onClick={() => handleCancel(order._id)}
                    disabled={isPending}
                  >
                    Cancel Order
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
