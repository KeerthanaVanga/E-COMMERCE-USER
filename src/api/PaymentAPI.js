import axiosInstance from "../lib/Interceptor";

const confirmPayment = async ({ orderId, paymentStatus }) => {
  const response = await axiosInstance.post("/payment/confirm-payment", {
    orderId,
    paymentStatus,
  });
  if (response.data.success) {
    return response.data;
  }

  throw new Error(response.data.message || "Failed to confirm payment");
};

const createPayment = async (orderData) => {
  const response = await axiosInstance.post(
    "/payment/create-payment",
    orderData
  );
  if (response.data.success) {
    return response.data;
  }

  throw new Error(response.data.message || "Failed to create payment");
};

export { confirmPayment, createPayment };
