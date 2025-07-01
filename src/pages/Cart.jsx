import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { DynamicIcon } from "lucide-react/dynamic";
import { useNavigate, Link, useLoaderData } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteCart, updateCartQuantity } from "../api/CartAPI";
import { useRef } from "react";
import { toast } from "react-toastify";
import { queryClient } from "../utils/TanStack";

const Cart = () => {
  const data = useLoaderData();
  const toastId = useRef(null);
  const { mutate } = useMutation({
    mutationFn: deleteCart,
    onMutate: () => {
      toastId.current = toast.loading("removing product from cart...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      toast.update(toastId.current, {
        render: "Product removed from cart!",
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

  const { mutate: updateQuantityMutate } = useMutation({
    mutationFn: updateCartQuantity,
    onMutate: () => {
      toastId.current = toast.loading("Updating quantity...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.update(toastId.current, {
        render: "Quantity updated!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    },
    onError: (error) => {
      toast.update(toastId.current, {
        render: error.message || "Failed to update quantity",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    },
  });

  const navigate = useNavigate();

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {data.cart.length === 0 ? (
          <h2 className="text-center text-lg mt-10 font-semibold">
            Cart is Empty
          </h2>
        ) : (
          data.cart.map((item, index) => {
            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <Link to={`/product/${item.product._id}`}>
                    {" "}
                    <img
                      className="w-16 sm:w-20"
                      src={item.imageAtTime}
                      alt=""
                    />
                  </Link>
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {item.nameAtTime}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>₹ {item.priceAtTime}</p>
                      {item?.selectedOptions?.size && (
                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                          {item?.selectedOptions?.size}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <input
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  min={1}
                  onBlur={(e) => {
                    const newQuantity = parseInt(e.target.value);
                    if (newQuantity && newQuantity !== item.quantity) {
                      updateQuantityMutate({
                        itemId: item._id,
                        quantity: newQuantity,
                      });
                    }
                  }}
                  defaultValue={item.quantity}
                />
                <DynamicIcon
                  onClick={() => mutate(item._id)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  name="trash-2"
                  size={25}
                />
              </div>
            );
          })
        )}
      </div>
      <div className="flex justify-end my-20">
        {data.cart.length > 0 && (
          <div className="w-full sm:w-[450px]">
            <CartTotal
              subtotal={data.subtotal}
              shippingFee={data.shippingFee}
              total={data.total}
            />
            <div className="w-full text-end">
              <button
                onClick={() => navigate("/place-order")}
                className="text-white text-sm my-8 px-8 py-3 bg-black cursor-pointer"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
