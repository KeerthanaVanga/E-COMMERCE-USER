import { useState, useRef } from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import RelatedProducts from "../components/RelatedProducts";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addToCart } from "../api/CartAPI";
import { queryClient } from "../utils/TanStack";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { productReview, fetchProduct } from "../api/ProductAPI";

const Product = () => {
  const product = useLoaderData();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["products", product._id],
    queryFn: ({ signal }) => fetchProduct({ signal, id: product._id }),
    initialData: product,
  });

  const isAuth = useSelector((state) => state.auth.userAuth);
  const toastId = useRef(null);
  const [size, setSize] = useState();
  const [image, setImage] = useState(data?.images?.[0] || "");
  const [activeTab, setActiveTab] = useState("description");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { mutate: submitReview, isLoading: isReviewLoading } = useMutation({
    mutationFn: productReview,
    onMutate: () => {
      toastId.current = toast.loading("submitting the review...");
    },
    onSuccess: (res) => {
      toast.update(toastId.current, {
        render: res.message,
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });

      setRating(0);
      setComment("");

      queryClient.invalidateQueries({ queryKey: ["products", product._id] });
    },

    onError: (error) => {
      toast.update(toastId.current, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    },
  });
  const handleSubmitReview = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formRating = Number(formData.get("rating"));
    const formComment = formData.get("comment");

    if (!formRating || !formComment) {
      toast.error("Please provide a rating and comment");
      return;
    }

    const payload = {
      id: data._id,
      rating: formRating,
      comment: formComment,
    };

    submitReview(payload);
  };

  const isSizeApplicable =
    data?.productType?.toLowerCase() === "clothing" ||
    data?.productType?.toLowerCase() === "footwear";

  const { mutate } = useMutation({
    mutationFn: addToCart,
    onMutate: () => {
      toastId.current = toast.loading("Adding product to cart...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      toast.update(toastId.current, {
        render: "Product added to cart!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    },
    onError: (error) => {
      toast.update(toastId.current, {
        render: error.message || "Failed to add to cart",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    },
  });

  const handleAddToCart = () => {
    if (!isAuth) {
      navigate("/login?mode=signup");
      return;
    }
    if (isSizeApplicable && !size) {
      toast.info("Please select a size", { autoClose: 5000 });
      return;
    }

    const payload = {
      productId: data._id,
      selectedOptions: isSizeApplicable ? { size } : {},
    };

    mutate(payload);
  };

  return data ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {data.images.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                alt=""
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{data.name}</h1>
          {data.bestSeller && (
            <span className="inline-block bg-yellow-400 text-black text-xs font-semibold px-2 py-1 ml-2 rounded">
              Best Seller
            </span>
          )}
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <DynamicIcon
                key={star}
                name="star"
                size={25}
                className="w-4 5"
                fill={
                  star <= Math.round(data.averageRating)
                    ? "orange"
                    : "lightgray"
                }
              />
            ))}
            <p className="pl-2">({data.totalReviews || 0} reviews)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">₹ {data.price}</p>
          <p
            className={`mt-2 text-sm ${
              data.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {data.stock > 0 ? `In Stock: ${data.stock}` : "Out of Stock"}
          </p>

          <p className="mt-5 text-gray-500 md:w-4/5">{data.description}</p>
          <div className="mt-5 mb-5">
            <h2 className="text-lg font-medium mb-3">Product Details</h2>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              {Object.entries(data.attributes).map(([key, value]) => (
                <div key={key} className="flex gap-2">
                  <b className="capitalize">{key}:</b>
                  {Array.isArray(value) ? (
                    <span>{value.join(", ")}</span>
                  ) : (
                    <span>{value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {isSizeApplicable && (
            <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                {data?.attributes?.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    className={`border cursor-pointer py-2 px-4 bg-gray-100 ${
                      item === size ? "border-orange-500" : ""
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product</p>
            <p>Cash on delivery is available</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      <div className="flex mt-5">
        <button
          className={`border px-5 py-3 text-sm cursor-pointer ${
            activeTab === "description" ? "bg-black text-white" : ""
          }`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`border px-5 py-3 text-sm cursor-pointer ${
            activeTab === "reviews" ? "bg-black text-white" : ""
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews ({data.totalReviews || 0})
        </button>
      </div>

      <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
        {activeTab === "description" && (
          <>
            <p>{data.description}</p>
            <p className="mt-2">E-Commerce websites</p>
          </>
        )}

        {activeTab === "reviews" && (
          <>
            {data.reviews?.length > 0 ? (
              <div
                className="overflow-y-auto"
                style={{ maxHeight: "150px" }} // Adjust height as per your design to roughly fit 2 reviews
              >
                {data.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-3 mb-3">
                    <p className="font-medium">{review.name}</p>
                    <div className="flex items-center gap-1 my-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <DynamicIcon
                          key={star}
                          name="star"
                          size={20}
                          fill={star <= review.rating ? "orange" : "lightgray"}
                        />
                      ))}
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews yet</p>
            )}

            {isAuth ? (
              <div className="mt-6 border-t pt-4">
                <h3 className="font-medium mb-3">Write a Review</h3>
                <form onSubmit={handleSubmitReview}>
                  <div className="flex gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <DynamicIcon
                        key={star}
                        name="star"
                        size={25}
                        className="cursor-pointer"
                        fill={star <= rating ? "orange" : "lightgray"}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>

                  {/* Hidden input to store rating */}
                  <input type="hidden" name="rating" value={rating} />

                  <textarea
                    className="w-full border rounded p-2 mb-3"
                    placeholder="Write your review..."
                    rows={3}
                    name="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />

                  <button
                    className="bg-black text-white px-4 py-2 text-sm"
                    disabled={isReviewLoading}
                  >
                    {isReviewLoading ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              </div>
            ) : (
              <p className="text-gray-500 mt-4">
                Please{" "}
                <span
                  className="text-blue-500 cursor-pointer underline"
                  onClick={() => navigate("/login?mode=signup")}
                >
                  login
                </span>{" "}
                to write a review.
              </p>
            )}
          </>
        )}
      </div>

      <RelatedProducts
        productType={data.productType}
        category={data.attributes.category}
        subCategory={data.attributes?.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
