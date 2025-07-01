import axiosInstance from "../lib/Interceptor";

const addToCart = async (payload) => {
  const response = await axiosInstance.post("/cart/add-to-cart", payload);

  if (response.data.success) {
    return response.data;
  }

  throw new Error(response.data.message || "Failed to fetch products");
};

const fetchCart = async ({ signal }) => {
  const response = await axiosInstance.get("/cart/get-cart", { signal });

  if (response.data.success) {
    return response.data;
  }

  throw new Error(response.data.message || "Failed to fetch products");
};

const deleteCart = async (id) => {
  const response = await axiosInstance.delete(`/cart/delete-cart/${id}`);

  if (response.data.success) {
    return response.data;
  }

  throw new Error(response.data.message || "Failed to fetch products");
};

const updateCartQuantity = async ({ itemId, quantity }) => {
  const response = await axiosInstance.patch(
    `/cart/update-quantity/${itemId}`,
    {
      quantity,
    }
  );

  if (response.data.success) {
    return response.data;
  }

  throw new Error(response.data.message || "Failed to update quantity");
};

export { addToCart, fetchCart, deleteCart, updateCartQuantity };
