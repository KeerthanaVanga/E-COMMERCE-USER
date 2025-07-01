import axiosInstance from "../lib/Interceptor";

const fetchProducts = async ({ signal, type, category, subCategory }) => {
  const params = {};

  if (type?.length) params.type = type;
  if (category?.length) params.category = category;
  if (subCategory?.length) params.subCategory = subCategory;

  const response = await axiosInstance.get("/product/list-products", {
    params,
    signal,
    paramsSerializer: (params) => {
      const searchParams = new URLSearchParams();
      for (const key in params) {
        const value = params[key];
        if (Array.isArray(value)) {
          value.forEach((v) => searchParams.append(key, v));
        } else {
          searchParams.append(key, value);
        }
      }
      return searchParams.toString();
    },
  });

  if (response.data.success) {
    return response.data.products;
  }

  throw new Error(response.data.message || "Failed to fetch products");
};

const searchProductNames = async ({ signal, search }) => {
  const response = await axiosInstance.get("/product/search", {
    params: { search },
    signal,
  });

  if (response.data.success) {
    return response.data.products;
  }

  throw new Error(response.data.message || "Failed to search products");
};

const fetchProduct = async ({ signal, id }) => {
  const response = await axiosInstance.get(
    `/product/get-single-product/${id}`,
    {
      signal,
    }
  );
  if (response.data.success) {
    return response.data.product;
  }

  throw new Error(response.data.message || "Failed to fetch product");
};

const fetchBestSellerProducts = async ({ signal }) => {
  const response = await axiosInstance.get("/product/get-bestseller-products", {
    signal,
  });
  if (response.data.success) {
    return response.data.products;
  }
  throw new Error(
    response.data.message || "Failed to fetch best seller product"
  );
};

const fetchLatestProducts = async ({ signal }) => {
  const response = await axiosInstance.get("/product/get-latest-products", {
    signal,
  });

  if (response.data.success) {
    return response.data.products;
  }
  throw new Error(response.data.message || "Failed to fetch latest product");
};

const fetchRelatedProducts = async ({
  signal,
  category,
  productType,
  subCategory,
}) => {
  const response = await axiosInstance.get(
    `/product/get-related-product/${category}/${productType}/${subCategory}`,
    {
      signal,
    }
  );
  if (response.data.success) {
    return response.data.products;
  }
  throw new Error(response.data.message || "Failed to fetch product");
};

const productReview = async ({ id, rating, comment }) => {
  const response = await axiosInstance.post(`/product/${id}/reviews`, {
    rating,
    comment,
  });

  if (response.data.success) {
    return response.data;
  }

  throw new Error(response.data.message || "Failed to submit review");
};

export {
  fetchProducts,
  fetchProduct,
  fetchBestSellerProducts,
  fetchLatestProducts,
  fetchRelatedProducts,
  searchProductNames,
  productReview,
};
