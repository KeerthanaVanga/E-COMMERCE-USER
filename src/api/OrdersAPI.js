import axiosInstance from "../lib/Interceptor";

const fetchOrders = async ({ signal }) => {
  const response = await axiosInstance.get("/order/get-orders", {
    signal,
  });
  if (response.data.success) {
    return response.data;
  }
  throw new Error(
    response.data.message || "Failed to fetch best seller product"
  );
};

const cancelOrder = async (orderId) => {
  const response = await axiosInstance.patch(`/order/cancel/${orderId}`);
  if (response.data.success) {
    return response.data;
  }
  throw new Error(
    response.data.message || "Failed to fetch best seller product"
  );
};

export { fetchOrders, cancelOrder };
